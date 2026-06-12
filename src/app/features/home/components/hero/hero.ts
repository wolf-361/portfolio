import { Component, effect, inject, signal } from '@angular/core';
import { LangService } from '../../../../core/lang/lang';
import { BootService } from '../../../../core/boot-overlay/boot.service';
import { HeroTerminalComponent } from './terminal/terminal';
import { GradientAtmosphereComponent } from '../../../../shared/components/gradient-atmosphere/gradient-atmosphere';
import { FloatingTextCanvasComponent } from '../../../../shared/components/floating-text-canvas/floating-text-canvas';

@Component({
  selector: 'app-hero',
  imports: [HeroTerminalComponent, GradientAtmosphereComponent, FloatingTextCanvasComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent {
  readonly lang = inject(LangService);
  private readonly bootService = inject(BootService);
  readonly entering = signal(false);

  constructor() {
    effect(() => {
      if (!this.bootService.showOverlay()) {
        requestAnimationFrame(() => this.entering.set(true));
      }
    });
  }
}
