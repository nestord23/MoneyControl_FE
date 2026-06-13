import { useState } from 'preact/hooks';

export default function CalculadoraPagos() {
  const [pago, setPago] = useState(500);
  const [plazo, setPlazo] = useState(7);

  return (
    <div class="calculadora-pagos">
      <span class="calculadora-pagos__titulo">Repayment Calculator</span>

      <div class="calculadora-pagos__grupo">
        <div class="calculadora-pagos__etiqueta">
          <span>Pago adicional mensual</span>
          <span class="calculadora-pagos__valor">${pago}</span>
        </div>
        <input
          type="range"
          class="calculadora-pagos__slider"
          min="0" max="2000" step="50"
          value={pago}
          onInput={(e) => setPago(Number((e.target as HTMLInputElement).value))}
        />
      </div>

      <div class="calculadora-pagos__grupo">
        <div class="calculadora-pagos__etiqueta">
          <span>Plazo estimado (años)</span>
          <span class="calculadora-pagos__valor">{plazo}</span>
        </div>
        <input
          type="range"
          class="calculadora-pagos__slider"
          min="1" max="15" step="1"
          value={plazo}
          onInput={(e) => setPlazo(Number((e.target as HTMLInputElement).value))}
        />
      </div>

      <div class="calculadora-pagos__resultado">
        <div class="calculadora-pagos__resultado-item">
          <span>Ahorro en intereses</span>
          <span class="calculadora-pagos__resultado-valor">$18,420.00</span>
        </div>
        <div class="calculadora-pagos__resultado-item">
          <span>Nuevo total a pagar</span>
          <span class="calculadora-pagos__resultado-valor">$228,930.00</span>
        </div>
      </div>
    </div>
  );
}
