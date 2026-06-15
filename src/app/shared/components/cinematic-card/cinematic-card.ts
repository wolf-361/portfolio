import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-cinematic-card',
  templateUrl: './cinematic-card.html',
  styleUrl: './cinematic-card.scss',
})
export class CinematicCardComponent {
  readonly featured = input<boolean>(false);
}
