import { Component } from '@angular/core';
import { EventSetup } from './features/event-setup/event-setup';

@Component({
  selector: 'app-root',
  imports: [EventSetup],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}