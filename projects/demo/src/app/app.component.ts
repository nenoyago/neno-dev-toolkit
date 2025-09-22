import { Component, inject, OnInit, signal } from '@angular/core';

import { LivButtonComponent, THEME_CONFIG } from '@neno-liv/design-system';

@Component({
  selector: 'app-root',
  imports: [LivButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly year = signal(new Date().getFullYear());
  readonly theme = inject(THEME_CONFIG, { optional: true });

  ngOnInit(): void {
    console.log(
      '🚀 ~ AppComponent ~ ngOnInit ~ theme:',
      this.theme?.colors['brand-secondary-dark'],
    );
  }
}
