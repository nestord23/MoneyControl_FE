import { useState, useEffect } from 'preact/hooks';
import { useUIStore } from '../store/ui';
import type { CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from '../types/categorias';

interface Props {
  editingCategory?: CategoryResponse | null;
  onCreate: (data: CreateCategoryRequest) => Promise<void>;
  onUpdate: (id: number, data: UpdateCategoryRequest) => Promise<void>;
}

export default function EditorCategorias({ editingCategory, onCreate, onUpdate }: Props) {
  const modalOpen = useUIStore(s => s.modalOpen);
  const closeModal = useUIStore(s => s.closeModal);
  const openModal = useUIStore(s => s.openModal);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const visible = modalOpen === 'categoria';

  useEffect(() => {
    const btnAbrir = document.getElementById('btn-nueva-categoria');
    const btnCerrar = document.getElementById('editor-cerrar');
    const overlay = document.getElementById('editor-overlay');

    const abrir = () => openModal('categoria');
    const cerrar = () => closeModal();
    const clickFuera = (e: MouseEvent) => {
      if (e.target === overlay) closeModal();
    };

    btnAbrir?.addEventListener('click', abrir);
    btnCerrar?.addEventListener('click', cerrar);
    overlay?.addEventListener('click', clickFuera);

    return () => {
      btnAbrir?.removeEventListener('click', abrir);
      btnCerrar?.removeEventListener('click', cerrar);
      overlay?.removeEventListener('click', clickFuera);
    };
  }, [openModal, closeModal]);

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setDescription(editingCategory.description || '');
      openModal('categoria');
    }
  }, [editingCategory, openModal]);

  const handleSave = async () => {
    if (!name.trim()) return;
    if (editingCategory) {
      await onUpdate(editingCategory.id, { name: name.trim(), description: description.trim() || null });
    } else {
      await onCreate({ name: name.trim(), description: description.trim() || null });
    }
    setName('');
    setDescription('');
    closeModal();
  };

  return (
    <div class={`editor-overlay${visible ? ' editor-overlay--visible' : ''}`} id="editor-overlay">
      <div class="editor-modal">
        <div class="editor-modal__encabezado">
          <span class="editor-modal__titulo">{editingCategory ? 'Edit Category' : 'New Category'}</span>
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
            <input class="editor-modal__input" type="text" placeholder="ej. Servicios, Nómina..." value={name} onInput={e => setName((e.target as HTMLInputElement).value)} />
          </div>
          <div class="editor-modal__grupo">
            <label class="editor-modal__etiqueta">Descripción</label>
            <input class="editor-modal__input" type="text" placeholder="Descripción opcional..." value={description} onInput={e => setDescription((e.target as HTMLInputElement).value)} />
          </div>
          <button class="editor-modal__accion" onClick={handleSave}>
            {editingCategory ? 'UPDATE' : 'SAVE'}
          </button>
        </div>
      </div>
    </div>
  );
}
