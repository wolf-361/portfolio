import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './core/layout/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      main {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class App {}
