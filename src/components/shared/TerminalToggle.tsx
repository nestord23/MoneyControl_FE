import { useState } from 'preact/hooks';

interface Props {
  opciones: string[];
  variant: string;
  activo?: number;
  onChange?: (value: string) => void;
}

export default function TerminalToggle({ opciones, variant, activo = 0, onChange }: Props) {
  const [activeIdx, setActiveIdx] = useState(activo);

  const handleClick = (i: number) => {
    setActiveIdx(i);
    if (onChange) onChange(opciones[i]);
  };

  return (
    <div class={`terminal-toggle terminal-toggle--${variant}`}>
      {opciones.map((opt, i) => (
        <button
          class={`terminal-toggle__option${i === activeIdx ? ' terminal-toggle__option--active' : ''}`}
          onClick={() => handleClick(i)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
