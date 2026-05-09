import { Component, inject } from '@angular/core';
import { LangService } from '../../../../core/lang/lang';
import { HeroTerminalComponent } from './terminal/terminal';

@Component({
  selector: 'app-hero',
  imports: [HeroTerminalComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent {
  readonly lang = inject(LangService);
}
