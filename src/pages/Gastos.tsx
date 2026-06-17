import CabeceraGastos from '../components/CabeceraGastos';
import BarraFiltros from '../components/BarraFiltros';
import TablaGastos from '../components/TablaGastos';
import PanelResumen from '../components/PanelResumen';
import Paginacion from '../components/Paginacion';
import ModalGasto from '../components/ModalGasto';
import { useExpensesList } from '../hooks/useExpensesList';
import { useExpensesSummary } from '../hooks/useExpensesSummary';
import { useCategoriesList } from '../hooks/useCategoriesList';
import { useUIStore } from '../store/ui';
import type { CreateExpenseRequest } from '../types/gastos';

export default function Gastos() {
  const { expenses, totalPages, page, loading, filterByCategory, setPage, setCategoryFilter, create } = useExpensesList();
  const { summary, loading: summaryLoading, refresh: refreshSummary } = useExpensesSummary();
  const { categories } = useCategoriesList();
  const showToast = useUIStore(s => s.showToast);

  const handleCreate = async (data: CreateExpenseRequest) => {
    try {
      await create(data);
      refreshSummary();
      showToast('Gasto registrado correctamente', 'success');
    } catch (e: any) {
      showToast(e.message || 'Error al registrar gasto', 'error');
    }
  };

  return (
    <div class="pagina-gastos">
      <CabeceraGastos />
      <BarraFiltros categories={categories} selectedCategory={filterByCategory} onCategoryChange={setCategoryFilter} />
      <div class="pagina-gastos__contenido">
        <div>
          <TablaGastos expenses={expenses} loading={loading} />
          <Paginacion page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
        <PanelResumen summary={summary} loading={summaryLoading} />
      </div>
      <ModalGasto categories={categories} onSubmit={handleCreate} />
    </div>
  );
}
