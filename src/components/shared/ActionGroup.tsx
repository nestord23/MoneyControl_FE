import { useState, useRef } from 'preact/hooks';

interface Props {
  variant: string;
  ctaText: string;
  cancelText?: string;
  ctaIcono?: string;
}

export default function ActionGroup({ variant, ctaText, cancelText = "ABORT", ctaIcono }: Props) {
  const [processing, setProcessing] = useState(false);
  const origText = useRef(ctaText);

  const handleCta = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      const overlay = document.getElementById('modal-ingreso')
        || document.getElementById('modal-gasto')
        || document.getElementById('modal-deuda');
      if (overlay) overlay.classList.remove('modal-overlay--visible');
    }, 1200);
  };

  return (
    <div class={`action-group action-group--${variant}`}>
      <button class="action-group__secondary">{cancelText}</button>
      <button
        class={`action-group__primary${processing ? ' action-group__primary--processing' : ''}`}
        onClick={handleCta}
        disabled={processing}
      >
        {ctaIcono === 'zap' && (
          <svg class="action-group__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        )}
        {ctaIcono === 'arrow-down' && (
          <svg class="action-group__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        )}
        {ctaIcono === 'lock' && (
          <svg class="action-group__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        )}
        {processing ? 'PROCESSING...' : ctaText}
      </button>
    </div>
  );
}
