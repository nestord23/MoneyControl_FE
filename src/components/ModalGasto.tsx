import { useState } from 'preact/hooks';
import ModalLayout from './shared/ModalLayout';
import AmountInput from './shared/AmountInput';
import TerminalToggle from './shared/TerminalToggle';
import ActionGroup from './shared/ActionGroup';
import type { CategoryResponse } from '../types/categorias';
import type { CreateExpenseRequest, ExpenseType } from '../types/gastos';

interface Props {
  categories: CategoryResponse[];
  onSubmit: (data: CreateExpenseRequest) => Promise<void>;
}

export default function ModalGasto({ categories, onSubmit }: Props) {
  const [amount, setAmount] = useState(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [date, setDate] = useState('');
  const [type, setType] = useState<ExpenseType>(0);

  const handleSubmit = async () => {
    if (!amount || !categoryId || !date) return;
    await onSubmit({
      amount,
      categoryId,
      date,
      type,
    });
    setAmount(0);
    setCategoryId(0);
    setDate('');
    setType(0);
  };

  return (
    <ModalLayout
      id="modal-gasto"
      titulo="REGISTER EXPENSE"
      idTecnico="SYSTEM_INPUT: EXPENSE_LOG"
      variant="gasto"
      openBtnId="btn-agregar-gasto"
    >
      <AmountInput variant="gasto" label="Amount (GTQ)" placeholder="Q0.00" onChange={setAmount} />

      <div class="modal-body__group">
        <label class="modal-body__label">Categoría</label>
        <select class="modal-body__select" value={categoryId} onChange={e => setCategoryId(Number((e.target as HTMLSelectElement).value))}>
          <option value={0}>Seleccionar categoría...</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div class="modal-body__group">
        <label class="modal-body__label">Temporal Marker</label>
        <input class="modal-body__input" type="date" value={date} onChange={e => setDate((e.target as HTMLInputElement).value)} />
      </div>

      <div class="modal-body__group">
        <label class="modal-body__label">Recurrence Status</label>
        <TerminalToggle opciones={["Fixed", "Variable"]} variant="gasto" onChange={v => setType(v === 'Variable' ? 1 : 0)} />
      </div>

      <ActionGroup variant="gasto" ctaText="+ REGISTER ENTRY" ctaIcono="zap" onSubmit={handleSubmit} />
    </ModalLayout>
  );
}
