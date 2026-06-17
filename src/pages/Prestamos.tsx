import CabeceraPrestamos from '../components/CabeceraPrestamos';
import ResumenPrestamos from '../components/ResumenPrestamos';
import TablaAmortizacion from '../components/TablaAmortizacion';
import GraficoAmortizacion from '../components/GraficoAmortizacion';
import CalculadoraPagos from '../components/CalculadoraPagos';
import ModalDeuda from '../components/ModalDeuda';
import { useLoansList } from '../hooks/useLoansList';
import { useLoansSummary } from '../hooks/useLoansSummary';
import { useUIStore } from '../store/ui';
import type { CreateLoanRequest } from '../types/prestamos';

export default function Prestamos() {
  const { loans, totalPages, page, loading, setPage, create, markAsPaid } = useLoansList();
  const { summary, loading: summaryLoading, refresh: refreshSummary } = useLoansSummary();
  const showToast = useUIStore(s => s.showToast);

  const handleCreate = async (data: CreateLoanRequest) => {
    try {
      await create(data);
      refreshSummary();
      showToast('Préstamo registrado correctamente', 'success');
    } catch (e: any) {
      showToast(e.message || 'Error al registrar préstamo', 'error');
    }
  };

  const handleMarkAsPaid = async (id: number) => {
    try {
      await markAsPaid(id);
      refreshSummary();
      showToast('Préstamo marcado como pagado', 'success');
    } catch (e: any) {
      showToast(e.message || 'Error al marcar préstamo', 'error');
    }
  };

  return (
    <div class="pagina-prestamos">
      <CabeceraPrestamos />
      <ResumenPrestamos summary={summary} loading={summaryLoading} />
      <div class="pagina-prestamos__contenido">
        <TablaAmortizacion loans={loans} page={page} totalPages={totalPages} loading={loading} onPageChange={setPage} onMarkAsPaid={handleMarkAsPaid} />
        <div class="pagina-prestamos__sidebar">
          <GraficoAmortizacion />
          <CalculadoraPagos />
        </div>
      </div>
      <ModalDeuda onSubmit={handleCreate} />
    </div>
  );
}
