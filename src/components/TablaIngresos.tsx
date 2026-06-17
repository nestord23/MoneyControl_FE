import FilaIngreso from './FilaIngreso';
import type { IncomeResponse } from '../types/ingresos';

interface Props {
  incomes: IncomeResponse[];
  loading?: boolean;
}

export default function TablaIngresos({ incomes, loading }: Props) {
  return (
    <div class="tabla-datos tabla-datos--ingresos">
      <div class="tabla-datos__cabecera">
        <span class="tabla-datos__cabecera-item">Fecha</span>
        <span class="tabla-datos__cabecera-item">Descripción</span>
        <span class="tabla-datos__cabecera-item">Monto</span>
      </div>
      <div class="tabla-datos__cuerpo">
        {loading ? (
          <p class="tabla-datos__mensaje">Cargando...</p>
        ) : incomes.length === 0 ? (
          <p class="tabla-datos__mensaje">Sin ingresos registrados</p>
        ) : (
          incomes.map((ingreso, i) => <FilaIngreso key={ingreso.id ?? i} ingreso={ingreso} />)
        )}
      </div>
    </div>
  );
}
