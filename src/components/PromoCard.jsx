import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PromoCard.css'; 

const PromoCard = ({ backgroundImage, title, description }) => {
  return (
    <div
      className="promo-card"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px',
        padding: '20px',
        color: 'white',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '180px'
      }}
    >
      <h5 className="promo-title">{title}</h5>
      {description && <p className="promo-description">{description}</p>}
    </div>
  );
};

PromoCard.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default PromoCard;