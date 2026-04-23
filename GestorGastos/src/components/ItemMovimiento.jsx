function ItemMovimiento({ movimiento, onEliminar, onEditar }) {
  return (
    <article
      className={`item ${movimiento.tipo === "Ingreso" ? "ingreso" : "gasto"}`}
    >
      <div>
        <p className="item-descripcion">{movimiento.descripcion}</p>
        <p className="item-tipo">{movimiento.tipo}</p>
        <p className="item-categoria">Categoría: {movimiento.categoria}</p>
        <p className="item-fecha">Fecha: {movimiento.fecha}</p>
      </div>

      <div className="item-derecha">
        <p className="item-monto">
          {movimiento.tipo === "Ingreso" ? "+ " : "- "}$ {movimiento.monto}
        </p>

        <div className="acciones-item">
          <button
            className="boton-editar"
            onClick={() => onEditar(movimiento)}
          >
            Editar
          </button>

          <button
            className="boton-eliminar"
            onClick={() => onEliminar(movimiento.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

export default ItemMovimiento;