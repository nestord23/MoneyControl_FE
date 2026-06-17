import { useEffect } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { useUIStore } from '../../store/ui';
import type { ModalType } from '../../store/ui';

interface Props {
  id: string;
  titulo: string;
  idTecnico: string;
  variant: ModalType;
  openBtnId: string;
  closeBtnId?: string;
  children: ComponentChildren;
}

export default function ModalLayout({
  id, titulo, idTecnico, variant, openBtnId, closeBtnId, children
}: Props) {
  const modalOpen = useUIStore(s => s.modalOpen);
  const openModal = useUIStore(s => s.openModal);
  const closeModal = useUIStore(s => s.closeModal);
  const visible = modalOpen === variant;
  const closeId = closeBtnId || `${id}-cerrar`;

  useEffect(() => {
    const btnAbrir = document.getElementById(openBtnId);
    const btnCerrar = document.getElementById(closeId);
    const overlay = document.getElementById(id);

    const abrir = () => openModal(variant);
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
  }, [openBtnId, closeId, id, variant, openModal, closeModal]);

  return (
    <div class={`modal-overlay${visible ? ' modal-overlay--visible' : ''}`} id={id}>
      <div class={`modal-container modal-container--${variant}`}>
        <div class="modal-header">
          <div class="modal-header__info">
            <span class="modal-header__title">{titulo}</span>
            <span class="modal-header__tech">{idTecnico}</span>
          </div>
          <button class="modal-header__close" id={closeId}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div class="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
