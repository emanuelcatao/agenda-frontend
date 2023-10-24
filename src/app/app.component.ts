import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agenda-frontend';
  
  constructor(private themeService: ThemeService) {
    this.themeService.applyInitialTheme();
  }
}
