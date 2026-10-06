import { Component, input } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { TicketTiers } from '../../../../shared/form-controls/ticket-tiers/ticket-tiers';

@Component({
  selector: 'app-tickets-tab',
  imports: [FormField, TicketTiers],
  templateUrl: './tickets-tab.html',
  styleUrl: './tickets-tab.css',
})
export class TicketsTab {
  eventForm = input.required<any>();
}
