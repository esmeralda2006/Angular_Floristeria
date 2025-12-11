import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
selector: 'app-root',
standalone: true,
imports: [
RouterOutlet, // necesario para <router-outlet>
RouterLink // necesario para routerLink en <a>
],
templateUrl: './app.html',
styleUrl: './app.css'
})
export class App {
protected readonly title = signal('floristeria-almacen');
}