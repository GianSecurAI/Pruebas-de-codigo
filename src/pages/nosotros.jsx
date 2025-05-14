import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Nosotros.css'; 

import fondoImg from '../assets/img/fondo.png';
import compromisoImg from '../assets/img/compromiso-nosotros.png';
import muestraImg from '../assets/img/muestra.png';
import aromasImg from '../assets/img/aromas.png';

const NosotrosPage = () => {
  return (
    <div className="page-container-for-fixed-nav">
      <Navbar />
      {/* Hero Section */}
      <section
        className="hero-section py-5"
        style={{
          backgroundImage: `url(${fondoImg})`,
        }}
      >
        <div className="container py-5">
          <div className="d-flex align-items-center" style={{ marginLeft: '15%' }}>
            <h2 className="mb-0 me-5">SOBRE NOSOTROS</h2>
            <hr />
          </div>
        </div>
      </section>

      {/* About Sections */}
      <section className="bg-light py-5">
        <div className="container">
          {/* Nuestro Compromiso */}
          <div className="row align-items-center mb-5 mt-5">
            <div className="col-md-6 order-md-2 mb-4 mt-4 mb-md-0">
              <img
                src={compromisoImg}
                className="img-fluid rounded-3"
                alt="Equipo La Reyna"
              />
            </div>
            <div className="col-md-6 order-md-1">
              <h4 className="mb-3 mt-3">NUESTRO COMPROMISO</h4>
              <p>
                Trabajamos para hacer crecer la comunidad de mujeres exitosas, independientes y,
                sobre todo, poderosas: aquellas que serán agentes de cambio y transformación en sus
                propias vidas.
              </p>
            </div>
          </div>

          {/* Innovación y Calidad */}
          <div className="row align-items-center mb-5 mt-5">
            <div className="col-md-6 mb-4 mt-4 mb-md-0">
              <img
                src={muestraImg}
                className="img-fluid rounded-3"
                alt="Innovación y Calidad"
              />
            </div>
            <div className="col-md-6">
              <h4 className="mb-3 mt-3">INNOVACIÓN Y CALIDAD</h4>
              <p>
                Nuestros productos de belleza de reconocida calidad marcan tendencia en cosmética,
                perfumería y joyería. Resultados probados y fórmulas de alta eficacia que cuidan tu
                piel.
              </p>
            </div>
          </div>

          {/* Sostenibilidad */}
          <div className="row align-items-center mb-5 mt-5">
            <div className="col-md-6 order-md-2 mb-4 mt-4 mb-md-0">
              <img
                src={aromasImg}
                className="img-fluid rounded-3"
                alt="Sostenibilidad"
              />
            </div>
            <div className="col-md-6 order-md-1">
              <h4 className="mb-3 mt-3">SOSTENIBILIDAD</h4>
              <p>
                Ciencia y tecnología cosmética con ingredientes naturales, para garantizar fórmulas
                de alta eficacia con resultados clínicamente comprobados que cuiden de ti y el
                planeta.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NosotrosPage;