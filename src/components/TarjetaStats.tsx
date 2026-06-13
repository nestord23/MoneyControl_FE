interface Props {
  titulo: string;
  valor: string;
  variante: 'primary' | 'secondary' | 'alert';
  icono: string;
}

function IconoStats({ icono }: { icono: string }) {
  const paths: Record<string, JSX.Element> = {
    'trending-up': (
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    ),
    'trending-down': (
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    ),
    activity: (
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    ),
    'dollar-sign': (
      <>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </>
    ),
  };

  return (
    <svg class="tarjeta__icono" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      {paths[icono]}
    </svg>
  );
}

export default function TarjetaStats({ titulo, valor, variante, icono }: Props) {
  return (
    <article class="tarjeta tarjeta--destacado">
      <div class="tarjeta__encabezado">
        <span class="tarjeta__etiqueta">{titulo}</span>
        <IconoStats icono={icono} />
      </div>
      <div class="tarjeta__cuerpo">
        <span class={`tarjeta__valor tarjeta__valor--${variante}`}>
          {valor}
        </span>
      </div>
    </article>
  );
}
