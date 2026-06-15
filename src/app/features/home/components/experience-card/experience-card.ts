import { Component, input, inject } from '@angular/core';
import { TagChipSetComponent } from '../../../../shared/components/tag-chip-set/tag-chip-set';
import { CinematicCardComponent } from '../../../../shared/components/cinematic-card/cinematic-card';
import { LangService } from '../../../../core/lang/lang';
import { Experience } from '../../models/experience';

@Component({
  selector: 'app-experience-card',
  imports: [TagChipSetComponent, CinematicCardComponent],
  templateUrl: './experience-card.html',
  styleUrl: './experience-card.scss',
})
export class ExperienceCardComponent {
  readonly experience = input.required<Experience>();
  readonly compact = input<boolean>(false); // hides bullets, shows only header + chips
  readonly lang = inject(LangService);
}
