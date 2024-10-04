import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormatNumberPipe } from '@pipes/format-number.pipe';
import { GcPayServiceTest } from '@services/gcpay-test.service';
import { LoaderComponent } from '@templates/loader/loader.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [JsonPipe, FormatNumberPipe, LoaderComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  gcPayService: GcPayServiceTest = inject(GcPayServiceTest);
  billsSelected;
  totalValues: any;
  totalDiscounts;
  isLoading = false;

  constructor() {
    initFlowbite();
    this.billsSelected = this.gcPayService.billsSelected;
    this.totalValues = this.gcPayService.totalValues;
    this.totalDiscounts = this.gcPayService.discountsSelected; // Asegúrate de que sea correcto
  }

  payBills() {
    if (!this.totalValues) return;

    const bills = [...this.billsSelected, ...this.totalDiscounts].map(
      (data) => {
        return data.nro_factura + '-' + data.tipo_documento;
      }
    );

    const redirectUrl = 'https://web.gcgtest.com/gcradio';

    this.gcPayService
      .payBills(this.totalValues.total, bills, redirectUrl)
      .subscribe((data) => {
        // window.open(data.enlace);
        window.location.href = data.enlace;
        // console.log(data, 'data');
      });
  }
}
