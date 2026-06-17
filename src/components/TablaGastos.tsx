import FilaGasto from './FilaGasto';
import type { ExpenseResponse } from '../types/gastos';

interface Props {
  expenses: ExpenseResponse[];
  loading?: boolean;
}

export default function TablaGastos({ expenses, loading }: Props) {
  return (
    <div class="tabla-datos">
      <div class="tabla-datos__cabecera">
        <span class="tabla-datos__cabecera-item">Fecha</span>
        <span class="tabla-datos__cabecera-item">Descripción</span>
        <span class="tabla-datos__cabecera-item">Categoría</span>
        <span class="tabla-datos__cabecera-item">Tipo</span>
        <span class="tabla-datos__cabecera-item">Monto</span>
      </div>
      <div class="tabla-datos__cuerpo">
        {loading ? (
          <p class="tabla-datos__mensaje">Cargando...</p>
        ) : expenses.length === 0 ? (
          <p class="tabla-datos__mensaje">Sin gastos registrados</p>
        ) : (
          expenses.map((g, i) => <FilaGasto key={g.id} gasto={g} />)
        )}
      </div>
    </div>
  );
}
