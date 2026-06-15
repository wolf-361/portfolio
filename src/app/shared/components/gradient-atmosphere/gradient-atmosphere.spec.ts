import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GradientAtmosphereComponent, AtmosphereVariant } from './gradient-atmosphere';

@Component({
  template: `<ui-gradient-atmosphere [variant]="v"><span>content</span></ui-gradient-atmosphere>`,
  imports: [GradientAtmosphereComponent],
})
class TestHostComponent {
  v: AtmosphereVariant = 'hero';
}

describe('GradientAtmosphereComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('projects content', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('span')?.textContent).toBe('content');
  });

  it('sets data-variant attribute for CSS targeting', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('ui-gradient-atmosphere') as HTMLElement;
    expect(host.getAttribute('data-variant')).toBe('hero');
  });

  it('updates data-variant when input changes', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    fixture.componentInstance.v = 'projects';
    fixture.changeDetectorRef.detectChanges();
    const host = fixture.nativeElement.querySelector('ui-gradient-atmosphere') as HTMLElement;
    expect(host.getAttribute('data-variant')).toBe('projects');
  });
});
