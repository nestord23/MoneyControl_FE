import ListaPrestamos from './ListaPrestamos';
import Paginacion from './Paginacion';
import type { LoanResponse } from '../types/prestamos';

interface Props {
  loans: LoanResponse[];
  page: number;
  totalPages: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onMarkAsPaid?: (id: number) => void;
}

export default function TablaAmortizacion({ loans, page, totalPages, loading, onPageChange, onMarkAsPaid }: Props) {
  return (
    <div class="tabla-amortizacion">
      <div class="tabla-amortizacion__cabecera">
        <span class="tabla-amortizacion__item">Prestatario</span>
        <span class="tabla-amortizacion__item">Monto</span>
        <span class="tabla-amortizacion__item">Fecha</span>
        <span class="tabla-amortizacion__item">Estado</span>
        <span class="tabla-amortizacion__item">Acción</span>
      </div>
      <ListaPrestamos loans={loans} loading={loading} onMarkAsPaid={onMarkAsPaid} />
      {totalPages > 1 && <Paginacion page={page} totalPages={totalPages} onPageChange={onPageChange} />}
    </div>
  );
}
