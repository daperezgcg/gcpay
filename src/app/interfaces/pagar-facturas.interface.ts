export interface IBill {
   tipo: string;
   tipo_documento: string;
   nro_factura: number;
   fecha_vencimiento: string;
   concepto_facturacion: string;
   valor_factura: number;
   iva: number;
   rete_iva: number;
   rete_fuente: number;
   rete_ica: number;
   estado: boolean;
}

export interface ITotals {
   subTotal: number;
   iva: number;
   reteIva: number;
   reteIca: number;
   reteFuente: number;
   total: number;
   deduccionesNotaCredito: number;
}

export interface IDataPay {
   facturas: IBill[];
   descuentos: IBill[];
}

export interface IWompi {
   enlace: string;
   id: string;
}