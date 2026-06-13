import ModalLayout from './shared/ModalLayout';
import AmountInput from './shared/AmountInput';
import ActionGroup from './shared/ActionGroup';

export default function ModalDeuda() {
  return (
    <ModalLayout
      id="modal-deuda"
      titulo="INJECT LIABILITY"
      idTecnico="SYSTEM_INPUT: LIABILITY_LOG"
      variant="deuda"
      openBtnId="btn-agregar-deuda"
    >
      <AmountInput variant="deuda" label="Principal Amount (GTQ)" placeholder="Q0.00" />

      <div class="modal-body__group">
        <label class="modal-body__label">Interest Rate</label>
        <input class="modal-body__input" type="text" placeholder="ej. 5.9" />
      </div>

      <div class="modal-body__group">
        <label class="modal-body__label">Next Payment Date</label>
        <input class="modal-body__input" type="date" />
      </div>

      <div class="modal-body__group">
        <label class="modal-body__label">Loan Identifier</label>
        <input class="modal-body__input" type="text" placeholder="ej. HIPOTECA-SCOTIA-001" />
      </div>

      <ActionGroup variant="deuda" ctaText="INJECT LIABILITY" ctaIcono="lock" />
    </ModalLayout>
  );
}
