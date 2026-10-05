import { Component, forwardRef, signal } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-schedule',
  imports: [],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Schedule),
      multi: true,
    },
  ],
})
export class Schedule implements ControlValueAccessor {
  date = signal('');
  startTime = signal('');
  duration = signal<number | null>(null);

  disabled = signal(false);

  private onChange: (value: {
    date: string;
    startTime: string;
    duration: number;
  }) => void = () => {};

  private onTouched: () => void = () => {};

  writeValue(
    value: {
      date: string;
      startTime: string;
      duration: number;
    } | null
  ): void {
    this.date.set(value?.date ?? '');
    this.startTime.set(value?.startTime ?? '');
    this.duration.set(value?.duration ?? null);
  }

  registerOnChange(
    fn: (value: {
      date: string;
      startTime: string;
      duration: number;
    }) => void
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  updateValue(): void {
    this.onChange({
      date: this.date(),
      startTime: this.startTime(),
      duration: this.duration() ?? 0,
    });
  }

  markTouched(): void {
    this.onTouched();
  }
}