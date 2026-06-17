import { useState } from 'preact/hooks';
import ModalLayout from './shared/ModalLayout';
import AmountInput from './shared/AmountInput';
import ActionGroup from './shared/ActionGroup';
import type { CreateIncomeRequest } from '../types/ingresos';

interface Props {
  onSubmit: (data: CreateIncomeRequest) => Promise<void>;
}

export default function ModalIngreso({ onSubmit }: Props) {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {
    if (!amount || !date) return;
    await onSubmit({
      amount,
      date,
      description: description || undefined,
    });
    setAmount(0);
    setDescription('');
    setDate('');
  };

  return (
    <ModalLayout
      id="modal-ingreso"
      titulo="REGISTER INCOME"
      idTecnico="SYSTEM_INPUT: INCOME_LOG"
      variant="ingreso"
      openBtnId="btn-registrar-ingreso"
    >
      <AmountInput variant="ingreso" label="Amount (GTQ)" placeholder="Q0.00" onChange={setAmount} />

      <div class="modal-body__group">
        <label class="modal-body__label">Description</label>
        <input class="modal-body__input" type="text" placeholder="ej. Cliente XYZ, Banco..." value={description} onChange={e => setDescription((e.target as HTMLInputElement).value)} />
      </div>

      <div class="modal-body__group">
        <label class="modal-body__label">Date</label>
        <input class="modal-body__input" type="date" value={date} onChange={e => setDate((e.target as HTMLInputElement).value)} />
      </div>

      <ActionGroup variant="ingreso" ctaText="COMMIT TO LEDGER" ctaIcono="arrow-down" onSubmit={handleSubmit} modalId="modal-ingreso" />
    </ModalLayout>
  );
}
