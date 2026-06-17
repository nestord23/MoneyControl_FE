import { useState } from 'preact/hooks';
import ModalLayout from './shared/ModalLayout';
import AmountInput from './shared/AmountInput';
import ActionGroup from './shared/ActionGroup';
import type { CreateLoanRequest } from '../types/prestamos';

interface Props {
  onSubmit: (data: CreateLoanRequest) => Promise<void>;
}

export default function ModalDeuda({ onSubmit }: Props) {
  const [amount, setAmount] = useState(0);
  const [lenderName, setLenderName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {
    if (!amount || !lenderName || !date) return;
    await onSubmit({
      amount,
      lenderName,
      date,
    });
    setAmount(0);
    setLenderName('');
    setDate('');
  };

  return (
    <ModalLayout
      id="modal-deuda"
      titulo="INJECT LIABILITY"
      idTecnico="SYSTEM_INPUT: LIABILITY_LOG"
      variant="deuda"
      openBtnId="btn-agregar-deuda"
    >
      <AmountInput variant="deuda" label="Principal Amount (GTQ)" placeholder="Q0.00" onChange={setAmount} />

      <div class="modal-body__group">
        <label class="modal-body__label">Lender Name</label>
        <input class="modal-body__input" type="text" placeholder="ej. Banco, Scotiabank..." value={lenderName} onChange={e => setLenderName((e.target as HTMLInputElement).value)} />
      </div>

      <div class="modal-body__group">
        <label class="modal-body__label">Date</label>
        <input class="modal-body__input" type="date" value={date} onChange={e => setDate((e.target as HTMLInputElement).value)} />
      </div>

      <ActionGroup variant="deuda" ctaText="INJECT LIABILITY" ctaIcono="lock" onSubmit={handleSubmit} modalId="modal-deuda" />
    </ModalLayout>
  );
}
