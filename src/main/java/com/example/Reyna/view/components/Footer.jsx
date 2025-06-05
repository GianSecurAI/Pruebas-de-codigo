import React from 'react';
import '../styles/footer.css';
import logoReyna from '../../../../../../../assets/img/logo-reyna.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const openPrivacyModal = (e) => {
    e.preventDefault();
    setShowPrivacyModal(true);
    document.body.style.overflow = 'hidden';
  };

  const openTermsModal = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowPrivacyModal(false);
    setShowTermsModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <footer className="footer mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="footer-logo mb-2 d-flex align-items-center gap-2">
              <img src={logoReyna} alt="La Reyna" />
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <h6>INFORMACIÓN</h6>
            <a href="#" onClick={openPrivacyModal}>Política de privacidad</a><br />
            <a href="#" onClick={openTermsModal}>Términos y condiciones</a>
          </div>
          <div className="col-md-3 mb-3">
            <h6>TIENDA</h6>
            <a href="/nosotros">Nosotros</a><br />
            <a href="/contacto">Contacto</a>
          </div>
          <div className="col-md-3 mb-3">
            <h6>CONTÁCTANOS</h6>
            <div className="footer-contact">demo@lareyna.com</div>
            <div className="footer-contact">(+34) 947 002 963</div>
            <div className="mt-2 footer-social-icons">
              <a href="https://instagram.com/lareyna" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="https://facebook.com/LaReynaOficial" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-3 small footer-copyright">
          2025 | ALL RIGHTS RESERVED © LA REYNA
        </div>
      </div>
      {/* Modal de Política de Privacidad */}
      {showPrivacyModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content policy-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Política de Privacidad</h2>
              <button className="close-button" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <h4>Última actualización: Junio 2025</h4>
              
              <p>En LA REYNA, valoramos y respetamos tu privacidad. Esta Política de Privacidad describe cómo recopilamos, utilizamos y compartimos tu información cuando visitas nuestra tienda online.</p>
              
              <h5>1. Información que recopilamos</h5>
              <p>Recopilamos información que tú nos proporcionas directamente cuando:</p>
              <ul>
                <li>Te registras en nuestra tienda online</li>
                <li>Realizas una compra</li>
                <li>Te suscribes a nuestro boletín</li>
                <li>Participas en promociones o encuestas</li>
                <li>Te comunicas con nuestro servicio de atención al cliente</li>
              </ul>
              
              <h5>2. Cómo utilizamos tu información</h5>
              <p>Utilizamos la información recopilada para:</p>
              <ul>
                <li>Procesar tus pedidos y pagos</li>
                <li>Enviarte comunicaciones sobre tu cuenta o pedidos</li>
                <li>Proporcionarte información sobre productos que podrían interesarte</li>
                <li>Mejorar nuestra tienda online y experiencia de usuario</li>
                <li>Prevenir actividades fraudulentas</li>
              </ul>
              
              <h5>3. Compartir tu información</h5>
              <p>No vendemos tu información personal a terceros. Podemos compartir tu información con:</p>
              <ul>
                <li>Proveedores de servicios que nos ayudan a operar nuestra tienda</li>
                <li>Autoridades cuando sea requerido por ley</li>
              </ul>
              
              <h5>4. Seguridad de los datos</h5>
              <p>Implementamos medidas de seguridad diseñadas para proteger tu información personal. Sin embargo, ningún sistema es completamente seguro, y no podemos garantizar la seguridad absoluta de tu información.</p>
              
              <h5>5. Tus derechos</h5>
              <p>Dependiendo de tu ubicación, puedes tener ciertos derechos relacionados con tu información personal, incluyendo:</p>
              <ul>
                <li>Acceder a tu información personal</li>
                <li>Corregir datos inexactos</li>
                <li>Eliminar tu información</li>
                <li>Oponerte al procesamiento de tus datos</li>
              </ul>
              
              <h5>6. Cambios a esta política</h5>
              <p>Podemos actualizar esta política de privacidad periódicamente. Te notificaremos sobre cambios significativos publicando la nueva política en nuestra tienda online.</p>
              
              <h5>7. Contacto</h5>
              <p>Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en: <a href="mailto:privacidad@lareyna.com">privacidad@lareyna.com</a></p>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de Términos y Condiciones */}
      {showTermsModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content terms-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Términos y Condiciones</h2>
              <button className="close-button" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <h4>Última actualización: Junio 2025</h4>
              
              <p>Bienvenido a LA REYNA. Al acceder y utilizar nuestra tienda online, aceptas cumplir con estos términos y condiciones. Te recomendamos leerlos cuidadosamente antes de realizar cualquier compra.</p>
              
              <h5>1. Uso de nuestra tienda online</h5>
              <p>Al utilizar nuestra tienda online, garantizas que tienes al menos 18 años de edad y que la información que proporcionas es precisa y completa. Nos reservamos el derecho de rechazar el servicio a cualquier persona, por cualquier motivo, en cualquier momento.</p>
              
              <h5>2. Productos y precios</h5>
              <p>Nos esforzamos por mostrar imágenes precisas de nuestros productos, pero no podemos garantizar que los colores mostrados en tu dispositivo sean exactos. Todos los precios están en Soles Peruanos (S/) e incluyen impuestos cuando sea aplicable. Nos reservamos el derecho de modificar los precios en cualquier momento.</p>
              
              <h5>3. Pedidos y pagos</h5>
              <p>Al realizar un pedido, nos estás haciendo una oferta para comprar productos. Nos reservamos el derecho de aceptar o rechazar cualquier pedido. El pago se realiza al momento de hacer el pedido. Aceptamos diversas formas de pago, incluyendo tarjetas de crédito y débito.</p>
              
              <h5>4. Envíos y entregas</h5>
              <p>Los tiempos de entrega son estimados y pueden variar dependiendo de tu ubicación. No somos responsables de retrasos causados por eventos fuera de nuestro control. El riesgo de pérdida y título de los productos pasa a ti en el momento de la entrega.</p>
              
              <h5>5. Devoluciones y reembolsos</h5>
              <p>Puedes devolver productos sin usar dentro de los 14 días posteriores a la recepción. Los productos deben estar en su embalaje original y en condiciones de reventa. Ciertos productos, como artículos de cuidado personal que han sido abiertos, no son elegibles para devolución por razones de higiene.</p>
              
              <h5>6. Propiedad intelectual</h5>
              <p>Todo el contenido de nuestra tienda online, incluyendo textos, gráficos, logotipos, imágenes y software, está protegido por derechos de autor y es propiedad de LA REYNA o de nuestros proveedores de contenido.</p>
              
              <h5>7. Limitación de responsabilidad</h5>
              <p>En ningún caso LA REYNA, sus directores, empleados o agentes serán responsables por daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar nuestros productos o servicios.</p>
              
              <h5>8. Ley aplicable</h5>
              <p>Estos términos y condiciones se rigen por las leyes de Perú. Cualquier disputa relacionada con estos términos será resuelta en los tribunales de Lima, Perú.</p>
              
              <h5>9. Cambios a estos términos</h5>
              <p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en nuestra tienda online.</p>
              
              <h5>10. Contacto</h5>
              <p>Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos en: <a href="mailto:terminos@lareyna.com">terminos@lareyna.com</a></p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
