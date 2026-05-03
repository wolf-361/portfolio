import { Directive, ElementRef, inject, OnInit } from '@angular/core';

/**
 * Adds the left 3px primary-colored accent bar to any card element.
 * Works alongside [surface] — apply both on the same element.
 *
 * Usage:
 *   <article surface="surface-container" accentCard>...</article>
 *
 * The directive sets border-left using the M3 primary token directly so it
 * automatically adapts to theme and palette changes.
 */
@Directive({
  selector: '[accentCard]',
  host: {
    class: 'accent-card',
  },
})
export class AccentCardDirective implements OnInit {
  private readonly el = inject(ElementRef);

  ngOnInit(): void {
    const el = this.el.nativeElement as HTMLElement;
    el.style.borderLeft = '3px solid var(--mat-sys-primary)';
    // Compensate padding so content doesn't shift relative to non-accented cards
    const currentPaddingLeft = getComputedStyle(el).paddingLeft;
    if (!currentPaddingLeft || currentPaddingLeft === '0px') {
      el.style.paddingLeft = '1.25rem';
    }
  }
}
