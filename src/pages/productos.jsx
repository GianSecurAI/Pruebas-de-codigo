import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductMenu from '../components/ProductMenu';
import Pagination from '../components/Pagination';

import prodFrag2Img from '../assets/img/prod-frag2.png';
import prodFrag1Img from '../assets/img/prod-frag1.png';
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
                image={prodFrag2Img}
                name="Cielo en Rosa Eau de Parfum"
                price="S/ 113.00"
                link="/producto/cielo-en-rosa" // Corregido para usar la ruta de React Router
              />
              <ProductCard
                image={prodFrag1Img}
                name="Set Ccori Rosé: Parfum + Loción Perfumada"
                price="S/ 119.00"
                link="#"
              />
              <ProductCard
                image={prodFrag1Img}
                name="Set Ccori Rosé: Parfum + Loción Perfumada"
                price="S/ 119.00"
                link="#"
              />
              {/* Agregar más productos según sea necesario */}
            </div>

            {/* Paginación */}
            <Pagination
              currentPage={1}
              totalPages={10}
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