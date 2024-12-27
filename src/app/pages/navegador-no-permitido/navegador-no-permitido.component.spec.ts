import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegadorNoPermitidoComponent } from './navegador-no-permitido.component';

describe('NavegadorNoPermitidoComponent', () => {
  let component: NavegadorNoPermitidoComponent;
  let fixture: ComponentFixture<NavegadorNoPermitidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavegadorNoPermitidoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavegadorNoPermitidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
