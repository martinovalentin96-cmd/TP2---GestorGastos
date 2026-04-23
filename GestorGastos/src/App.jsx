import { useState } from "react";
import "./App.css";
import Balance from "./components/Balance";
import FormularioMovimiento from "./components/FormularioMovimiento";
import ListaMovimientos from "./components/ListaMovimientos";

function App() {
  const [movimientos, setMovimientos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [movimientoEditando, setMovimientoEditando] = useState(null);

  const agregarMovimiento = (nuevoMovimiento) => {
    setMovimientos([...movimientos, nuevoMovimiento]);
  };

  const eliminarMovimiento = (id) => {
    setMovimientos(movimientos.filter((movimiento) => movimiento.id !== id));
  };

  const iniciarEdicion = (movimiento) => {
    setMovimientoEditando(movimiento);
  };

  const guardarEdicion = (movimientoActualizado) => {
    setMovimientos(
      movimientos.map((movimiento) =>
        movimiento.id === movimientoActualizado.id
          ? movimientoActualizado
          : movimiento
      )
    );

    setMovimientoEditando(null);
  };

  const cancelarEdicion = () => {
    setMovimientoEditando(null);
  };

  const balanceTotal = movimientos.reduce((acumulador, movimiento) => {
    return movimiento.tipo === "Ingreso"
      ? acumulador + movimiento.monto
      : acumulador - movimiento.monto;
  }, 0);

  const movimientosFiltrados =
    filtroCategoria === "Todas"
      ? movimientos
      : movimientos.filter(
          (movimiento) => movimiento.categoria === filtroCategoria
        );

  return (
    <div className="app">
      <div className="contenedor">
        <h1 className="titulo">Gestor de Gastos Personales</h1>

        <Balance total={balanceTotal} />

        <FormularioMovimiento
          onAgregar={agregarMovimiento}
          movimientoEditando={movimientoEditando}
          onGuardarEdicion={guardarEdicion}
          onCancelarEdicion={cancelarEdicion}
        />

        <section className="filtro-contenedor">
          <h2>Filtrar por categoría</h2>

          <select
            className="filtro-select"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="Todas">Todas</option>
            <option value="Comida">Comida</option>
            <option value="Transporte">Transporte</option>
            <option value="Ocio">Ocio</option>
            <option value="Salud">Salud</option>
            <option value="Otros">Otros</option>
          </select>
        </section>

        <ListaMovimientos
          movimientos={movimientosFiltrados}
          onEliminar={eliminarMovimiento}
          onEditar={iniciarEdicion}
        />
      </div>
    </div>
  );
}

export default App;
