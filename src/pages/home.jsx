import React from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import PromoCard from '../components/PromoCard';
import Footer from '../components/Footer';
import '../styles/Home.css'; // Importar Home.css

// Importar imágenes desde src/assets/img
import categoriaFraganciasImg from '../assets/img/categoria-fragancias.png';
import categoriaTratamientosImg from '../assets/img/categoria-tratamientos.png';
import categoriaMaquillajeImg from '../assets/img/categoria-maquillaje.png';
import categoriaCuidadoImg from '../assets/img/categoria-cuidado.png';
import prodFrag1Img from '../assets/img/prod-frag1.png';
// Si hay otras imágenes de productos, importarlas también. Ejemplo:
// import prodFrag2Img from '../assets/img/prod-frag2.png';
import promoRegaloBgImg from '../assets/img/promo-regalo.png';
import promoDescuentoBgImg from '../assets/img/promo-descuento.png';

const Home = () => {
  return (
    <div className="home-container"> {/* Añadir clase aquí */}
      <Navbar/>
      <Carousel/>
      {/* Título de Categorías */}
      <div className="section-title-container">
        <h2 className="section-title">CATEGORÍAS</h2>
      </div>
      <section className="categorias py-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <CategoryCard image={categoriaFraganciasImg} title="FRAGANCIAS" />
            <CategoryCard image={categoriaTratamientosImg} title="TRATAMIENTOS FACIALES" />
            <CategoryCard image={categoriaMaquillajeImg} title="MAQUILLAJE" />
            <CategoryCard image={categoriaCuidadoImg} title="CUIDADO PERSONAL" />
          </div>
        </div>
      </section>
      {/* Título de Productos Estrella */}
      <div className="section-title-container productos-estrella-title-container">
        <h2 className="section-title">NUESTROS PRODUCTOS ESTRELLA</h2>
      </div>
      <section className="productos-estrella py-5" style={{ background: '#f8f3f7' }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            <ProductCard image={prodFrag1Img} name="Set Cori Rosé: Parfum + Loción Perfumada" price="S/ 119.00" />
            <ProductCard image={prodFrag1Img} name="Set Cori Rosé: Parfum + Loción Perfumada" price="S/ 119.00" />
            <ProductCard image={prodFrag1Img} name="Set Cori Rosé: Parfum + Loción Perfumada" price="S/ 119.00" />
            <ProductCard image={prodFrag1Img} name="Set Cori Rosé: Parfum + Loción Perfumada" price="S/ 119.00" />
          </div>
        </div>
      </section>
      <section className="container py-4">
        <div className="row g-4">
          <div className="col-md-6">
            <PromoCard
              backgroundImage={promoRegaloBgImg}
              title="¡REGALO POR COMPRA!"
              description="Llévate un producto de regalo por compras mayores a S/150"
            />
          </div>
          <div className="col-md-6">
            <PromoCard
              backgroundImage={promoDescuentoBgImg}
              title="HASTA UN 50% EN PRODUCTOS SELECCIONADOS"
              description=""
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;