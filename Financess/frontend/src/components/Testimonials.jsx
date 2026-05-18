export default function Testimonials() {
  const reviews = [
    { name: "Carlos M.", role: "Desenvolvedor", text: "Interface intuitiva e recursos muito úteis. Recomendo!" },
    { name: "Joana S.", role: "Empreendedora", text: "O Financess mudou a forma como eu lido com meu dinheiro." },
    { name: "Beatriz L.", role: "Estudante", text: "Finalmente consegui criar um orçamento que funciona." }
  ];

  return (
    <section className="testimonials" id="depoimentos">
        <h2>O que nosso usuários dizem</h2>
        <div className="testimonials-grid">
            {reviews.map((r, i) => (
                <blockquote key={i} className="testimonial-card">
                    <p>"{r.text}"</p>
                    <cite>- {r.name}, {r.role}</cite>
                </blockquote>
            ))}
        </div>
    </section>
  );
}

