import React, { useState } from 'react'; // Importar useState
import '../styles/ProductMenu.css'; // Importar el archivo CSS

const ProductMenu = () => {
  const categories = [
    { title: 'Marcas', subCategories: ['Esika', 'Cyzone', "L'bel", 'Yanbal', 'Victoria Secret'] },
    { title: 'Para Mujer', subCategories: ['Eau de Parfum', 'Eau de Toilette', 'Body Mist', 'Colonias', 'Loción Perf.', 'Sets de regalo'] },
    { title: 'Para Hombre', subCategories: ['Eau de Parfum', 'Eau de Toilette', 'Body Mist', 'Colonias', 'Loción Perf.', 'Sets de regalo'] },
    { title: 'Ofertas', subCategories: [] }, // Ofertas no tiene subcategorías en la imagen, pero se mantiene por si acaso
  ];

  // Estado para manejar las categorías expandidas
  const [expandedCategories, setExpandedCategories] = useState({});

  // Función para alternar la expansión de una categoría
  const toggleCategory = (categoryTitle) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle]
    }));
  };

  return (
    <div className="menu-perfumes">
      <h5>MENÚ - PERFUMES</h5>
      <nav className="nav flex-column">
        {categories.map((category, index) => (
          <React.Fragment key={category.title}> {/* Usar category.title como key si son únicos */} 
            <a 
              className="nav-link category-title"
              href="#"
              onClick={(e) => { 
                e.preventDefault(); 
                toggleCategory(category.title); 
              }}
              aria-expanded={!!expandedCategories[category.title]}
              aria-controls={`subcategories-${category.title.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <span aria-hidden="true" className="category-icon">
                {expandedCategories[category.title] ? '\u25BC ' : '\u25B6 '}{/* ▼ o ► */}
              </span>
              {category.title}
            </a>
            {expandedCategories[category.title] && (
              <div 
                id={`subcategories-${category.title.replace(/\s+/g, '-').toLowerCase()}`}
                className="sub-category-container"
              >
                {category.subCategories.map((subCategory, subIndex) => (
                  <a key={subIndex} className="nav-link sub-category" href="#">
                    {subCategory}
                  </a>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default ProductMenu;