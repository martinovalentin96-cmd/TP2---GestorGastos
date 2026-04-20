function Balance({ total }) {
  return (
    <section className="balance">
      <h2>Balance Total</h2>
      <p className="balance-numero">$ {total}</p>
    </section>
  );
}

export default Balance;