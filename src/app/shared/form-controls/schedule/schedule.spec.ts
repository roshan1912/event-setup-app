import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Schedule } from './schedule';

describe('Schedule', () => {
  let component: Schedule;
  let fixture: ComponentFixture<Schedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Schedule],
    }).compileComponents();

    fixture = TestBed.createComponent(Schedule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write a schedule value', () => {
    component.writeValue({
      date: '2026-10-10',
      startTime: '10:30',
      duration: 60,
    });

    expect(component.date()).toBe('2026-10-10');
    expect(component.startTime()).toBe('10:30');
    expect(component.duration()).toBe(60);
  });

  it('should emit the combined schedule value', () => {
    const onChange = vi.fn();

    component.registerOnChange(onChange);

    component.date.set('2026-10-10');
    component.startTime.set('10:30');
    component.duration.set(60);

    component.updateValue();

    expect(onChange).toHaveBeenCalledWith({
      date: '2026-10-10',
      startTime: '10:30',
      duration: 60,
    });
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

    expect(component.date()).toBe('');
    expect(component.startTime()).toBe('');
    expect(component.duration()).toBeNull();
  });
});
