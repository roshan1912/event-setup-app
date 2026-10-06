import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketTiers } from './ticket-tiers';

describe('TicketTiers', () => {
  let component: TicketTiers;
  let fixture: ComponentFixture<TicketTiers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketTiers],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketTiers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write ticket tier values', () => {
    component.writeValue([
      {
        label: 'VIP',
        price: 1500,
      },
      {
        label: 'Regular',
        price: 500,
      },
    ]);

    expect(component.tiers()).toEqual([
      {
        label: 'VIP',
        price: 1500,
      },
      {
        label: 'Regular',
        price: 500,
      },
    ]);
  });

  it('should add a ticket tier', () => {
    const onChange = vi.fn();

    component.registerOnChange(onChange);

    component.addTier();

    expect(component.tiers()).toEqual([
      {
        label: '',
        price: 0,
      },
    ]);

    expect(onChange).toHaveBeenCalledWith([
      {
        label: '',
        price: 0,
      },
    ]);
  });

  it('should update a ticket tier', () => {
    component.writeValue([
      {
        label: 'VIP',
        price: 1000,
      },
    ]);

    const onChange = vi.fn();
    component.registerOnChange(onChange);

    component.updateLabel(0, 'Premium');
    component.updatePrice(0, 2000);

    expect(component.tiers()).toEqual([
      {
        label: 'Premium',
        price: 2000,
      },
    ]);

    expect(onChange).toHaveBeenLastCalledWith([
      {
        label: 'Premium',
        price: 2000,
      },
    ]);
  });

  it('should remove a ticket tier', () => {
    component.writeValue([
      {
        label: 'VIP',
        price: 1000,
      },
      {
        label: 'Regular',
        price: 500,
      },
    ]);

    const onChange = vi.fn();
    component.registerOnChange(onChange);

    component.removeTier(0);

    expect(component.tiers()).toEqual([
      {
        label: 'Regular',
        price: 500,
      },
    ]);

    expect(onChange).toHaveBeenCalledWith([
      {
        label: 'Regular',
        price: 500,
      },
    ]);
  });

  it('should call touched callback', () => {
    const onTouched = vi.fn();

    component.registerOnTouched(onTouched);

    component.markTouched();

    expect(onTouched).toHaveBeenCalled();
  });

  it('should update disabled state', () => {
    component.setDisabledState(true);

    expect(component.disabled()).toBe(true);

    component.setDisabledState(false);

    expect(component.disabled()).toBe(false);
  });

  it('should reset values when null is written', () => {
    component.writeValue(null);

    expect(component.tiers()).toEqual([]);
  });
});
