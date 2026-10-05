import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tickets-tab',
  imports: [],
  templateUrl: './tickets-tab.html',
  styleUrl: './tickets-tab.css',
})
export class TicketsTab {
  eventForm = input.required<any>();
}
