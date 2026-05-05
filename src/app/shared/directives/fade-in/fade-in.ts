import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * [uiFadeIn] — adds .is-visible once the element enters the viewport.
 * The element starts hidden via CSS; the class triggers the animation.
 *
 * Usage: <article uiFadeIn>...</article>
 */
@Directive({
  selector: '[uiFadeIn]',
  host: { class: 'fade-in-target' },
})
export class FadeInDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('is-visible');
          this.observer.disconnect(); // fire once
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
