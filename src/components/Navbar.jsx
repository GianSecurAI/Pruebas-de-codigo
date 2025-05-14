import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tituloLaReyna from '../assets/img/titulo-lareyna.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Navbar.css'; 

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
    window.location.href = '/login';
  };

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
          <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
            <Link to="/cesta" className="me-3 text-decoration-none navbar-link" aria-label="Cesta">
              <i className="bi bi-bag"></i> CESTA
            </Link>
            {user ? (
              <span
                className="text-decoration-none navbar-link user-dropdown"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <i className="bi bi-person"></i> {user.name}
                <i className="bi bi-caret-down-fill ms-1" style={{ fontSize: '0.7em' }}></i>
              </span>
            ) : (
              <Link to="/login" className="text-decoration-none navbar-link" aria-label="Cuenta">
                <i className="bi bi-person"></i> CUENTA
              </Link>
            )}
            {user && showDropdown && (
              <div className="user-dropdown-menu" style={{ position: 'absolute', right: 0, top: '100%', background: '#fff', border: '1px solid #ddd', borderRadius: 4, minWidth: 120, zIndex: 1000 }}>
                <button className="dropdown-item w-100 text-start" onClick={handleLogout} style={{ background: 'none', border: 'none', padding: '8px 16px', cursor: 'pointer' }}>
                  Salir
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;