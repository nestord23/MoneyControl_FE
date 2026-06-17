import { useState, useEffect } from 'preact/hooks';
import { incomesService } from '../services/incomesService';
import { expensesService } from '../services/expensesService';
import { getCached, setCache } from '../lib/cache';

const CACHE_KEY = 'page:dashboard:chart';

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
}

interface UseDashboardChartReturn {
  labels: string[];
  datasets: ChartDataset[];
  loading: boolean;
  error: string | null;
}

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export function useDashboardChart(year: number = new Date().getFullYear()): UseDashboardChartReturn {
  const [datasets, setDatasets] = useState<ChartDataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCached<ChartDataset[]>(CACHE_KEY);
    if (cached) {
      setDatasets(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    Promise.all([
      incomesService.getMonthlyTotals(year),
      expensesService.getMonthlyTotals(year),
    ])
      .then(([incomeData, expenseData]) => {
        const result: ChartDataset[] = [
          { label: 'Ingresos', data: incomeData, borderColor: '#00ff88' },
          { label: 'Gastos', data: expenseData, borderColor: '#ff4466' },
        ];
        setCache(CACHE_KEY, result);
        setDatasets(result);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [year]);

  return { labels: MESES, datasets, loading, error };
}
