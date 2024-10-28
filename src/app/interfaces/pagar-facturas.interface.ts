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

export interface IReceipt {
  tr_id: string;
  tr_wompi: string;
  tr_valor: number;
  tr_fecha: string;
  tr_estado?: string;
  estado?: string;
  facturas: IReceiptBill[];
}

interface IReceiptBill {
  fac_numero: number;
  tipo: number;
  monto: number;
}
