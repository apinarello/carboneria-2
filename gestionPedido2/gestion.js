// Seleccionamos el contenedor donde se insertará el header
const nav = document.querySelector('#header'); 

// Cargar el contenido del header
fetch('../header/header.html')
  .then(res => res.text())  // Usamos el método text() correctamente
  .then(data => {
    nav.innerHTML = data;  // Insertamos el contenido de header.html

    // Ahora que el contenido ha sido insertado, asignamos los eventos
    const Menu = document.querySelector('#Menu');
    const cerrar = document.querySelector('#cerrar');
    const navList = document.querySelector('#nav');  // Asegúrate de que #nav exista
    // Verificamos que los elementos existen antes de asignar los eventos
    if (Menu && cerrar && navList) {
      Menu.addEventListener('click', () => {
        navList.classList.add('visible');
      });

      cerrar.addEventListener('click', () => {
        navList.classList.remove('visible');
      });
    } else {
      console.error('No se encontraron los elementos del menú');
    }
  })
  .catch(error => console.error('Error al cargar el header:', error));  // Manejo de errores


  let orderId = 1;
  const detalle = [];
  let total = 0;

  const detalleDiv = document.getElementById('detalle');
  const precioTotalSpan = document.getElementById('precioTotal');
  const ordersTableBody = document.getElementById('ordersTableBody');

  // Agregar productos al detalle
  document.getElementById('addProductBtn').addEventListener('click', () => {
      const producto = document.getElementById('producto');
      const cantidad = parseInt(document.getElementById('cantidad').value, 10) || 1;
      const precio = parseFloat(producto.value);
      const nombreProducto = producto.options[producto.selectedIndex].text;

      if (cantidad < 1) {
          alert('La cantidad debe ser al menos 1.');
          return;
      }

      const subtotal = precio * cantidad;
      detalle.push({ producto: nombreProducto, cantidad, subtotal });

      detalleDiv.innerHTML += `<div>${cantidad}x ${nombreProducto} - $${subtotal.toFixed(2)}</div>`;
      total += subtotal;
      precioTotalSpan.textContent = `$${total.toFixed(2)}`;
  });

  // Guardar pedido
  document.getElementById('saveOrderBtn').addEventListener('click', () => {
      const cliente = document.getElementById('cliente').value;
      const fechaEntrega = document.getElementById('fechaEntrega').value;
      const direccion = document.getElementById('direccion').value;
      if (!cliente || !fechaEntrega || detalle.length === 0) {
          alert('Complete todos los campos y agregue al menos un producto.');
          return;
      }

      const fechaHoraPedido = new Date().toLocaleString();
      const detallesTexto = detalle.map(d => `${d.cantidad}x ${d.producto}`).join(', ');

      const row = `
          <tr>
              <td>${cliente}</td>
              <td>${detallesTexto}</td>
              <td>$${total.toFixed(2)}</td>
              <td>${fechaHoraPedido}</td>
              <td>${direccion}</td>
              <td>
                  <button class="btn btn-success btn-sm">Entregado</button>
                  <button class="btn btn-warning btn-sm">Modificar</button>
                  <button class="btn btn-danger btn-sm">Eliminar</button>
                  <button class="btn btn-info btn-sm">Info</button>
              </td>
          </tr>
      `;

      ordersTableBody.insertAdjacentHTML('beforeend', row);

      // Reiniciar modal
      detalle.length = 0;
      total = 0;
      detalleDiv.innerHTML = '';
      precioTotalSpan.textContent = '$0.00';
      document.getElementById('cliente').value = '';
      document.getElementById('fechaEntrega').value = '';

      const modal = bootstrap.Modal.getInstance(document.getElementById('addOrderModal'));
      modal.hide();
  });