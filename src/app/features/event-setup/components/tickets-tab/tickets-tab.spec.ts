import { beforeEach, describe, expect, it } from 'vitest';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketsTab } from './tickets-tab';

describe('TicketsTab', () => {
  let component: TicketsTab;
  let fixture: ComponentFixture<TicketsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsTab],
    })
      .overrideTemplate(TicketsTab, '')
      .compileComponents();

    fixture = TestBed.createComponent(TicketsTab);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('eventForm', {});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
