import React from 'react';
import { Link } from 'react-router-dom';
import './Support.css';

const Support = () => {
  return (
    <section className="support">
      <div className="support__header">
        <p className="support__eyebrow">Centro de ayuda</p>
        <h1 className="support__title">Soporte</h1>
        <p className="support__subtitle">
          Selecciona la opcion que necesitas para obtener ayuda.
        </p>
      </div>

      <div className="support__actions">
        <Link to="/faq" className="button-23 support__button">
          Preguntas frecuentes
        </Link>
        <Link to="/contact" className="button-23 support__button">
          Contacto
        </Link>
      </div>
    </section>
  );
};

export default Support;
