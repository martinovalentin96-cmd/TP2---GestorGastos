import { useState } from "react";

function FormularioMovimiento({ onAgregar }) {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState("Ingreso");

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (descripcion.trim() === "" || monto === "" || Number(monto) <= 0) {
      alert("Completá todos los campos correctamente.");
      return;
    }

    const nuevoMovimiento = {
      id: Date.now(),
      descripcion: descripcion,
      monto: Number(monto),
      tipo: tipo
    };

    onAgregar(nuevoMovimiento);

    setDescripcion("");
    setMonto("");
    setTipo("Ingreso");
  };

  return (
    <section className="formulario-contenedor">
      <h2>Registrar Movimiento</h2>

      <form className="formulario" onSubmit={manejarEnvio}>
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />

        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="Ingreso">Ingreso</option>
          <option value="Gasto">Gasto</option>
        </select>

        <button type="submit">Agregar movimiento</button>
      </form>
    </section>
  );
}

export default FormularioMovimiento;