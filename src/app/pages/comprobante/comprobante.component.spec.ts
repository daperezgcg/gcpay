import { ComponentFixture, TestBed } from '@angular/core/testing';

import { comprobanteComponent } from './comprobante.component';

describe('comprobanteComponent', () => {
  let component: comprobanteComponent;
  let fixture: ComponentFixture<comprobanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [comprobanteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(comprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
