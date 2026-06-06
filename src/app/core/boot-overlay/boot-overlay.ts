import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { BootService } from './boot.service';

const LINES = ['initializing luc.allaire...', 'loading portfolio.ts', 'ready.'];

@Component({
  selector: 'app-boot-overlay',
  templateUrl: './boot-overlay.html',
  styleUrl: './boot-overlay.scss',
})
export class BootOverlayComponent implements OnInit, OnDestroy {
  private readonly bootService = inject(BootService);
  private interval: ReturnType<typeof setInterval> | null = null;
  private lineIdx = 0;
  private charIdx = 0;

  readonly completedLines = signal<string[]>([]);
  readonly currentText = signal('');
  readonly isDone = signal(false);
  readonly fading = signal(false);

  ngOnInit(): void {
    this.interval = setInterval(() => this.tick(), 30);
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }

  private tick(): void {
    if (this.lineIdx >= LINES.length) return;

    const line = LINES[this.lineIdx];

    if (this.charIdx <= line.length) {
      this.currentText.set(line.slice(0, this.charIdx));
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
        setTimeout(() => {
          this.fading.set(true);
          setTimeout(() => this.bootService.markSeen(), 400);
        }, 300);
      }
    }
  }
}
