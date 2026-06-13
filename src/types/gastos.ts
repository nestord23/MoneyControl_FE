export interface GastoAPI {
  id: number;
  monto: number;
  sector: string;
  fecha: string;
  recurrencia: 'FIXED' | 'VARIABLE';
}

export interface CreateGastoDTO {
  monto: number;
  sector: string;
  fecha: string;
  recurrencia: 'FIXED' | 'VARIABLE';
}
