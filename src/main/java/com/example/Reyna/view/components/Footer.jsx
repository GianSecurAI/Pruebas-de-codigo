import React from 'react';
import '../styles/footer.css';
import logoReyna from '../assets/img/logo-reyna.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
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
            <a href="#">Política de privacidad</a><br />
            <a href="#">Términos y condiciones</a>
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
              <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-3 small footer-copyright">
          2025 | ALL RIGHTS RESERVED © LA REYNA
        </div>
      </div>
    </footer>
  );
};

export default Footer;