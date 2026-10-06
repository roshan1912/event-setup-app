import { Component, signal } from '@angular/core';
import { form, validate } from '@angular/forms/signals';
import { EventTabs } from './components/event-tabs/event-tabs';

@Component({
  selector: 'app-event-setup',
  imports: [EventTabs],
  templateUrl: './event-setup.html',
  styleUrl: './event-setup.css',
})
export class EventSetup {
  eventModel = signal({
    eventName: '',
    description: '',
    schedule: {
      date: '',
      startTime: '',
      duration: 0,
    },
    ticketTiers: [] as { label: string; price: number }[],
  });

  eventForm = form(this.eventModel, (path) => {
    validate(path.schedule, ({ value }) => {
      const schedule = value();

      if (!schedule.date) {
        return {
          kind: 'required',
          message: 'Date is required',
        };
      }

      if (!schedule.startTime) {
        return {
          kind: 'required',
          message: 'Start time is required',
        };
      }

      if (schedule.duration <= 0) {
        return {
          kind: 'invalidDuration',
          message: 'Duration must be greater than 0',
        };
      }

      return null;
    });

    validate(path.ticketTiers, ({ value }) => {
      const tiers = value();

      if (tiers.length === 0) {
        return {
          kind: 'required',
          message: 'At least one ticket tier is required',
        };
      }

      const invalidTier = tiers.some((tier) => !tier.label.trim() || tier.price <= 0);

      if (invalidTier) {
        return {
          kind: 'invalidTier',
          message: 'Each ticket tier needs a label and price greater than 0',
        };
      }

      return null;
    });
  });

  onSubmit(): void {
    if (!this.eventForm().valid()) {
      return;
    }
    console.log('Submitted event:', this.eventModel());
  }
}
