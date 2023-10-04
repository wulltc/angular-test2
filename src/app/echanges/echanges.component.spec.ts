import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchangesComponent } from './echanges.component';

describe('EchangesComponent', () => {
  let component: EchangesComponent;
  let fixture: ComponentFixture<EchangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
