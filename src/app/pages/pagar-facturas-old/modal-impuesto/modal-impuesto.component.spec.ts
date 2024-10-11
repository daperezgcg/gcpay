import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImpuestoComponent } from './modal-impuesto.component';

describe('ModalImpuestoComponent', () => {
   let component: ModalImpuestoComponent;
   let fixture: ComponentFixture<ModalImpuestoComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [ModalImpuestoComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ModalImpuestoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
