import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Importar Link
import '../styles/ProductCard.css'; 

const ProductCard = ({ image, name, price, link }) => { 
  return (
    <div className="card p-2 p-sm-3 text-center border-0 shadow-sm product-card h-100">
      <div className="product-image-container">
        <Link to={link} className="text-decoration-none"> 
          <img src={image} className="product-img mx-auto" alt={name} />
        </Link>
      </div>
      <div className="card-body d-flex flex-column">
        <h3 className="product-card-name">{name}</h3>
        <div className="product-card-price">{price}</div>
      </div>
      <div className="mt-auto">
        <Link to={link} className="btn product-card-btn w-100">
          COMPRAR AHORA
        </Link>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired, // Añadir propType para link
};

export default ProductCard;