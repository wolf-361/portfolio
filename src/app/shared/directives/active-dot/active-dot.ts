import { Directive, ElementRef, inject, OnInit, OnDestroy, input } from '@angular/core';

/**
 * Renders a pulsing dot before the host element's text — used to indicate
 * an ongoing/active state (e.g. "présent", "en cours").
 *
 * The dot uses sys.primary color and a CSS keyframe pulse animation.
 * It is inserted as a ::before pseudo-element via an injected <style> tag
 * scoped to a unique attribute, keeping component styles encapsulated.
 *
 * Usage:
 *   <span activeDot>présent</span>
 *
 * Renders as:  ● présent   (dot pulses at 2s ease-in-out)
 */
@Directive({
  selector: '[activeDot]',
  host: {
    class: 'active-dot-host',
  },
})
export class ActiveDotDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private styleEl: HTMLStyleElement | null = null;
  private uid = `ad-${Math.random().toString(36).slice(2, 7)}`;

  /** Optional: override dot color. Defaults to sys primary. */
  readonly activeDotColor = input<string>('var(--mat-sys-primary)');

  ngOnInit(): void {
    const host = this.el.nativeElement as HTMLElement;
    host.setAttribute(this.uid, '');
    host.style.display = 'inline-flex';
    host.style.alignItems = 'center';
    host.style.gap = '0.375rem';

    // Inject scoped keyframe + ::before style
    this.styleEl = document.createElement('style');
    this.styleEl.textContent = `
      @keyframes active-dot-pulse-${this.uid} {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.35; }
      }
      [${this.uid}]::before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${this.activeDotColor()};
        animation: active-dot-pulse-${this.uid} 2s ease-in-out infinite;
        flex-shrink: 0;
      }
    `;
    document.head.appendChild(this.styleEl);
  }

  ngOnDestroy(): void {
    this.styleEl?.remove();
  }
}
