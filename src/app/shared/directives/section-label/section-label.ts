import { Directive, ElementRef, inject, OnInit, input } from '@angular/core';

/**
 * Styles the host element as a terminal-style section label.
 *
 * Renders inline mono text in the on-surface-variant color with
 * reduced opacity for the `//` prefix. Used for column headers,
 * dividers, and in-card section labels.
 *
 * Usage:
 *   <span sectionLabel>// pro</span>
 *   <p sectionLabel labelColor="primary">// edu</p>
 *
 * @input labelColor — 'muted' (default, on-surface-variant) | 'primary'
 */
@Directive({
  selector: '[sectionLabel]',
  host: {
    class: 'section-label-host',
  },
})
export class SectionLabelDirective implements OnInit {
  private readonly el = inject(ElementRef);

  /** 'muted' uses on-surface-variant; 'primary' uses the primary token */
  readonly labelColor = input<'muted' | 'primary'>('muted');

  ngOnInit(): void {
    const el = this.el.nativeElement as HTMLElement;
    el.style.fontFamily = 'var(--font-mono)';
    el.style.fontSize = '0.6875rem'; // 11px
    el.style.fontWeight = '500';
    el.style.letterSpacing = '0.1em';
    el.style.textTransform = 'uppercase';

    if (this.labelColor() === 'primary') {
      el.style.color = 'var(--mat-sys-primary)';
    } else {
      el.style.color = 'var(--mat-sys-on-surface-variant)';
    }
  }
}
