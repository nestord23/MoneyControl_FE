import { useEffect } from 'preact/hooks';

interface Fuente {
  nombre: string;
  monto: number;
  icono: string;
}

const fuentes: Fuente[] = [
  { nombre: 'Banco', monto: 28680, icono: 'M3 3h18v18H3V3zm2 2v14h14V5H5zm4 2h6v2H9V7zm0 4h6v2H9v-2zm0 4h4v2H9v-2z' },
  { nombre: 'Crypto', monto: 6200, icono: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { nombre: 'Cash', monto: 2470, icono: 'M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 000 4h4v-4h-4z' },
];

const maxMonto = Math.max(...fuentes.map((f) => f.monto));

export default function ListaTopFuentes() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = fuentes.map((f, i) =>
      `.lista-fuentes__item[data-index="${i}"] .lista-fuentes__barra-lleno { width: ${(f.monto / maxMonto) * 100}%; }`
    ).join('\n');
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div class="lista-fuentes">
      <span class="lista-fuentes__titulo">Top Sources</span>
      {fuentes.map((f, i) => (
        <div class="lista-fuentes__item" data-index={String(i)}>
          <div class="lista-fuentes__item-info">
            <div class="lista-fuentes__item-icono">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d={f.icono} />
              </svg>
            </div>
            <span class="lista-fuentes__item-nombre">{f.nombre}</span>
          </div>
          <span class="lista-fuentes__item-monto">${f.monto.toLocaleString('en-US')}</span>
          <div class="lista-fuentes__barra">
            <div class="lista-fuentes__barra-lleno"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
