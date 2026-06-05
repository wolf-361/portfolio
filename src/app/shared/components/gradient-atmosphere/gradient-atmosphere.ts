import { Component, input } from '@angular/core';

export type AtmosphereVariant = 'hero' | 'experiences' | 'projects' | 'contact';

@Component({
  selector: 'ui-gradient-atmosphere',
  template: `<ng-content />`,
  styleUrl: './gradient-atmosphere.scss',
  host: { '[attr.data-variant]': 'variant()' },
})
export class GradientAtmosphereComponent {
  readonly variant = input.required<AtmosphereVariant>();
}
