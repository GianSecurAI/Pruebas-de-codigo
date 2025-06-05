import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Contacto.css';
import { FaEnvelope, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

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

          {/* Contact Cards */}
          <div className="contact-cards-container">
            {/* Email Card */}
            <div className="contact-card email-card">
              <div className="card">
                <FaEnvelope className="card-icon" />
                <h3 className="card-title">Correo</h3>
                <a href="mailto:demo@lareyna.com" className="card-link">demo@lareyna.com</a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="contact-card whatsapp-card">
              <div className="card">
                <FaWhatsapp className="card-icon" />
                <h3 className="card-title">WhatsApp</h3>
                <a href="https://wa.me/34947002963" className="card-link">(+34) 947 002 963</a>
              </div>
            </div>

            {/* Instagram Card */}
            <div className="contact-card instagram-card">
              <div className="card">
                <FaInstagram className="card-icon" />
                <h3 className="card-title">Instagram</h3>
                <a href="https://instagram.com/lareyna" className="card-link">@lareyna</a>
              </div>
            </div>

            {/* Facebook Card */}
            <div className="contact-card facebook-card">
              <div className="card">
                <FaFacebook className="card-icon" />
                <h3 className="card-title">Facebook</h3>
                <a href="https://facebook.com/lareynaoficial" className="card-link">La Reyna Oficial</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <div className="container map-container">
        <div className="row justify-content-center">
          <div className="col-md-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.7385441158094!2d-77.06346097931682!3d-11.99258466713817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105ce56884c7ee7%3A0x6d8c6b2207bef24a!2sMegaplaza!5e0!3m2!1ses-419!2spe!4v1746688856578!5m2!1ses-419!2spe"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};