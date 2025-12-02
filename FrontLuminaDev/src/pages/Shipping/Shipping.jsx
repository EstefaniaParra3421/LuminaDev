import React from 'react';
import './Shipping.css';

const Shipping = () => {
  return (
    <div className="shipping">
      <h1 className="shipping__title">Información de Envíos</h1>
      
      <div className="shipping__content">
        <section className="shipping__section">
          <h2 className="shipping__section-title">Nuestra Transportadora</h2>
          <p className="shipping__text">
            Trabajamos con <strong className="shipping__highlight">Interrapidísimo</strong>, una de las 
            empresas de mensajería más confiables y rápidas de Colombia. Ellos se encargan de entregar 
            tus pedidos de manera segura y eficiente en todo el territorio nacional.
          </p>
        </section>

        <section className="shipping__section">
          <h2 className="shipping__section-title">Tiempos de Entrega</h2>
          <div className="shipping__delivery-info">
            <div className="shipping__delivery-item">
              <span className="shipping__icon">🚚</span>
              <div className="shipping__delivery-details">
                <h3 className="shipping__delivery-title">Ciudades Principales</h3>
                <p className="shipping__delivery-text">
                  <strong>3-5 días hábiles</strong> para Bogotá, Medellín, Cali, Barranquilla y ciudades principales.
                </p>
              </div>
            </div>

            <div className="shipping__delivery-item">
              <span className="shipping__icon">📦</span>
              <div className="shipping__delivery-details">
                <h3 className="shipping__delivery-title">Otras Ciudades</h3>
                <p className="shipping__delivery-text">
                  <strong>5-7 días hábiles</strong> para el resto del país.
                </p>
              </div>
            </div>

            <div className="shipping__delivery-item">
              <span className="shipping__icon">🏘️</span>
              <div className="shipping__delivery-details">
                <h3 className="shipping__delivery-title">Zonas Rurales</h3>
                <p className="shipping__delivery-text">
                  <strong>7-10 días hábiles</strong> para zonas rurales y municipios pequeños.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="shipping__section">
          <h2 className="shipping__section-title">Seguimiento de Pedidos</h2>
          <p className="shipping__text">
            Una vez que tu pedido sea despachado, recibirás un correo electrónico con el número de 
            guía de <strong>Interrapidísimo</strong>. Podrás rastrear tu envío en tiempo real a través 
            de la página web de Interrapidísimo usando tu número de guía.
          </p>
        </section>

        <section className="shipping__section">
          <h2 className="shipping__section-title">Costos de Envío</h2>
          <div className="shipping__costs">
            <div className="shipping__cost-item">
              <h3 className="shipping__cost-title">Envío Estándar</h3>
              <p className="shipping__cost-text">
                El costo de envío se calcula según el peso, dimensiones y destino de tu pedido. 
                El precio exacto se mostrará antes de finalizar tu compra.
              </p>
            </div>
            <div className="shipping__cost-item">
              <h3 className="shipping__cost-title">Envío Gratis</h3>
              <p className="shipping__cost-text">
                ¡Ofertas especiales! Mantente atento a nuestras promociones donde ofrecemos envío 
                gratis en compras superiores a cierto monto.
              </p>
            </div>
          </div>
        </section>

        <section className="shipping__section">
          <h2 className="shipping__section-title">Proceso de Envío</h2>
          <ol className="shipping__process">
            <li className="shipping__process-item">
              <strong>Confirmación:</strong> Recibirás un correo de confirmación una vez que tu pedido 
              sea procesado.
            </li>
            <li className="shipping__process-item">
              <strong>Preparación:</strong> Tu pedido será preparado y empaquetado con cuidado.
            </li>
            <li className="shipping__process-item">
              <strong>Despacho:</strong> Tu pedido será entregado a <strong>Interrapidísimo</strong> para su distribución.
            </li>
            <li className="shipping__process-item">
              <strong>En Tránsito:</strong> Recibirás el número de guía para hacer seguimiento.
            </li>
            <li className="shipping__process-item">
              <strong>Entrega:</strong> Interrapidísimo entregará tu pedido en la dirección indicada.
            </li>
          </ol>
        </section>

        <section className="shipping__section">
          <h2 className="shipping__section-title">Requisitos para la Entrega</h2>
          <ul className="shipping__requirements">
            <li className="shipping__requirement-item">
              Asegúrate de proporcionar una dirección completa y correcta.
            </li>
            <li className="shipping__requirement-item">
              Incluye un número de teléfono de contacto donde puedas ser localizado.
            </li>
            <li className="shipping__requirement-item">
              Si no estás en el momento de la entrega, Interrapidísimo intentará contactarte 
              para coordinar una nueva fecha.
            </li>
            <li className="shipping__requirement-item">
              Presenta tu documento de identidad al momento de recibir el pedido.
            </li>
          </ul>
        </section>

        <section className="shipping__section shipping__section--highlight">
          <h2 className="shipping__section-title">¿Necesitas Ayuda con tu Envío?</h2>
          <p className="shipping__text">
            Si tienes alguna pregunta sobre tu envío o necesitas asistencia, no dudes en contactarnos. 
            También puedes comunicarte directamente con <strong>Interrapidísimo</strong> usando el número 
            de guía de tu pedido.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Shipping;

