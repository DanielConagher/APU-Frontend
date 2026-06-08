import { Component, signal } from '@angular/core';
import { TheoryContentComponent } from './pages/theory-content/theory-content';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    TheoryContentComponent,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend_APU');
}
