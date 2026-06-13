export interface IngresoAPI {
  id: number;
  monto: number;
  entidad: string;
  categoria: string;
  frecuencia: 'RECURRING' | 'ONE-TIME';
  fecha: string;
}

export interface CreateIngresoDTO {
  monto: number;
  entidad: string;
  categoria: string;
  frecuencia: 'RECURRING' | 'ONE-TIME';
}
