import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { IBill } from '@interfaces/pagar-facturas.interface';
import { FormatNumberPipe } from '@pipes/format-number.pipe';
import { GcPayServiceTest } from '@services/gcpay-test.service';

import { LoaderComponent } from '@templates/loader/loader.component';
import { UserWidgetComponent } from '@templates/user-widget/user-widget.component';
import { toastAlert } from '@utilities/toastAlert.utils';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-seleccionar-facturas',
  standalone: true,
  imports: [
    DatePipe,
    UserWidgetComponent,
    FormatNumberPipe,
    LoaderComponent,
    UserWidgetComponent,
  ],
  templateUrl: './seleccionar-facturas.component.html',
  styleUrl: './seleccionar-facturas.component.scss',
})
export class SeleccionarFacturasComponent implements OnInit {
  @Output()
  private goToCheckout: EventEmitter<string> = new EventEmitter();
  private initFlowbite: boolean = true;

  public bills: IBill[] = [];
  public showBills: IBill[] = [];
  public discounts: IBill[] = [];
  gcPayService: GcPayServiceTest = inject(GcPayServiceTest);

  public isLoading: boolean = false;
  public modalTax?: IBill;

  ngOnInit(): void {
    this.getBills();
  }

  getBills() {
    this.isLoading = true;
    this.gcPayService.getBills().subscribe((data) => {
      this.isLoading = false;
      this.bills = data.facturas;
      this.showBills = data.facturas;
      this.discounts = data.descuentos;
      console.log(data, '76');

      if (this.initFlowbite) {
        this.initFlowbite = false;
        setTimeout(() => {
          initFlowbite();
        }, 0);
      }
    });
  }

  validateDiscount(ammount: number) {
    const discountInput = document.querySelectorAll(
      '.discountInput'
    ) as NodeListOf<HTMLInputElement>;

    toastAlert.fireAlert(
      'info',
      'Nota crédito deseleccionadas, el valor de los descuentos no puede ser mayor del total a pagar'
    );

    this.gcPayService.discountsSelected = [];
    discountInput.forEach((item) => {
      item.checked = false;
    });

    this.updateValuesTotal();
  }

  addOrDeleteToArray(dato: IBill, tipo: 'bill' | 'discount', event: Event) {
    let target =
      tipo === 'bill'
        ? this.gcPayService.billsSelected
        : this.gcPayService.discountsSelected;

    const index = target.findIndex(
      (data) => data.nro_factura === dato.nro_factura
    );

    if (index === -1) {
      if (tipo === 'discount') {
        if (!this.gcPayService.billsSelected.length) {
          event.preventDefault();
          return toastAlert.fireAlert(
            'error',
            'Por favor, selecciona una factura para aplicar nota crédito'
          );
        } else if (this.gcPayService.totalValues.total < dato.valor_factura) {
          event.preventDefault();
          return toastAlert.fireAlert(
            'error',
            'El valor total de descuentos no puede ser mayor al total a pagar'
          );
        }
      }
      target.push(dato);
    } else {
      target.splice(index, 1);
      // this.verifyDiscounts();
    }
    this.updateValuesTotal();
    if (this.gcPayService.totalValues.total < 0) {
      this.validateDiscount(this.gcPayService.totalValues.total);
    }
  }

  updateValuesTotal() {
    this.gcPayService.totalValues = {
      deduccionesNotaCredito: 0,
      iva: 0,
      reteFuente: 0,
      reteIca: 0,
      reteIva: 0,
      subTotal: 0,
      total: 0,
    };
    this.gcPayService.billsSelected.forEach((data) => {
      this.gcPayService.totalValues.iva += +data.iva;
      this.gcPayService.totalValues.reteIca += +data.rete_ica;
      this.gcPayService.totalValues.reteIva += +data.rete_iva;
      this.gcPayService.totalValues.reteFuente += +data.rete_fuente;
      this.gcPayService.totalValues.subTotal +=
        +data.valor_factura -
        +data.iva +
        +data.rete_ica +
        +data.rete_iva +
        +data.rete_fuente;
      this.gcPayService.totalValues.total += +data.valor_factura;
    });
    this.gcPayService.discountsSelected.forEach((data) => {
      this.gcPayService.totalValues.deduccionesNotaCredito +=
        +data.valor_factura;
      this.gcPayService.totalValues.total -= +data.valor_factura;
    });
  }

  payBills() {
    this.goToCheckout.emit();
    // flowbiteUtilities.openModal('#pay-modal');
  }

  sortBills(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    if (value == '1') {
      this.showBills = this.sortByStatus(this.bills);
      return;
    } else if (value == '2') {
      this.showBills = this.sortByStatus(this.bills).reverse();
      return;
    } else if (value == '3') {
      this.showBills = this.sortByDate(this.bills);
      return;
    } else if (value == '4') {
      this.showBills = this.sortByDate(this.bills).reverse();
      return;
    }

    this.showBills = this.bills;
  }

  sortByDate(bills: IBill[]) {
    return bills.sort((a, b) => {
      const dateA = new Date(a.fecha_vencimiento);
      const dateB = new Date(b.fecha_vencimiento);
      return dateA.getTime() - dateB.getTime();
    });
  }

  sortByStatus(bills: IBill[]) {
    return bills.sort((a, b) => {
      return a.estado === b.estado ? 0 : a.estado ? -1 : 1;
    });
  }

  busca(bill: IBill) {
    return this.gcPayService.billsSelected.find((data) => {
      return data.nro_factura == bill.nro_factura;
    });
  }
}
