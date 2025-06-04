import React from 'react';
import bannerPerfume from '../assets/img/banner-perfume.png';

const Carousel = () => {
  return (
    <section id="banner-principal" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={bannerPerfume} className="d-block w-100" alt="Banner Perfume" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#banner-principal" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#banner-principal" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </section>
  );
};

export default Carousel;