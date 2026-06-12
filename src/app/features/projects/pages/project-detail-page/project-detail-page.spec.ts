import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ProjectDetailPageComponent } from './project-detail-page';
import { provideRouter } from '@angular/router';
import { ProjectsService } from '../../services/projects';
import { LangService } from '../../../../core/lang/lang';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
});

describe('ProjectDetailPageComponent', () => {
  function setup(slug = 'test-slug') {
    const mockProject = {
      id: slug,
      slug,
      title: 'Test',
      description: null,
      heroVisual: { type: 'none' },
      links: [],
      status: null,
      sections: [],
      tags: [],
    };
    TestBed.configureTestingModule({
      imports: [ProjectDetailPageComponent],
      providers: [
        provideRouter([]),
        { provide: ProjectsService, useValue: { getDetail: () => mockProject } },
        { provide: LangService, useValue: { lang: signal('en'), t: (en: string) => en } },
      ],
    });
    const fixture = TestBed.createComponent(ProjectDetailPageComponent);
    fixture.componentRef.setInput('slug', slug);
    return fixture;
  }

  it('should have entering signal initially false', () => {
    const fixture = setup();
    expect(fixture.componentInstance.entering()).toBe(false);
  });

  it('should set entering to true after requestAnimationFrame fires', async () => {
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
    const fixture = setup();
    fixture.detectChanges();
    expect(fixture.componentInstance.entering()).toBe(true);
    rafSpy.mockRestore();
  });
});
