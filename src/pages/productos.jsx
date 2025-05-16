import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductMenu from '../components/ProductMenu';
import Pagination from '../components/Pagination';

import prodFrag1Img from '../assets/img/prod-frag1.png';
import prodFrag2Img from '../assets/img/prod-frag2.png';
import prodFrag3Img from '../assets/img/prod-frag3.png';
import prodFrag4Img from '../assets/img/prod-frag4.jpg';
import prodFrag5Img from '../assets/img/prod-frag5.jpg';
import prodFrag6Img from '../assets/img/prod-frag6.png';
import '../styles/Productos.css'; // Importar el CSS para la página de productos

const ProductsPage = () => {
  return (
    <div className="page-container-for-fixed-nav"> {/* Aplicada clase para el Navbar fijo */}
      <Navbar />
      {/* Header de Productos */}
      <section className="productos-header text-center">
        <div className="container">
          <h1>NUESTROS PRODUCTOS</h1>
          <p className="lead">
            NUESTROS PRODUCTOS DE BELLEZA DE RECONOCIDA CALIDAD MARCAN TENDENCIA EN COSMÉTICA, PERFUMERÍA Y JOYERÍA.
            RESULTADOS PROBADOS Y FÓRMULAS DE ALTA EFICACIA QUE CUIDAN TU PIEL.
          </p>
          <div className="categorias-principales mt-4">
            <a href="#" className="categoria-link categoria-perfumes">Perfumes</a>
            <a href="#" className="categoria-link categoria-facial">Tratamiento Facial</a>
            <a href="#" className="categoria-link categoria-maquillaje">Maquillaje</a>
            <a href="#" className="categoria-link categoria-cuidado">Cuidado Personal</a>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <main className="container py-5">
        <div className="row">
          {/* Menú Lateral */}
          <aside className="col-lg-3">
            <ProductMenu />
          </aside>

          {/* Productos */}
          <section className="col-lg-9">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <ProductCard
                image={prodFrag1Img}
                name="Set Ccori Rosé: Parfum + Loción Perfumada"
                price="S/ 119.00"
                link="/producto/ccori-rose"
              />
              <ProductCard
                image={prodFrag2Img}
                name="Cielo en Rosa Eau de Parfum"
                price="S/ 113.00"
                link="/producto/cielo-rosa"
              />
              <ProductCard
                image={prodFrag3Img}
                name="Set Sauvage Dior: Parfum + Estuche Elegante"
                price="S/ 105.00"
                link="/producto/sauvage-dior"
              />
              <ProductCard
                image={prodFrag6Img}
                name="Bombshell Seduction Eau de Parfum"
                price="S/ 180.00"
                link="/producto/prod-frag6"
              />
              <ProductCard
                image={prodFrag5Img}
                name="Una Instinct Eau de Parfum"
                price="S/ 165.00"
                link="/producto/prod-frag5"
              />
              <ProductCard
                image={prodFrag4Img}
                name="Fragancia Intensa para Hombre"
                price="S/ 150.00"
                link="/producto/prod-frag4"
              />
              {/* Agregar más productos según sea necesario */}
            </div>

            {/* Paginación */}
            <Pagination
              currentPage={1}
              totalPages={5}
              onPageChange={(page) => console.log(`Cambiando a la página ${page}`)}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;