import TarjetaCategoria from './TarjetaCategoria';

interface Categoria {
  id: string;
  name: string;
  iconKey: string;
  variant: string;
  transactionCount: number;
  totalBudget: number;
}

const categorias: Categoria[] = [
  { id: '1', name: 'Servicios', iconKey: 'zap', variant: '00d2ff', transactionCount: 24, totalBudget: 3200 },
  { id: '2', name: 'Nómina', iconKey: 'users', variant: '00ff88', transactionCount: 12, totalBudget: 8400 },
  { id: '3', name: 'Proveedores', iconKey: 'truck', variant: 'ff4466', transactionCount: 18, totalBudget: 5600 },
  { id: '4', name: 'Operativos', iconKey: 'tool', variant: 'ffb800', transactionCount: 31, totalBudget: 2800 },
  { id: '5', name: 'Inversiones', iconKey: 'trending-up', variant: 'bd93f9', transactionCount: 8, totalBudget: 12000 },
  { id: '6', name: 'Marketing', iconKey: 'megaphone', variant: 'ff44aa', transactionCount: 15, totalBudget: 2100 },
  { id: '7', name: 'Ventas Directas', iconKey: 'dollar-sign', variant: '44ff88', transactionCount: 42, totalBudget: 15000 },
  { id: '8', name: 'Compras', iconKey: 'shopping', variant: 'ff8844', transactionCount: 27, totalBudget: 4500 },
];

export default function CuadriculaCategorias() {
  return (
    <div class="cuadricula-categorias">
      {categorias.map((c) => (
        <TarjetaCategoria key={c.id} {...c} />
      ))}
    </div>
  );
}
