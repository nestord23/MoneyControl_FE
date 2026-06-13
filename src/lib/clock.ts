export function initClock(elementId: string): () => void {
  const el = document.getElementById(elementId);
  if (!el) return () => {};

  function tick() {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');
    el.textContent = `${horas}:${minutos}:${segundos}`;
  }

  tick();
  const interval = setInterval(tick, 1000);
  return () => clearInterval(interval);
}
