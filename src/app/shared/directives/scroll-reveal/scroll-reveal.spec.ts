import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScrollRevealDirective, ScrollRevealType } from './scroll-reveal';

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

@Component({
  template: `<div [scrollReveal]="type" [scrollRevealDelay]="delay"></div>`,
  imports: [ScrollRevealDirective],
})
class TestHostComponent {
  type: ScrollRevealType = 'from-left';
  delay = 0;
}

describe('ScrollRevealDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('adds data-reveal attribute and sr-hidden class on init', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(el.getAttribute('data-reveal')).toBe('from-left');
    expect(el.classList.contains('sr-hidden')).toBeTrue();
  });

  it('adds is-revealed class when forceReveal() is called', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const directive = fixture.debugElement.children[0].injector.get(ScrollRevealDirective);
    directive.forceReveal();
    const el = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(el.classList.contains('is-revealed')).toBeTrue();
    expect(el.classList.contains('sr-hidden')).toBeFalse();
  });
});
