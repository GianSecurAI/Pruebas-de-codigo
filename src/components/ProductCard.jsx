import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Importar Link
import '../styles/ProductCard.css'; 

const ProductCard = ({ image, name, price, link }) => { 
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div className="card p-3 text-center border-0 shadow-sm product-card">
        <Link to={link} className="text-decoration-none"> 
          <img src={image} className="card-img-top mx-auto" alt={name} />
        </Link>
        <div className="card-body">
          <div className="product-card-name">{name}</div>
          <div className="product-card-price">{price}</div>
        </div>
        <Link to={link} className="btn product-card-btn">
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