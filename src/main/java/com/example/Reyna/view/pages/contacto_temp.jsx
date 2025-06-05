import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Contacto.css'; 

const ContactoPage = () => {
  return (
    <div className="page-container-for-fixed-nav">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container py-5">
          <div className="d-flex align-items-center" style={{ marginLeft: '15%' }}>
            <h2 className="mb-0 me-5">CONTÁCTANOS</h2>
            <hr />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5" style={{ background: '#f8f6f8' }}>
        <div className="container text-center">
          <div className="mb-4 mt-5">
            <h5 className="fw-normal" style={{ letterSpacing: '1px' }}>
              ¿TIENES DUDAS, SUGERENCIAS O TE GUSTARÍA HACER UN PEDIDO ESPECIAL?
            </h5>
            <p className="mb-3">
              En LA REYNA, estamos felices de ayudarte a encontrar lo mejor en maquillaje, perfumes, cremas y joyas.
              <br />
              ¡Tu belleza y confianza son nuestra prioridad!
            </p>
          </div>

          <div className="row justify-content-center mt-5 mb-5">
            <div className="col-md-3 mb-4">
              <a href="mailto:demo@lareyna.com" className="contact-card email-card">
                <div className="card h-100">
                  <div className="card-body text-center py-4">
                    <i className="bi bi-envelope-fill"></i>
                    <h5 className="card-title">CORREO</h5>
                    <p className="card-text">demo@lareyna.com</p>
                  </div>
                </div>
              </a>
            </div>
            
            <div className="col-md-3 mb-4">
              <a href="https://wa.me/34947002963" className="contact-card whatsapp-card" target="_blank" rel="noopener noreferrer">
                <div className="card h-100">
                  <div className="card-body text-center py-4">
                    <i className="bi bi-whatsapp"></i>
                    <h5 className="card-title">WHATSAPP</h5>
                    <p className="card-text">(+34) 947 002 963</p>
                  </div>
                </div>
              </a>
            </div>
            
            <div className="col-md-3 mb-4">
              <a href="https://instagram.com/lareyna" className="contact-card instagram-card" target="_blank" rel="noopener noreferrer">
                <div className="card h-100">
                  <div className="card-body text-center py-4">
                    <i className="bi bi-instagram"></i>
                    <h5 className="card-title">INSTAGRAM</h5>
                    <p className="card-text">@lareyna</p>
                  </div>
                </div>
              </a>
            </div>
            
            <div className="col-md-3 mb-4">
              <a href="https://facebook.com/LaReynaOficial" className="contact-card facebook-card" target="_blank" rel="noopener noreferrer">
                <div className="card h-100">
                  <div className="card-body text-center py-4">
                    <i className="bi bi-facebook"></i>
                    <h5 className="card-title">FACEBOOK</h5>
                    <p className="card-text">La Reyna Oficial</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactoPage;
