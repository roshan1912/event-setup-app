import { beforeEach, describe, expect, it } from 'vitest';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventTabs } from './event-tabs';

describe('EventTabs', () => {
  let component: EventTabs;
  let fixture: ComponentFixture<EventTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventTabs],
    })
      .overrideTemplate(EventTabs, '')
      .compileComponents();

    fixture = TestBed.createComponent(EventTabs);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('eventForm', {});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
