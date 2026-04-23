import { useState } from "react";

function FormularioMovimiento({ onAgregar }) {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState("Ingreso");
  const [error, setError] = useState("");

const manejarEnvio = (e) => {
  e.preventDefault();

  if (descripcion.trim() === "") {
    setError("La descripción no puede estar vacía.");
    return;
  }

  if (!/[a-zA-Z]/.test(descripcion)) {
    setError("La descripción debe contener texto (no solo números).");
    return;
  }

  if (monto === "" || isNaN(monto)) {
    setError("El monto debe ser un número válido.");
    return;
  }

  if (Number(monto) <= 0) {
    setError("El monto debe ser mayor a 0.");
    return;
  }

  const nuevoMovimiento = {
    id: Date.now(),
    descripcion: descripcion.trim(),
    monto: Number(monto),
    tipo: tipo,
  };

  onAgregar(nuevoMovimiento);

  setDescripcion("");
  setMonto("");
  setTipo("Ingreso");
  setError("");
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

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="Ingreso">Ingreso</option>
          <option value="Gasto">Gasto</option>
        </select>

        {error && <p className="error">{error}</p>}

        <button type="submit">Agregar movimiento</button>
      </form>
    </section>
  );
}

export default FormularioMovimiento;