import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <h1 className="about__title">Acerca de Ilumitech</h1>
      
      <div className="about__content">
        <section className="about__section">
          <h2 className="about__section-title">Quiénes Somos</h2>
          <p className="about__text">
            Ilumitech es tu plataforma confiable para la gestión de productos y comercio electrónico. 
            Nos especializamos en ofrecer soluciones tecnológicas innovadoras que facilitan la compra 
            y venta de productos de calidad, con un enfoque en la experiencia del usuario y la 
            satisfacción del cliente.
          </p>
          <p className="about__text">
            Ubicados en Cali, Colombia, trabajamos constantemente para brindar un servicio excepcional 
            y productos que cumplan con los más altos estándares de calidad. Nuestro equipo está 
            comprometido con la excelencia y la innovación en cada aspecto de nuestro negocio.
          </p>
        </section>

        <section className="about__section">
          <h2 className="about__section-title">Nuestra Misión</h2>
          <p className="about__text">
            Facilitar el acceso a productos de calidad mediante una plataforma digital intuitiva, 
            segura y eficiente. Buscamos conectar a nuestros clientes con los mejores productos, 
            ofreciendo una experiencia de compra excepcional que supere sus expectativas.
          </p>
        </section>

        <section className="about__section">
          <h2 className="about__section-title">Nuestra Visión</h2>
          <p className="about__text">
            Ser la plataforma líder en comercio electrónico en Colombia, reconocida por nuestra 
            innovación, calidad de servicio y compromiso con la satisfacción del cliente. Aspiramos 
            a expandir nuestro alcance y continuar mejorando la experiencia de compra online.
          </p>
        </section>

        <section className="about__section">
          <h2 className="about__section-title">Nuestros Valores</h2>
          <div className="about__values">
            <div className="about__value-item">
              <span className="about__value-icon">✨</span>
              <div className="about__value-content">
                <h3 className="about__value-title">Calidad</h3>
                <p className="about__value-text">
                  Nos comprometemos a ofrecer solo productos de la más alta calidad, verificados 
                  y seleccionados cuidadosamente.
                </p>
              </div>
            </div>

            <div className="about__value-item">
              <span className="about__value-icon">🤝</span>
              <div className="about__value-content">
                <h3 className="about__value-title">Confianza</h3>
                <p className="about__value-text">
                  Construimos relaciones duraderas con nuestros clientes basadas en la transparencia 
                  y la honestidad en cada transacción.
                </p>
              </div>
            </div>

            <div className="about__value-item">
              <span className="about__value-icon">🚀</span>
              <div className="about__value-content">
                <h3 className="about__value-title">Innovación</h3>
                <p className="about__value-text">
                  Utilizamos tecnología de vanguardia para mejorar constantemente nuestra plataforma 
                  y la experiencia del usuario.
                </p>
              </div>
            </div>

            <div className="about__value-item">
              <span className="about__value-icon">❤️</span>
              <div className="about__value-content">
                <h3 className="about__value-title">Compromiso</h3>
                <p className="about__value-text">
                  Estamos dedicados a brindar el mejor servicio al cliente y a resolver cualquier 
                  necesidad o inquietud que puedas tener.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about__section">
          <h2 className="about__section-title">¿Por Qué Elegirnos?</h2>
          <ul className="about__features">
            <li className="about__feature-item">
              <strong>Productos Verificados:</strong> Todos nuestros productos pasan por un proceso 
              de verificación de calidad antes de ser ofrecidos.
            </li>
            <li className="about__feature-item">
              <strong>Envío Confiable:</strong> Trabajamos con Interrapidísimo para garantizar entregas 
              rápidas y seguras en todo el país.
            </li>
            <li className="about__feature-item">
              <strong>Atención Personalizada:</strong> Nuestro equipo está disponible para ayudarte 
              en cada paso del proceso de compra.
            </li>
            <li className="about__feature-item">
              <strong>Plataforma Segura:</strong> Utilizamos las mejores prácticas de seguridad para 
              proteger tu información y transacciones.
            </li>
            <li className="about__feature-item">
              <strong>Precios Competitivos:</strong> Ofrecemos los mejores precios del mercado sin 
              comprometer la calidad.
            </li>
            <li className="about__feature-item">
              <strong>Proceso de Devolución:</strong> Política clara y transparente para devoluciones 
              cuando sea necesario.
            </li>
          </ul>
        </section>

        <section className="about__section about__section--highlight">
          <h2 className="about__section-title">Contáctanos</h2>
          <p className="about__text">
            Estamos aquí para ayudarte. Si tienes alguna pregunta, sugerencia o necesitas asistencia, 
            no dudes en contactarnos. Puedes visitar nuestra página de <Link to="/contact" className="about__link">Contacto</Link> 
            o nuestra sección de <Link to="/support" className="about__link">Soporte</Link> para más información.
          </p>
          <div className="about__contact-info">
            <div className="about__contact-item">
              <span className="about__contact-icon">📍</span>
              <span className="about__contact-text">Cali, Colombia</span>
            </div>
            <div className="about__contact-item">
              <span className="about__contact-icon">📧</span>
              <span className="about__contact-text">contacto.ilumitech@gmail.com</span>
            </div>
            <div className="about__contact-item">
              <span className="about__contact-icon">📱</span>
              <span className="about__contact-text">+57 324 278 5517</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
