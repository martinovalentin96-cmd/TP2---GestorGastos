function Balance({ total, superoLimite }) {
  return (
    <section className={`balance ${superoLimite ? "alerta" : ""}`}>
      <h2>Balance Total</h2>
      <p className="balance-numero">$ {total}</p>
    </section>
  );
}

export default Balance;