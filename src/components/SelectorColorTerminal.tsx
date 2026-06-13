import { useState } from 'preact/hooks';

const COLORES = [
  { hex: '#00d2ff', name: 'Cyber Blue' },
  { hex: '#00ff88', name: 'Cyber Green' },
  { hex: '#ff4466', name: 'Neon Red' },
  { hex: '#ff44aa', name: 'Neon Pink' },
  { hex: '#44ff88', name: 'Toxic Green' },
  { hex: '#bd93f9', name: 'Purple' },
  { hex: '#ffb800', name: 'Warning' },
  { hex: '#ff8844', name: 'Orange' },
];

interface Props {
  inicial?: string;
}

export default function SelectorColorTerminal({ inicial = '#00d2ff' }: Props) {
  const [seleccionado, setSeleccionado] = useState(inicial);

  return (
    <div class="selector-color">
      {COLORES.map((c) => (
        <button
          class={`selector-color__item${c.hex === seleccionado ? ' selector-color__item--seleccionado' : ''}`}
          data-color={c.hex}
          title={c.name}
          onClick={() => setSeleccionado(c.hex)}
        />
      ))}
    </div>
  );
}
