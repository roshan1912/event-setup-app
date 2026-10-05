import { Component } from '@angular/core';
import { EventTabs } from './components/event-tabs/event-tabs';

@Component({
  selector: 'app-event-setup',
  imports: [EventTabs],
  templateUrl: './event-setup.html',
  styleUrl: './event-setup.css',
})
export class EventSetup {}