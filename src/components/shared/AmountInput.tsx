import { useState } from 'preact/hooks';
import { accountingFormat, rawValue } from '../../lib/accounting';

interface Props {
  variant: string;
  label?: string;
  placeholder?: string;
}

export default function AmountInput({ variant, label, placeholder }: Props) {
  const [raw, setRaw] = useState('');
  const [display, setDisplay] = useState('');

  const handleFocus = () => {
    setDisplay(raw);
  };

  const handleBlur = () => {
    if (!display) return;
    const cleaned = display.replace(/[^0-9.-]/g, '');
    setRaw(cleaned);
    setDisplay(accountingFormat(cleaned));
  };

  const handleInput = (e: Event) => {
    const el = e.target as HTMLInputElement;
    setDisplay(el.value);
    setRaw(el.value.replace(/[^0-9.-]/g, ''));
  };

  return (
    <div class={`amount-input amount-input--${variant}`}>
      {label && <span class="amount-input__label">{label}</span>}
      <input
        class="amount-input__field"
        type="text"
        inputmode="decimal"
        placeholder={placeholder || "Q0.00"}
        value={display}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
      />
    </div>
  );
}
