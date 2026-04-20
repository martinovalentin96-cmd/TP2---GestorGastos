function ItemMovimiento({ movimiento }) {
  return (
    <article className={`item ${movimiento.tipo === "Ingreso" ? "ingreso" : "gasto"}`}>
      <div>
        <p className="item-descripcion">{movimiento.descripcion}</p>
        <p className="item-tipo">{movimiento.tipo}</p>
      </div>

      <p className="item-monto">
        {movimiento.tipo === "Ingreso" ? "+ " : "- "}$ {movimiento.monto}
      </p>
    </article>
  );
}

export default ItemMovimiento;