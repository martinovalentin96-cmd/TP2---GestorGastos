import { useState } from "react";
import "./App.css";
import Balance from "./components/Balance";
import FormularioMovimiento from "./components/FormularioMovimiento";
import ListaMovimientos from "./components/ListaMovimientos";

function App() {
  const [movimientos, setMovimientos] = useState([
    { id: 1, descripcion: "Sueldo", monto: 250000, tipo: "Ingreso" },
    { id: 2, descripcion: "Alquiler", monto: 80000, tipo: "Gasto" },
    { id: 3, descripcion: "Internet", monto: 12000, tipo: "Gasto" }
  ]);

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
