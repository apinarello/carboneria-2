// Seleccionamos el contenedor donde se insertará el header
const nav = document.querySelector('#header');

// Cargar el contenido del header
fetch('../header/header.html')
  .then(res => {
    if (!res.ok) {
      throw new Error('No se pudo cargar el header');
    }
    return res.text();
  })
  .then(data => {
    nav.innerHTML = data;

    // Asignar eventos después de cargar el header
    const Menu = document.querySelector('#Menu');
    const cerrar = document.querySelector('#cerrar');
    const navList = document.querySelector('#nav');

    if (Menu && cerrar && navList) {
      Menu.addEventListener('click', () => {
        navList.classList.add('visible');
      });

      cerrar.addEventListener('click', () => {
        navList.classList.remove('visible');
      });

      // Cerrar menú al hacer clic fuera
      document.addEventListener('click', (event) => {
        if (!navList.contains(event.target) && !Menu.contains(event.target)) {
          navList.classList.remove('visible');
        }
      });

      // Cerrar menú con la tecla Escape
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          navList.classList.remove('visible');
        }
      });
    } else {
      console.error('No se encontraron los elementos del menú');
    }
  })
  .catch(error => console.error('Error al cargar el header:', error));