import { useState } from "react";
import "./App.css";
import Balance from "./components/Balance";
import FormularioMovimiento from "./components/FormularioMovimiento";
import ListaMovimientos from "./components/ListaMovimientos";

function App() {
  const [movimientos, setMovimientos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [movimientoEditando, setMovimientoEditando] = useState(null);
  const [orden, setOrden] = useState("carga");
  const [limite, setLimite] = useState("");

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

  const totalGastos = movimientos.reduce((acumulador, movimiento) => {
    return movimiento.tipo === "Gasto"
      ? acumulador + movimiento.monto
      : acumulador;
  }, 0);

  const superoLimite = limite !== "" && totalGastos > Number(limite);

  const movimientosFiltrados =
    filtroCategoria === "Todas"
      ? movimientos
      : movimientos.filter(
          (movimiento) => movimiento.categoria === filtroCategoria
        );

  const movimientosOrdenados = [...movimientosFiltrados].sort((a, b) => {
    if (orden === "mayor") {
      return b.monto - a.monto;
    }

    if (orden === "menor") {
      return a.monto - b.monto;
    }

    return a.id - b.id;
  });

  return (
    <div className="app">
      <div className="contenedor">
        <h1 className="titulo">Gestor de Gastos Personales</h1>

        <Balance
          total={balanceTotal}
          superoLimite={superoLimite}
        />

        <section className="limite-contenedor">
          <h2>Límite de gastos</h2>

          <input
            type="number"
            placeholder="Ej: 50000"
            value={limite}
            onChange={(e) => setLimite(e.target.value)}
          />

          <p className="limite-info">Gastos actuales: $ {totalGastos}</p>

          {superoLimite && (
            <p className="mensaje-alerta">
              Superaste el límite de gastos establecido.
            </p>
          )}
        </section>

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

        <section className="orden-contenedor">
          <h2>Ordenar movimientos</h2>

          <select
            className="orden-select"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="carga">Orden de carga</option>
            <option value="mayor">Mayor a menor monto</option>
            <option value="menor">Menor a mayor monto</option>
          </select>
        </section>

        <ListaMovimientos
          movimientos={movimientosOrdenados}
          onEliminar={eliminarMovimiento}
          onEditar={iniciarEdicion}
        />
      </div>
    </div>
  );
}

export default App;
