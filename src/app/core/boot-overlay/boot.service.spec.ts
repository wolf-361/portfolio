import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { BootService } from './boot.service';

const mockSessionStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
  };
})();

function makeService(): BootService {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [BootService, { provide: PLATFORM_ID, useValue: 'browser' }],
  });
  return TestBed.inject(BootService);
}

describe('BootService', () => {
  beforeEach(() => {
    mockSessionStorage.clear();
    (globalThis as Record<string, unknown>)['sessionStorage'] = mockSessionStorage;
  });

  it('shows overlay on first load', () => {
    const svc = makeService();
    expect(svc.showOverlay()).toBe(true);
    expect(svc.isFirstLoad()).toBe(true);
  });

  it('markSeen sets showOverlay to false and persists to sessionStorage', () => {
    const svc = makeService();
    svc.markSeen();
    expect(svc.showOverlay()).toBe(false);
    expect(mockSessionStorage.getItem('boot-seen')).toBe('1');
  });

  it('isFirstLoad is false when already seen this session', () => {
    mockSessionStorage.setItem('boot-seen', '1');
    const svc = makeService();
    // showOverlay is always true on construction (overlay always covers the page briefly).
    // The component checks isFirstLoad() to decide animation timing, not whether to render.
    expect(svc.showOverlay()).toBe(true);
    expect(svc.isFirstLoad()).toBe(false);
  });

  it('isFirstLoad never changes after construction', () => {
    const svc = makeService();
    expect(svc.isFirstLoad()).toBe(true);
    svc.markSeen();
    expect(svc.isFirstLoad()).toBe(true); // snapshot — does not change
  });
});
