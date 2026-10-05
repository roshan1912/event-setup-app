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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
