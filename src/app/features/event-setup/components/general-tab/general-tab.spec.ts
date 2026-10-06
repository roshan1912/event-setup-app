import { beforeEach, describe, expect, it } from 'vitest';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralTab } from './general-tab';

describe('GeneralTab', () => {
  let component: GeneralTab;
  let fixture: ComponentFixture<GeneralTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralTab],
    })
      .overrideTemplate(GeneralTab, '')
      .compileComponents();

    fixture = TestBed.createComponent(GeneralTab);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('eventForm', {});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
