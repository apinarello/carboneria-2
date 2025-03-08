// Seleccionar elementos
const nav = document.querySelector("#nav");
const Menu = document.querySelector("#Menu");
const cerrar = document.querySelector("#cerrar");

// Verificar que los elementos existan
if (nav && Menu && cerrar) {
  // Abrir menú
  Menu.addEventListener("click", () => {
    nav.classList.add("visible");
  });

  // Cerrar menú
  cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !Menu.contains(event.target)) {
      nav.classList.remove("visible");
    }
  });

  // Cerrar menú con la tecla Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      nav.classList.remove("visible");
    }
  });
} else {
  console.error("No se encontraron los elementos del menú.");
}
