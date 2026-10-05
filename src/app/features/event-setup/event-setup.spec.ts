import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSetup } from './event-setup';

describe('EventSetup', () => {
  let component: EventSetup;
  let fixture: ComponentFixture<EventSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSetup],
    }).compileComponents();

    fixture = TestBed.createComponent(EventSetup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
