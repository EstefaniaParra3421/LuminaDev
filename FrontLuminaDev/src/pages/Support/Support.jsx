import React from 'react';
import { Link } from 'react-router-dom';
import './Support.css';

const Support = () => {
  return (
    <div className="support">
      <h1 className="support__title">Centro de Soporte</h1>
      
      <div className="support__content">
        <section className="support__section">
          <h2 className="support__section-title">¿Necesitas Ayuda?</h2>
          <p className="support__text">
            Estamos aquí para ayudarte. Si tienes alguna pregunta, problema o necesitas asistencia 
            con nuestros productos o servicios, nuestro equipo de soporte está disponible para atenderte.
          </p>
        </section>

        <section className="support__section">
          <h2 className="support__section-title">Cómo Contactarnos</h2>
          <p className="support__text">
            Puedes ponerte en contacto con nosotros a través de los siguientes medios que encontrarás 
            en nuestra sección de <Link to="/contact" className="support__link">Contacto</Link>:
          </p>
          
          <div className="support__contact-info">
            <div className="support__contact-item">
              <span className="support__icon">📧</span>
              <div className="support__contact-details">
                <h3 className="support__contact-title">Correo Electrónico</h3>
                <p className="support__contact-text">
                  Escríbenos a: <strong>contacto.ilumitech@gmail.com</strong>
                </p>
                <p className="support__contact-note">
                  Responderemos a tu consulta en un plazo máximo de 24 horas hábiles.
                </p>
              </div>
            </div>

            <div className="support__contact-item">
              <span className="support__icon">📱</span>
              <div className="support__contact-details">
                <h3 className="support__contact-title">WhatsApp</h3>
                <p className="support__contact-text">
                  Contáctanos por WhatsApp: <strong>+57 324 278 5517</strong>
                </p>
                <p className="support__contact-note">
                  Disponible de lunes a viernes de 9:00 AM a 6:00 PM.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="support__section">
          <h2 className="support__section-title">Información de Contacto Completa</h2>
          <p className="support__text">
            Para ver toda nuestra información de contacto, incluyendo dirección física y otros medios 
            de comunicación, visita nuestra página de <Link to="/contact" className="support__link">Contacto</Link>.
          </p>
        </section>

        <section className="support__section">
          <h2 className="support__section-title">Otros Recursos</h2>
          <p className="support__text">
            También puedes encontrar respuestas a preguntas comunes en nuestras otras secciones:
          </p>
          <ul className="support__resources">
            <li className="support__resource-item">
              <Link to="/faq" className="support__link">Preguntas Frecuentes (FAQ)</Link>
            </li>
            <li className="support__resource-item">
              <Link to="/shipping" className="support__link">Información de Envíos</Link>
            </li>
            <li className="support__resource-item">
              <Link to="/returns" className="support__link">Política de Devoluciones</Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Support;

