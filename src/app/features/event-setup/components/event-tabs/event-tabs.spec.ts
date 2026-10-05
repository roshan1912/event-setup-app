import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTabs } from './event-tabs';

describe('EventTabs', () => {
  let component: EventTabs;
  let fixture: ComponentFixture<EventTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(EventTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
