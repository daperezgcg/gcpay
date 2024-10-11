import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { IDataPay, IWompi } from '@interfaces/pagar-facturas.interface';

@Injectable({
  providedIn: 'root',
})
export class GcPayServiceOld {
  private readonly httpClient: HttpClient;
  private readonly urlApi: string;
  public isPaying: boolean = false;

  constructor() {
    this.httpClient = inject(HttpClient);
    this.urlApi = environment.GCpayApi;
  }

  getApiData() {
    this.httpClient.get(this.urlApi).subscribe(
      (data) => {
        console.log('Datos recibidos desde GCpayApi:', data); // Mostrar en consola los datos
      },
      (error) => {
        console.error('Error al obtener los datos de GCpayApi:', error); // Manejo de error
      }
    );
  }

  public getBills = () => {
    const formData = new FormData();
    formData.append('funcion', 'facturas');

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

  // !VERIFICAR TIPOS

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
}
