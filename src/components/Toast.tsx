import { useEffect } from 'preact/hooks';
import { useUIStore } from '../store/ui';

export default function Toast() {
  const message = useUIStore(s => s.toastMessage);
  const type = useUIStore(s => s.toastType);
  const hideToast = useUIStore(s => s.hideToast);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(hideToast, 3500);
    return () => clearTimeout(timer);
  }, [message, hideToast]);

  if (!message) return null;

  return (
    <div class={`toast toast--${type}`}>
      <span class="toast__icono">{type === 'success' ? '✓' : '✗'}</span>
      <span class="toast__mensaje">{message}</span>
      <button class="toast__cerrar" onClick={hideToast}>×</button>
    </div>
  );
}
