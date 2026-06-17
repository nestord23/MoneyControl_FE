import FilaPrestamo from './FilaPrestamo';
import type { LoanResponse } from '../types/prestamos';

interface Props {
  loans: LoanResponse[];
  loading?: boolean;
  onMarkAsPaid?: (id: number) => void;
}

export default function ListaPrestamos({ loans, loading, onMarkAsPaid }: Props) {
  return (
    <div class="tabla-amortizacion__cuerpo">
      {loading ? (
        <p>Cargando...</p>
      ) : loans.length === 0 ? (
        <p>Sin préstamos registrados</p>
      ) : (
        loans.map((p, i) => <FilaPrestamo key={p.id ?? i} prestamo={p} onMarkAsPaid={onMarkAsPaid} />)
      )}
    </div>
  );
}
