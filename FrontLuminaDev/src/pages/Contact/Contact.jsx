import React from 'react';
import './Contact.css';

const Contact = () => {
  const whatsappNumber = '3242785517'; // +57 324 278 5517 sin espacios ni +
  const defaultMessage = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre sus productos.');

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="contact">
      <h1 className="contact__title">Contacto</h1>
      
      <div className="contact__content">
        <section className="contact__section">
          <h2 className="contact__section-title">Ponte en Contacto con Nosotros</h2>
          <p className="contact__text">
            Estamos aquí para ayudarte. Si tienes alguna pregunta, consulta o necesitas asistencia, 
            no dudes en contactarnos a través de cualquiera de nuestros medios de comunicación.
          </p>
        </section>

        <section className="contact__section">
          <h2 className="contact__section-title">Información de Contacto</h2>
          
          <div className="contact__info">
            <div className="contact__info-item">
              <span className="contact__icon">📧</span>
              <div className="contact__info-details">
                <h3 className="contact__info-title">Correo Electrónico</h3>
                <a 
                  href="mailto:contacto.ilumitech@gmail.com" 
                  className="contact__info-link"
                >
                  contacto.ilumitech@gmail.com
                </a>
                <p className="contact__info-note">
                  Responderemos a tu consulta en un plazo máximo de 24 horas hábiles.
                </p>
              </div>
            </div>

            <div className="contact__info-item contact__info-item--whatsapp">
              <span className="contact__icon contact__icon--whatsapp">💬</span>
              <div className="contact__info-details">
                <h3 className="contact__info-title">WhatsApp</h3>
                <button
                  onClick={handleWhatsAppClick}
                  className="contact__whatsapp-button"
                >
                  <span className="contact__whatsapp-icon">📱</span>
                  <span>+57 324 278 5517</span>
                </button>
                <p className="contact__info-note">
                  Disponible de lunes a viernes de 9:00 AM a 6:00 PM. Haz clic para chatear con nosotros.
                </p>
              </div>
            </div>

            <div className="contact__info-item">
              <span className="contact__icon">📍</span>
              <div className="contact__info-details">
                <h3 className="contact__info-title">Ubicación</h3>
                <p className="contact__info-text">
                  Cali, Colombia
                </p>
                <p className="contact__info-note">
                  Estamos ubicados en la ciudad de Cali, Colombia.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact__section contact__section--highlight">
          <h2 className="contact__section-title">Horarios de Atención</h2>
          <div className="contact__hours">
            <div className="contact__hours-item">
              <strong>Lunes a Viernes:</strong> 9:00 AM - 6:00 PM
            </div>
            <div className="contact__hours-item">
              <strong>Sábados:</strong> 9:00 AM - 2:00 PM
            </div>
            <div className="contact__hours-item">
              <strong>Domingos:</strong> Cerrado
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
