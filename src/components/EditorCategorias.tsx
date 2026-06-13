import { useState, useEffect } from 'preact/hooks';

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

export default function EditorCategorias() {
  const [visible, setVisible] = useState(false);
  const [colorSel, setColorSel] = useState('#00d2ff');

  useEffect(() => {
    const btnAbrir = document.getElementById('btn-nueva-categoria');
    const btnCerrar = document.getElementById('editor-cerrar');
    const overlay = document.getElementById('editor-overlay');

    const abrir = () => setVisible(true);
    const cerrar = () => setVisible(false);
    const clickFuera = (e: MouseEvent) => {
      if (e.target === overlay) cerrar();
    };

    btnAbrir?.addEventListener('click', abrir);
    btnCerrar?.addEventListener('click', cerrar);
    overlay?.addEventListener('click', clickFuera);

    return () => {
      btnAbrir?.removeEventListener('click', abrir);
      btnCerrar?.removeEventListener('click', cerrar);
      overlay?.removeEventListener('click', clickFuera);
    };
  }, []);

  return (
    <div class={`editor-overlay${visible ? ' editor-overlay--visible' : ''}`} id="editor-overlay">
      <div class="editor-modal">
        <div class="editor-modal__encabezado">
          <span class="editor-modal__titulo">New Category</span>
          <button class="editor-modal__cerrar" id="editor-cerrar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div class="editor-modal__cuerpo">
          <div class="editor-modal__grupo">
            <label class="editor-modal__etiqueta">Nombre</label>
            <input class="editor-modal__input" type="text" placeholder="ej. Servicios, Nómina..." />
          </div>
          <div class="editor-modal__grupo">
            <label class="editor-modal__etiqueta">Icono</label>
            <select class="editor-modal__select">
              <option value="zap">⚡ Servicios</option>
              <option value="users">👥 Nómina</option>
              <option value="truck">🚚 Proveedores</option>
              <option value="tool">🔧 Operativos</option>
              <option value="trending-up">📈 Inversiones</option>
              <option value="megaphone">📢 Marketing</option>
              <option value="dollar-sign">💰 Ventas</option>
              <option value="shopping">🛒 Compras</option>
            </select>
          </div>
          <div class="editor-modal__grupo">
            <label class="editor-modal__etiqueta">Color</label>
            <div class="selector-color">
              {COLORES.map((c) => (
                <button
                  class={`selector-color__item${c.hex === colorSel ? ' selector-color__item--seleccionado' : ''}`}
                  data-color={c.hex}
                  title={c.name}
                  onClick={() => setColorSel(c.hex)}
                />
              ))}
            </div>
          </div>
          <div class="editor-modal__grupo">
            <label class="editor-modal__etiqueta">Presupuesto</label>
            <input class="editor-modal__input editor-modal__input--mono" type="text" placeholder="Q0.00" />
          </div>
          <button class="editor-modal__accion">SAVE</button>
        </div>
      </div>
    </div>
  );
}
