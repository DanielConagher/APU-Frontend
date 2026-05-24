import { Component, signal } from '@angular/core';
import { TheoryContentComponent } from './pages/theory-content/theory-content';

@Component({
  selector: 'app-root',
  imports: [
    TheoryContentComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend_APU');
}
