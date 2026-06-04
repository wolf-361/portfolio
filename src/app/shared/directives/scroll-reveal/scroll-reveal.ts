import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

export type ScrollRevealType = 'from-left' | 'from-right' | 'perspective-tilt' | 'fade-up';

@Directive({
  selector: '[scrollReveal]',
  exportAs: 'scrollReveal',
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer!: IntersectionObserver;
  private revealTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly scrollReveal = input.required<ScrollRevealType>();
  readonly scrollRevealDelay = input<number>(0);

  private get reducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  ngOnInit(): void {
    const el = this.el.nativeElement;
    el.setAttribute('data-reveal', this.scrollReveal());

    if (this.reducedMotion) {
      return;
    }

    el.classList.add('sr-hidden');

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const delay = this.scrollRevealDelay();
          if (delay > 0) {
            this.revealTimeout = setTimeout(() => this.reveal(el), delay);
          } else {
            this.reveal(el);
          }
          this.observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.revealTimeout !== null) clearTimeout(this.revealTimeout);
  }

  forceReveal(): void {
    this.reveal(this.el.nativeElement);
  }

  private reveal(el: HTMLElement): void {
    el.classList.remove('sr-hidden');
    el.classList.add('is-revealed');
  }
}
