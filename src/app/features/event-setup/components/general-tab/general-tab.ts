import { Component, input } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { Schedule } from '../../../../shared/form-controls/schedule/schedule';

@Component({
  selector: 'app-general-tab',
  imports: [FormField, Schedule],
  templateUrl: './general-tab.html',
  styleUrl: './general-tab.css',
})
export class GeneralTab {
  eventForm = input.required<any>();
}
