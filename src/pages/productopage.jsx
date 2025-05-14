import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductDetail from '../components/ProductDetail';
import prodFrag2Img from '../assets/img/prod-frag2.png'; // Importar la imagen

const ProductoPage = () => {
  // Datos del producto (pueden venir de una API o base de datos)
  const productData = {
    image: prodFrag2Img, // Usar la imagen importada
    title: 'CIELO EN ROSA EAU DE PARFUM',
    volume: '50.00ml',
    price: 'S/ 113.00',
    description:
      'Un nuevo perfume de la línea Cielo que te invita a asombrarte con su belleza. Cielo en Rosa trae toda la magia floral de la rosa búlgara en una nueva interpretación moderna y llena de contrastes, con almendra tostada y almizcle dulce.',
    ingredients: [
      {
        name: 'Rosa búlgara',
        description:
          'Una nota floral impactante con toques dulces como de miel, frutales como de liche y un aire fresco como el rocío de la mañana.',
      },
      {
        name: 'Almendra tostada',
        description:
          'Una nota innovadora que le agrega carácter al perfume. Su aroma es cálido y suave con textura aterciopelada, dulce y con toques quemados.',
      },
      {
        name: 'Almizcle dulce',
        description:
          'O musk dulce, es una nota cálida y sensual que aporta sofisticación y suavidad al aroma. Promueve la duración y potencia las demás notas del perfume.',
      },
    ],
  };

  return (
    <div className="page-container-for-fixed-nav"> {/* Añadida clase para padding de Navbar */}
      <Navbar />
      <ProductDetail {...productData} />
      <Footer />
    </div>
  );
};

export default ProductoPage;