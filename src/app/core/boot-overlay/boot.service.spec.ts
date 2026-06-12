import { BootService } from './boot.service';

// Mock sessionStorage for testing
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

describe('BootService', () => {
  beforeEach(() => {
    mockSessionStorage.clear();
    // Override global sessionStorage with our mock
    (globalThis as Record<string, unknown>)['sessionStorage'] = mockSessionStorage;
  });

  it('shows overlay on first load', () => {
    const svc = new BootService();
    expect(svc.showOverlay()).toBe(true);
    expect(svc.isFirstLoad()).toBe(true);
  });

  it('markSeen sets showOverlay to false and persists to sessionStorage', () => {
    const svc = new BootService();
    svc.markSeen();
    expect(svc.showOverlay()).toBe(false);
    expect(mockSessionStorage.getItem('boot-seen')).toBe('1');
  });

  it('does not show overlay if already seen this session', () => {
    mockSessionStorage.setItem('boot-seen', '1');
    const svc = new BootService();
    expect(svc.showOverlay()).toBe(false);
    expect(svc.isFirstLoad()).toBe(false);
  });

  it('isFirstLoad never changes after construction', () => {
    const svc = new BootService();
    expect(svc.isFirstLoad()).toBe(true);
    svc.markSeen();
    expect(svc.isFirstLoad()).toBe(true); // snapshot — does not change
  });
});
