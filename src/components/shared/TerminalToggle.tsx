import { useState } from 'preact/hooks';

interface Props {
  opciones: string[];
  variant: string;
  activo?: number;
}

export default function TerminalToggle({ opciones, variant, activo = 0 }: Props) {
  const [activeIdx, setActiveIdx] = useState(activo);

  return (
    <div class={`terminal-toggle terminal-toggle--${variant}`}>
      {opciones.map((opt, i) => (
        <button
          class={`terminal-toggle__option${i === activeIdx ? ' terminal-toggle__option--active' : ''}`}
          onClick={() => setActiveIdx(i)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
