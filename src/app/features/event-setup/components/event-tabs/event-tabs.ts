import { Component, input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { GeneralTab } from '../general-tab/general-tab';
import { TicketsTab } from '../tickets-tab/tickets-tab';

@Component({
  selector: 'app-event-tabs',
  imports: [MatTabsModule, GeneralTab, TicketsTab],
  templateUrl: './event-tabs.html',
  styleUrl: './event-tabs.css',
})
export class EventTabs {
  eventForm = input.required<any>();
}
