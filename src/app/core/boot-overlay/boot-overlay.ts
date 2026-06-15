import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { BootService } from './boot.service';

interface BootLine {
  text: string;
  check?: true;
}

const LINES: BootLine[] = [{ text: 'loading portfolio.ts', check: true }];

@Component({
  selector: 'app-boot-overlay',
  templateUrl: './boot-overlay.html',
  styleUrl: './boot-overlay.scss',
})
export class BootOverlayComponent implements OnInit, OnDestroy {
  private readonly bootService = inject(BootService);
  private interval: ReturnType<typeof setInterval> | null = null;
  private fadeTimeout: ReturnType<typeof setTimeout> | null = null;
  private markTimeout: ReturnType<typeof setTimeout> | null = null;
  private lineIdx = 0;
  private charIdx = 0;

  readonly completedLines = signal<BootLine[]>([]);
  readonly currentText = signal('');
  readonly isDone = signal(false);
  readonly fading = signal(false);

  ngOnInit(): void {
    if (!this.bootService.isFirstLoad()) {
      // Not first load — just cover the bootstrap/lazy-chunk window, then fade.
      this.isDone.set(true);
      this.fadeTimeout = setTimeout(() => {
        this.fading.set(true);
        this.markTimeout = setTimeout(() => this.bootService.markSeen(), 400);
      }, 120);
      return;
    }
    this.interval = setInterval(() => this.tick(), 15);
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
    if (this.fadeTimeout) clearTimeout(this.fadeTimeout);
    if (this.markTimeout) clearTimeout(this.markTimeout);
    // Guarantee markSeen fires even when user navigates during the fade
    if (this.isDone()) this.bootService.markSeen();
  }

  private tick(): void {
    if (this.lineIdx >= LINES.length) return;

    const line = LINES[this.lineIdx];

    if (this.charIdx < line.text.length) {
      this.currentText.set(line.text.slice(0, this.charIdx + 1));
      this.charIdx++;
    } else {
      this.completedLines.update((l) => [...l, line]);
      this.currentText.set('');
      this.lineIdx++;
      this.charIdx = 0;

      if (this.lineIdx >= LINES.length) {
        clearInterval(this.interval!);
        this.interval = null;
        this.isDone.set(true);
        this.fadeTimeout = setTimeout(() => {
          this.fading.set(true);
          this.markTimeout = setTimeout(() => this.bootService.markSeen(), 400);
        }, 100);
      }
    }
  }
}
