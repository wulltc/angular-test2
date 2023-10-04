import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XbetComponent } from './xbet.component';

describe('XbetComponent', () => {
  let component: XbetComponent;
  let fixture: ComponentFixture<XbetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XbetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XbetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
