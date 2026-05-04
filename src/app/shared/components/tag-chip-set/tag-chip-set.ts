import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-tag-chip-set',
  templateUrl: './tag-chip-set.html',
  styleUrl: './tag-chip-set.scss',
})
export class TagChipSetComponent {
  readonly tags = input.required<string[]>();
  readonly accentFirst = input<boolean>(false);
}
