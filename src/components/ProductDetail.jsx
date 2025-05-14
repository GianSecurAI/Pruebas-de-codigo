import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/ProductDetail.css'; 

const ProductDetail = ({ image, title, volume, price, description, ingredients }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <main className="container py-5">
      <Link to="/productos" className="volver-atras">
        <i className="bi bi-arrow-left"></i> VOLVER ATRÁS
      </Link>
      <div className="row align-items-start g-5">
        {/* Imagen del Producto */}
        <div className="col-md-5 text-center">
          <img src={image} alt={title} className="producto-detalle-img shadow-sm rounded" />
        </div>

        {/* Detalles del Producto */}
        <div className="col-md-7">
          <div className="detalle-titulo mb-1">{title}</div>
          <div className="detalle-volumen">{volume}</div>
          <div className="detalle-precio mb-3">{price}</div>

          {/* Formulario de Cantidad */}
          <form className="d-flex align-items-center mb-3">
            <label htmlFor="cantidad" className="form-label mb-0">Cantidad:</label>
            <div className="input-group" style={{ width: '120px' }}>
              <button
                type="button"
                className="btn btn-cantidad"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <input
                type="text"
                id="cantidad"
                className="form-control cantidad-input"
                value={quantity}
                readOnly
              />
              <button
                type="button"
                className="btn btn-cantidad"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </form>

          {/* Botón Agregar a la Bolsa */}
          <button className="btn btn-agregar mb-4">AGREGAR A LA BOLSA</button>

          {/* Descripción del Producto */}
          <div className="mb-3">
            <h6>¿Qué es?</h6>
            <div className="detalle-descripcion">{description}</div>
          </div>

          {/* Ingredientes */}
          <div className="detalle-ingredientes">
            <h6>Ingredientes</h6>
            {ingredients.map((ingredient, index) => (
              <p key={index}>
                <b>{ingredient.name}:</b> {ingredient.description}
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

ProductDetail.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  volume: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductDetail;