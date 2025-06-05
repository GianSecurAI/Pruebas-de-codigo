// filepath: /workspaces/Pruebas-de-codigo/src/pages/login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../styles/login.css';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerAddress, setRegisterAddress] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Si ya hay usuario logueado, redirigir al home
    const user = localStorage.getItem('user');
    if (user) navigate('/');
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("correo", loginEmail);
    formData.append("password", loginPassword);

    try {
      const response = await fetch('http://localhost:3001/auth/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.data)); // guarda el objeto user
        alert(data.message);
        navigate('/');
        window.location.reload();
      } else {
        alert(data.message); // muestra mensaje de error desde backend
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error al conectar con el servidor');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const user = {
      nombreCompleto: registerName,
      correo: registerEmail,
      password: registerPassword,
      telefono: registerPhone,
      direccion: registerAddress,
      estado: "activo",
      id_rol: 2,
      role: "USER"
    };

    try {
      const response = await fetch('http://localhost:8090/auth/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setShowRegister(false);
        setLoginEmail(registerEmail);
      } else {
        const error = await response.text();
        console.error('Error en el registro:', error);
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('No se pudo conectar al servidor');
    }

    setShowRegister(false);
    setLoginEmail(registerEmail);
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterPhone('');
    setRegisterAddress('');
  };

  return (
    <div className="login-page-container">
      <Navbar />
      <div className="login-container">
        {!showRegister ? (
          <div className="login-form-container">
            <h2>Acceder</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="login-email">Correo electrónico *</label>
                <input
                  type="email"
                  id="login-email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" style={{ position: 'relative' }}>
                <label htmlFor="login-password">Contraseña *</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  style={{ paddingRight: '38px' }}
                />
                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#888',
                    fontSize: '1.2em',
                    padding: 0
                  }}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
              <div className="form-options">
                <button type="submit" className="btn-submit">Acceder</button>
                <label className="remember-me">
                  <input type="checkbox" /> Recuérdame
                </label>
              </div>
              <a href="#" className="forgot-password">¿Olvidaste la contraseña?</a>
            </form>
            <div className="switch-form">
              <span>¿No tienes cuenta?</span>
              <button className="btn-link" onClick={() => setShowRegister(true)}>Registrarte</button>
            </div>
          </div>
        ) : (
          <div className="register-form-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="register-name">Nombre completo *</label>
                <input
                  type="text"
                  id="register-name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-email">Dirección de correo electrónico *</label>
                <input
                  type="email"
                  id="register-email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" style={{ position: 'relative' }}>
                <label htmlFor="register-password">Contraseña *</label>
                <input
                  type={showRegisterPassword ? "text" : "password"}
                  id="register-password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                  style={{ paddingRight: '38px' }}
                />
                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowRegisterPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showRegisterPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#888',
                    fontSize: '1.2em',
                    padding: 0
                  }}
                >
                  <i className={`bi ${showRegisterPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="register-phone">Teléfono</label>
                <input
                  type="tel"
                  id="register-phone"
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-address">Dirección</label>
                <input
                  type="text"
                  id="register-address"
                  value={registerAddress}
                  onChange={(e) => setRegisterAddress(e.target.value)}
                />
              </div>
              <p className="privacy-policy">
                Tus datos personales se utilizarán para procesar tu pedido, mejorar
                tu experiencia en esta web, gestionar el acceso a tu cuenta y otros
                propósitos descritos en nuestra política de privacidad.
              </p>
              <button type="submit" className="btn-submit">Registrarse</button>
            </form>
            <div className="switch-form">
              <span>¿Ya tienes cuenta?</span>
              <button className="btn-link" onClick={() => setShowRegister(false)}>Iniciar sesión</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
