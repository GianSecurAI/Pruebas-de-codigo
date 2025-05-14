import React from 'react';
import { Link } from 'react-router-dom';
import tituloLaReyna from '../assets/img/titulo-lareyna.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <img src={tituloLaReyna} alt="La Reyna" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><Link className="nav-link active" to="/">INICIO</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">PRODUCTOS</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">NOSOTROS</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">CONTACTO</Link></li>
          </ul>
          <div>
            <Link to="/cesta" className="me-3 text-decoration-none navbar-link" aria-label="Cesta">
              <i className="bi bi-bag"></i> CESTA
            </Link>
            <Link to="/login" className="text-decoration-none navbar-link" aria-label="Cuenta">
              <i className="bi bi-person"></i> CUENTA
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;