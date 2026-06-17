import { useState } from 'preact/hooks';
import { accountingFormat } from '../../lib/accounting';

interface Props {
  variant: string;
  label?: string;
  placeholder?: string;
  onChange?: (value: number) => void;
}

export default function AmountInput({ variant, label, placeholder, onChange }: Props) {
  const [display, setDisplay] = useState('');

  const handleBlur = () => {
    if (!display) return;
    const cleaned = display.replace(/[^0-9.-]/g, '');
    setDisplay(accountingFormat(cleaned));
    const num = parseFloat(cleaned);
    if (!isNaN(num) && onChange) onChange(num);
  };

  const handleInput = (e: Event) => {
    const el = e.target as HTMLInputElement;
    setDisplay(el.value);
  };

  const handleFocus = () => {
    const cleaned = display.replace(/[^0-9.-]/g, '');
    setDisplay(cleaned);
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
