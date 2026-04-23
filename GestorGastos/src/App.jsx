import { useState } from "react";
import "./App.css";
import Balance from "./components/Balance";
import FormularioMovimiento from "./components/FormularioMovimiento";
import ListaMovimientos from "./components/ListaMovimientos";

function App() {
  const [movimientos, setMovimientos] = useState([]);

  const agregarMovimiento = (nuevoMovimiento) => {
    setMovimientos([...movimientos, nuevoMovimiento]);
  };

  const balanceTotal = movimientos.reduce((acumulador, movimiento) => {
    if (movimiento.tipo === "Ingreso") {
      return acumulador + movimiento.monto;
    } else {
      return acumulador - movimiento.monto;
    }
  }, 0);

  return (
    <div className="app">
      <div className="contenedor">
        <h1 className="titulo">Gestor de Gastos Personales</h1>

        <Balance total={balanceTotal} />

        <FormularioMovimiento onAgregar={agregarMovimiento} />

        <ListaMovimientos movimientos={movimientos} />
      </div>
    </div>
  );
}

export default App;
