import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarFacturasComponent } from './seleccionar-facturas.component';

describe('SeleccionarFacturasComponent', () => {
  let component: SeleccionarFacturasComponent;
  let fixture: ComponentFixture<SeleccionarFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarFacturasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
