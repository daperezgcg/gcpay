import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import {
  IBill,
  IDataPay,
  ITotals,
  IWompi,
} from '@interfaces/pagar-facturas.interface';

@Injectable({
  providedIn: 'root',
})
export class GcPayService {
  public classStatus: Record<string, string> = {
    Rechazado: 'bg-red-500/25 text-red-500',
    Anulado: 'bg-red-500/25 text-red-500',
    Aprobado: 'bg-green-500/25 text-green-500',
    'En espera': 'bg-blue-500/25 text-blue-500',
    Error: 'bg-red-500/25 text-red-500',
  };

  private readonly httpClient: HttpClient;
  private readonly urlApi: string;
  public isPaying: boolean = false;

  public billsSelected: IBill[] = [];
  public discountsSelected: IBill[] = [];

  public totalValues: ITotals = {
    iva: 0,
    total: 0,
    reteIca: 0,
    reteIva: 0,
    subTotal: 0,
    reteFuente: 0,
    deduccionesNotaCredito: 0,
  };

  constructor() {
    this.httpClient = inject(HttpClient);
    this.urlApi = environment.GCpayApi;
  }

  public getBills = () => {
    const formData = new FormData();
    formData.append('funcion', 'facturas');
    formData.append('test', '1');

    return this.httpClient.post<IDataPay>(this.urlApi, formData);
  };

  public payBills = (monto: number, facturas: string[]) => {
    const formData = new FormData();
    formData.append('monto', monto + '');
    formData.append('funcion', 'enlace');
    formData.append('test', '1');

    facturas.forEach((factura, index) => {
      formData.append(`facturas[${index}]`, factura);
    });

    return this.httpClient.post<IWompi>(this.urlApi, formData);
  };

  public consultState = (id: string) => {
    const formData = new FormData();
    formData.append('test', '1');
    formData.append('id', id);
    formData.append('funcion', 'estado');

    return this.httpClient.post<any>(this.urlApi, formData);
  };

  public getHistory() {
    const formData = new FormData();
    formData.append('test', '1');
    formData.append('funcion', 'historial');

    return this.httpClient.post<any>(this.urlApi, formData);
  }

  public getReceiptBill(id: string) {
    const formData = new FormData();
    formData.append('funcion', 'buscar_transaccion');
    formData.append('tr_wompi', id);

    return this.httpClient.post<any>(this.urlApi, formData);
  }
}
