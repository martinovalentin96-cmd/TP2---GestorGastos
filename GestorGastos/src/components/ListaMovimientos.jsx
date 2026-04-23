import ItemMovimiento from "./ItemMovimiento";

function ListaMovimientos({ movimientos, onEliminar, onEditar }) {
  return (
    <section className="lista-contenedor">
      <h2>Movimientos Registrados</h2>

      <div className="lista">
        {movimientos.length === 0 ? (
          <p className="sin-movimientos">
            No hay movimientos registrados para esa categoría.
          </p>
        ) : (
          movimientos.map((movimiento) => (
            <ItemMovimiento
              key={movimiento.id}
              movimiento={movimiento}
              onEliminar={onEliminar}
              onEditar={onEditar}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default ListaMovimientos;