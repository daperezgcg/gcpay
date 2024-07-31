import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { GcPayService } from '@services/gcpay.service';
import { toastAlert } from '@utilities/toastAlert.utils';
import { Component, OnInit, inject } from '@angular/core';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';
import { FormatNumberPipe } from '@pipes/format-number.pipe';
import { flowbiteUtilities } from '@utilities/flowbite.utils';
import { Modal, ModalInterface, initFlowbite } from 'flowbite';
import { CalendarDirective } from '@directives/calendar.directive';
import { ModalPayComponent } from './modal-pay/modal-pay.component';
import { LoaderComponent } from '@templates/loader/loader.component';
import { IBill, ITotals } from '@interfaces/pagar-facturas.interface';
import { ModalStateComponent } from './modal-state/modal-state.component';
import { ModalLoadingComponent } from './modal-loading/modal-loading.component';
import { ModalImpuestoComponent } from './modal-impuesto/modal-impuesto.component';
import { UserWidgetComponent } from '@templates/user-widget/user-widget.component';
FormatNumberPipe;
@Component({
  selector: 'app-pago-de-facturas',
  standalone: true,
  imports: [
    DatePipe,
    LoaderComponent,
    FormatNumberPipe,
    CalendarDirective,
    ModalPayComponent,
    UserWidgetComponent,
    ModalStateComponent,
    ModalLoadingComponent,
    ModalImpuestoComponent,
  ],
  templateUrl: './pago-de-facturas.component.html',
  styleUrl: './pago-de-facturas.component.scss',
})
export class PagodeFacturasComponent implements OnInit {
  private interval?: any;
  private initFlowbite: boolean = true;
  private gcPayService: GcPayService = inject(GcPayService);

  public isLoading: boolean = false;
  public router: Router = new Router();
  public stateTransaction: string = '0';

  public bills: IBill[] = [];
  public showBills: IBill[] = [];
  public discounts: IBill[] = [];

  public billsSelected: IBill[] = [];
  public discountsSelected: IBill[] = [];

  public modalTax?: IBill;

  public totalValues: ITotals = {
    iva: 0,
    total: 0,
    reteIca: 0,
    reteIva: 0,
    subTotal: 0,
    reteFuente: 0,
    deduccionesNotaCredito: 0,
  };

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

    this.discountsSelected = [];
    discountInput.forEach((item) => {
      item.checked = false;
    });

    this.updateValuesTotal();
  }

  addOrDeleteToArray(dato: IBill, tipo: 'bill' | 'discount', event: Event) {
    let target = tipo === 'bill' ? this.billsSelected : this.discountsSelected;

    const index = target.findIndex(
      (data) => data.nro_factura === dato.nro_factura
    );

    if (index === -1) {
      if (tipo === 'discount') {
        if (!this.billsSelected.length) {
          event.preventDefault();
          return toastAlert.fireAlert(
            'error',
            'Por favor, selecciona una factura para aplicar nota crédito'
          );
        } else if (this.totalValues.total < dato.valor_factura) {
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
    if (this.totalValues.total < 0) {
      this.validateDiscount(this.totalValues.total);
    }
  }

  updateValuesTotal() {
    this.totalValues = {
      deduccionesNotaCredito: 0,
      iva: 0,
      reteFuente: 0,
      reteIca: 0,
      reteIva: 0,
      subTotal: 0,
      total: 0,
    };
    this.billsSelected.forEach((data) => {
      this.totalValues.iva += +data.iva;
      this.totalValues.reteIca += +data.rete_ica;
      this.totalValues.reteIva += +data.rete_iva;
      this.totalValues.reteFuente += +data.rete_fuente;
      this.totalValues.subTotal +=
        +data.valor_factura -
        +data.iva +
        +data.rete_ica +
        +data.rete_iva +
        +data.rete_fuente;
      this.totalValues.total += +data.valor_factura;
    });
    this.discountsSelected.forEach((data) => {
      this.totalValues.deduccionesNotaCredito += +data.valor_factura;
      this.totalValues.total -= +data.valor_factura;
    });
  }

  awaitTransaction(id: string) {
    let limit = 10;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.gcPayService.consultState(id).subscribe((data) => {
        if (data != '0') {
          this.stateTransaction = data;
          this.toggleModals();
          this.getBills();
        } else if (limit === 0) {
          this.stateTransaction = '0';
          this.toggleModals();
        }
      });
      limit--;
    }, 30000);
  }

  payBillsModal() {
    flowbiteUtilities.openModal('#pay-modal');
  }

  toggleModals() {
    clearInterval(this.interval);

    const modalLoading: ModalInterface = new Modal(
      document.querySelector('#loading-modal')! as HTMLElement
    );
    modalLoading.hide();

    const modalState: ModalInterface = new Modal(
      document.querySelector('#state-modal')! as HTMLElement
    );
    modalState.show();
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
    return this.billsSelected.find((data) => {
      return data.nro_factura == bill.nro_factura;
    });
  }
}
