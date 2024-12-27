import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ITotals } from '@interfaces/pagar-facturas.interface';
import { FormatNumberPipe } from '@pipes/format-number.pipe';
import { GcPayService } from '@services/gcpay.service';
import { LoaderComponent } from '@templates/loader/loader.component';
import { toastAlert } from '@utilities/toastAlert.utils';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormatNumberPipe, LoaderComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  gcPayService: GcPayService = inject(GcPayService);
  billsSelected;
  public totalValues: ITotals = {
    iva: 0,
    total: 0,
    reteIca: 0,
    reteIva: 0,
    subTotal: 0,
    reteFuente: 0,
    deduccionesNotaCredito: 0,
  };

  totalDiscounts;
  isLoading = false;

  constructor(private Router: Router) {
    initFlowbite();
    this.billsSelected = this.gcPayService.billsSelected;
    this.totalValues = this.gcPayService.totalValues;
    this.totalDiscounts = this.gcPayService.discountsSelected;
  }

  clearPayment() {
    this.billsSelected = [];
    this.totalValues = {
      iva: 0,
      total: 0,
      reteIca: 0,
      reteIva: 0,
      subTotal: 0,
      reteFuente: 0,
      deduccionesNotaCredito: 0,
    };
    this.totalDiscounts = [];
    window.location.reload();
  }

  payBills() {
    if (!this.totalValues) return;

    const bills = [...this.billsSelected, ...this.totalDiscounts].map(
      (data) => {
        return data.nro_factura + '-' + data.tipo_documento;
      }
    );

    this.gcPayService.payBills(this.totalValues.total, bills).subscribe({
      next: (data) => {
        if (data.estado === 0) {
          toastAlert.fireAlert(
            'error',
            'Algunas de las facturas seleccionadas ya están en proceso de pago. Por favor, inténtalo nuevamente más tarde.'
          );
        } else {
          window.location.href = data.enlace;
        }
      },
      error: (err) => {
        toastAlert.fireAlert(
          'error',
          'Ocurrió un error al intentar realizar el pago. Inténtalo de nuevo más tarde.'
        );
        console.error(err);
      },
    });
  }
}
