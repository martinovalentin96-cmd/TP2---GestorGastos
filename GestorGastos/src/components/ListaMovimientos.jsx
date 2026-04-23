import ItemMovimiento from "./ItemMovimiento";

function ListaMovimientos({ movimientos }) {
  return (
    <section className="lista-contenedor">
      <h2>Movimientos Registrados</h2>

      <div className="lista">
        {movimientos.length === 0 ? (
          <p className="sin-movimientos">No hay movimientos registrados.</p>
        ) : (
          movimientos.map((movimiento) => (
            <ItemMovimiento key={movimiento.id} movimiento={movimiento} />
          ))
        )}
      </div>
    </section>
  );
}

export default ListaMovimientos;