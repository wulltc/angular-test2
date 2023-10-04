import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedCryptosComponent } from './supported-cryptos.component';

describe('SupportedCryptosComponent', () => {
  let component: SupportedCryptosComponent;
  let fixture: ComponentFixture<SupportedCryptosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportedCryptosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportedCryptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
