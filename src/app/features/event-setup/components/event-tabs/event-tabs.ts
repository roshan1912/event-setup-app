import { Component } from '@angular/core';
import { GeneralTab } from '../general-tab/general-tab';
import { TicketsTab } from '../tickets-tab/tickets-tab';

@Component({
  selector: 'app-event-tabs',
  imports: [GeneralTab, TicketsTab],
  templateUrl: './event-tabs.html',
  styleUrl: './event-tabs.css',
})
export class EventTabs {}