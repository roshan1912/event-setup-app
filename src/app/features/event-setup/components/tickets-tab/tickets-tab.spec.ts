import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsTab } from './tickets-tab';

describe('TicketsTab', () => {
  let component: TicketsTab;
  let fixture: ComponentFixture<TicketsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsTab],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
