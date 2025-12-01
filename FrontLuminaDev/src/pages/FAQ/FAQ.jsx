import React, { useState } from 'react';
import './FAQ.css';

const questions = [
  {
    question: "¿Cuánto tarda el envío?",
    answer: "Los pedidos llegan entre 3 y 5 días hábiles, dependiendo de tu ciudad."
  },
  {
    question: "¿Cómo puedo realizar una devolución?",
    answer: "Puedes solicitar una devolución dentro de los primeros 7 días tras recibir tu pedido."
  },
  {
    question: "¿Los pagos son seguros?",
    answer: "Sí, utilizamos plataformas certificadas que protegen tus datos y transacciones."
  },
  {
    question: "¿Los productos tienen garantía?",
    answer: "Todos los productos cuentan con garantía por defectos de fábrica."
  }
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <h2 className="faq-title">Preguntas Frecuentes</h2>

      <div className="faq-list">
        {questions.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggleQuestion(index)}
            >
              {item.question}
              <span className={`arrow ${activeIndex === index ? "open" : ""}`}>
                ▼
              </span>
            </button>

            {activeIndex === index && (
              <p className="faq-answer">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
