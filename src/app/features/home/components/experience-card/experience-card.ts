import { Component, Input, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { SurfaceDirective } from '../../../../shared/directives/surface/surface';
import { LangService } from '../../../../core/lang/lang';
import { Experience } from '../../models/experience';

@Component({
  selector: 'app-experience-card',
  imports: [MatChipsModule, SurfaceDirective],
  templateUrl: './experience-card.html',
  styleUrl: './experience-card.scss',
})
export class ExperienceCardComponent {
  @Input({ required: true }) experience!: Experience;

  readonly lang = inject(LangService);
}
