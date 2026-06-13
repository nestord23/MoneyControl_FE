export interface PrestamoAPI {
  id: number;
  monto: number;
  tasaInteres: number;
  fechaProximoPago: string;
  identificador: string;
  pctPagado: number;
}

export interface CreatePrestamoDTO {
  monto: number;
  tasaInteres: number;
  fechaProximoPago: string;
  identificador: string;
}
