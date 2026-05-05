import { Directive, Input, OnDestroy, OnInit, output } from '@angular/core';

/**
 * ScrollSpyDirective — attach to a container, pass a list of section IDs.
 * Emits the ID of the section whose top edge is closest to (but above) 30%
 * of the viewport height. Falls back to the first section on page load.
 *
 * Usage:
 *   <div [uiScrollSpy]="['problem','architecture','results']"
 *        (activeSection)="activeId = $event">
 */
@Directive({
  selector: '[uiScrollSpy]',
})
export class ScrollSpyDirective implements OnInit, OnDestroy {
  private rafId = 0;
  private lastActive = '';

  @Input('uiScrollSpy') sectionIds: string[] = [];

  readonly activeSection = output<string>();

  ngOnInit(): void {
    // Wait a tick for the DOM, then start listening
    setTimeout(() => {
      this.update();
      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    cancelAnimationFrame(this.rafId);
  }

  private readonly onScroll = (): void => {
    cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => this.update());
  };

  private update(): void {
    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;
    // Trigger line: top of viewport + navbar offset (~80px)
    const triggerY = scrollY + 120;

    // If scrolled to the very bottom, force the last section active
    const atBottom = scrollY + viewportH >= document.documentElement.scrollHeight - 4;

    if (atBottom && this.sectionIds.length > 0) {
      const last = this.sectionIds[this.sectionIds.length - 1];
      if (last !== this.lastActive) {
        this.lastActive = last;
        this.activeSection.emit(last);
      }
      return;
    }

    let active = this.sectionIds[0] ?? '';

    for (const id of this.sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.offsetTop <= triggerY) {
        active = id;
      }
    }

    if (active !== this.lastActive) {
      this.lastActive = active;
      this.activeSection.emit(active);
    }
  }
}
