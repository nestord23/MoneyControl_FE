import ModalLayout from './shared/ModalLayout';
import AmountInput from './shared/AmountInput';
import TerminalToggle from './shared/TerminalToggle';
import ActionGroup from './shared/ActionGroup';

export default function ModalIngreso() {
  return (
    <ModalLayout
      id="modal-ingreso"
      titulo="REGISTER INCOME"
      idTecnico="SYSTEM_INPUT: INCOME_LOG"
      variant="ingreso"
      openBtnId="btn-registrar-ingreso"
    >
      <AmountInput variant="ingreso" label="Amount (GTQ)" placeholder="Q0.00" />

      <div class="modal-body__group">
        <label class="modal-body__label">Source Entity</label>
        <input class="modal-body__input" type="text" placeholder="ej. Cliente XYZ, Banco..." />
      </div>

      <div class="modal-body__group">
        <label class="modal-body__label">Ledger Category</label>
        <select class="modal-body__select">
          <option value="">Seleccionar categoría...</option>
          <option value="servicios">Servicios</option>
          <option value="nomina">Nómina</option>
          <option value="inversiones">Inversiones</option>
          <option value="marketing">Marketing</option>
          <option value="ventas">Ventas</option>
        </select>
      </div>

      <div class="modal-body__group">
        <label class="modal-body__label">Pulse Frequency</label>
        <TerminalToggle opciones={["RECURRING", "ONE-TIME"]} variant="ingreso" />
      </div>

      <ActionGroup variant="ingreso" ctaText="COMMIT TO LEDGER" ctaIcono="arrow-down" />
    </ModalLayout>
  );
}
