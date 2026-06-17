import CabeceraIngresos from '../components/CabeceraIngresos';
import CintaMetricas from '../components/CintaMetricas';
import TablaIngresos from '../components/TablaIngresos';
import PaginacionTerminal from '../components/PaginacionTerminal';
import PanelCrecimiento from '../components/PanelCrecimiento';
import ModalIngreso from '../components/ModalIngreso';
import { useIncomesList } from '../hooks/useIncomesList';
import { useIncomesSummary } from '../hooks/useIncomesSummary';
import { useUIStore } from '../store/ui';
import type { CreateIncomeRequest } from '../types/ingresos';

export default function Ingresos() {
  const { incomes, totalPages, page, loading, setPage, create } = useIncomesList();
  const { summary, loading: summaryLoading, refresh: refreshSummary } = useIncomesSummary();
  const showToast = useUIStore(s => s.showToast);

  const handleCreate = async (data: CreateIncomeRequest) => {
    try {
      await create(data);
      refreshSummary();
      showToast('Ingreso registrado correctamente', 'success');
    } catch (e: any) {
      showToast(e.message || 'Error al registrar ingreso', 'error');
    }
  };

  return (
    <div class="pagina-ingresos">
      <CabeceraIngresos />
      <CintaMetricas summary={summary} loading={summaryLoading} />
      <div class="pagina-ingresos__contenido">
        <div>
          <TablaIngresos incomes={incomes} loading={loading} />
          <PaginacionTerminal page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
        <PanelCrecimiento />
      </div>
      <ModalIngreso onSubmit={handleCreate} />
    </div>
  );
}
