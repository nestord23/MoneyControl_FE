import { Route, Switch } from 'wouter';
import BarraLateral from './components/BarraLateral';
import BarraSuperior from './components/BarraSuperior';
import Dashboard from './pages/Dashboard';
import Ingresos from './pages/Ingresos';
import Gastos from './pages/Gastos';
import Prestamos from './pages/Prestamos';
import Categorias from './pages/Categorias';

export default function App() {
  return (
    <div class="aplicacion">
      <BarraLateral />
      <BarraSuperior />
      <main class="contenido-principal">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/ingresos" component={Ingresos} />
          <Route path="/gastos" component={Gastos} />
          <Route path="/prestamos" component={Prestamos} />
          <Route path="/categorias" component={Categorias} />
        </Switch>
      </main>
    </div>
  );
}
