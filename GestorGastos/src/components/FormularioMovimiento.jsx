import { useEffect, useState } from "react";

function FormularioMovimiento({
  onAgregar,
  movimientoEditando,
  onGuardarEdicion,
  onCancelarEdicion,
}) {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState("Ingreso");
  const [categoria, setCategoria] = useState("Comida");
  const [error, setError] = useState("");

  useEffect(() => {
    if (movimientoEditando) {
      setDescripcion(movimientoEditando.descripcion);
      setMonto(movimientoEditando.monto);
      setTipo(movimientoEditando.tipo);
      setCategoria(movimientoEditando.categoria);
      setError("");
    }
  }, [movimientoEditando]);

  const limpiarFormulario = () => {
    setDescripcion("");
    setMonto("");
    setTipo("Ingreso");
    setCategoria("Comida");
    setError("");
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (descripcion.trim() === "") {
      setError("La descripción no puede estar vacía.");
      return;
    }

    if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(descripcion)) {
      setError("La descripción debe contener texto.");
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

    if (movimientoEditando) {
      const movimientoActualizado = {
        id: movimientoEditando.id,
        descripcion: descripcion.trim(),
        monto: Number(monto),
        tipo,
        categoria,
        fecha: movimientoEditando.fecha, // mantiene la fecha original
      };

      onGuardarEdicion(movimientoActualizado);
    } else {
      const nuevoMovimiento = {
        id: Date.now(),
        descripcion: descripcion.trim(),
        monto: Number(monto),
        tipo,
        categoria,
        fecha: new Date().toLocaleString(), // NUEVO
      };

      onAgregar(nuevoMovimiento);
    }

    limpiarFormulario();
  };

  const manejarCancelar = () => {
    limpiarFormulario();
    onCancelarEdicion();
  };

  return (
    <section className="formulario-contenedor">
      <h2>{movimientoEditando ? "Editar Movimiento" : "Registrar Movimiento"}</h2>

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

        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="Comida">Comida</option>
          <option value="Transporte">Transporte</option>
          <option value="Ocio">Ocio</option>
          <option value="Salud">Salud</option>
          <option value="Otros">Otros</option>
        </select>

        {error && <p className="error">{error}</p>}

        <button type="submit">
          {movimientoEditando ? "Guardar cambios" : "Agregar movimiento"}
        </button>

        {movimientoEditando && (
          <button type="button" className="boton-cancelar" onClick={manejarCancelar}>
            Cancelar edición
          </button>
        )}
      </form>
    </section>
  );
}

export default FormularioMovimiento;