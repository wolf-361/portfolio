import { TestBed } from '@angular/core/testing';
import {
  FloatingTextCanvasComponent,
  CANVAS_KEYWORDS,
  createParticle,
} from './floating-text-canvas';

describe('FloatingTextCanvasComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('creates the component', () => {
    const fixture = TestBed.createComponent(FloatingTextCanvasComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders a canvas element', () => {
    const fixture = TestBed.createComponent(FloatingTextCanvasComponent);
    fixture.detectChanges();
    const canvas = fixture.nativeElement.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });
});

describe('CANVAS_KEYWORDS', () => {
  it('contains at least 10 stack keywords', () => {
    expect(CANVAS_KEYWORDS.length).toBeGreaterThan(10);
    expect(CANVAS_KEYWORDS).toContain('kotlin');
    expect(CANVAS_KEYWORDS).toContain('go');
  });
});

describe('createParticle', () => {
  it('creates a particle within the given bounds', () => {
    const p = createParticle(800, 600);
    expect(p.x).toBeGreaterThanOrEqual(0);
    expect(p.x).toBeLessThanOrEqual(800);
    expect(p.y).toBeGreaterThanOrEqual(0);
    expect(p.y).toBeLessThanOrEqual(600);
    expect(p.depth).toBeGreaterThanOrEqual(0);
    expect(p.depth).toBeLessThanOrEqual(1);
  });

  it('assigns a keyword from CANVAS_KEYWORDS', () => {
    const p = createParticle(800, 600);
    expect(CANVAS_KEYWORDS).toContain(p.text);
  });
});
