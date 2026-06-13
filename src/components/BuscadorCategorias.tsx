import { useEffect, useRef } from 'preact/hooks';

export default function BuscadorCategorias() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handler = () => {
      const term = input.value.toLowerCase();
      const cards = document.querySelectorAll('.tarjeta-categoria');
      cards.forEach((card) => {
        const name = card.getAttribute('data-name')?.toLowerCase() || '';
        card.classList.toggle('tarjeta-categoria--oculta', !name.includes(term));
      });
    };

    input.addEventListener('input', handler);
    return () => input.removeEventListener('input', handler);
  }, []);

  return (
    <div class="buscador-categorias">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="buscador-categorias__icono">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input ref={inputRef} class="buscador-categorias__input" type="text" placeholder="Buscar categorías..." id="buscador-categorias" />
    </div>
  );
}
