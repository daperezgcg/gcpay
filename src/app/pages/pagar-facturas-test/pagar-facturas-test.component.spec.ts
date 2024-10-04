import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarFacturasTestComponent } from './pagar-facturas-test.component';

describe('PagarFacturasTestComponent', () => {
  let component: PagarFacturasTestComponent;
  let fixture: ComponentFixture<PagarFacturasTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagarFacturasTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagarFacturasTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
