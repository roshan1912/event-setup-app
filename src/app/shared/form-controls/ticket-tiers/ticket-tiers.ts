import { Component, forwardRef, signal } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-ticket-tiers',
  imports: [],
  templateUrl: './ticket-tiers.html',
  styleUrl: './ticket-tiers.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TicketTiers),
      multi: true,
    },
  ],
})
export class TicketTiers implements ControlValueAccessor {
  tiers = signal<{ label: string; price: number }[]>([]);

  disabled = signal(false);

  private onChange: (
    value: { label: string; price: number }[]
  ) => void = () => {};

  private onTouched: () => void = () => {};

  writeValue(
    value: { label: string; price: number }[] | null
  ): void {
    this.tiers.set(value ? [...value] : []);
  }

  registerOnChange(
    fn: (value: { label: string; price: number }[]) => void
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  addTier(): void {
    this.tiers.update((tiers) => [
      ...tiers,
      {
        label: '',
        price: 0,
      },
    ]);

    this.emitValue();
  }

  removeTier(index: number): void {
    this.tiers.update((tiers) =>
      tiers.filter((_, i) => i !== index)
    );

    this.emitValue();
    this.onTouched();
  }

  updateLabel(index: number, label: string): void {
    this.tiers.update((tiers) =>
      tiers.map((tier, i) =>
        i === index
          ? { ...tier, label }
          : tier
      )
    );

    this.emitValue();
  }

  updatePrice(index: number, price: number): void {
    this.tiers.update((tiers) =>
      tiers.map((tier, i) =>
        i === index
          ? { ...tier, price }
          : tier
      )
    );

    this.emitValue();
  }

  markTouched(): void {
    this.onTouched();
  }

  private emitValue(): void {
    this.onChange(this.tiers());
  }
}