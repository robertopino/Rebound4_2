console.log("🟢 Connected!");

const registerForm = document.querySelector("#registerForm");
const correo = document.querySelector("#correo");
const password = document.querySelector("#password");
const nombre = document.querySelector("#username");
const terms = document.querySelector("#terms");
const desc = document.querySelector("#desc");

const vipField = document.querySelector("#vipField");
const sendBtn = document.querySelector(".send-btn");
const modal = document.querySelector("#modal");

const userSelectors = document.querySelectorAll("input[name='signup']");
let opcion = "regular";

userSelectors.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.checked) {
      opcion = item.value;
    }

    if (opcion === "vip") {
      vipField.classList.remove("d-none");
      sendBtn.style.backgroundColor = "#ffee02";
      sendBtn.style.color = "black";

      desc.textContent =
        "Complete los siguientes campos para crear su cuenta VIP. Por ser un usuario VIP podrá crear su nombre de usuario personalizado.";
    } else {
      vipField.classList.add("d-none");
      sendBtn.style.backgroundColor = "#1163ed";
      sendBtn.style.color = "white";

      desc.textContent =
        "Complete los siguientes campos para crear su cuenta regular. Considere que a este tipo de cuenta se le asigna un nombre de usuario.";
    }
  });
});

const closeModal = (modal) => {
  modal.classList.add("d-none");
};

//CLASSES
class persona {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  set setEmail(nuevoEmail) {
    this.email = nuevoEmail;
  }

  set setPassword(nuevoPassword) {
    this.password = nuevoPassword;
  }
}

class usuarioRegular extends persona {
  constructor(email, password) {
    super(email, password);
    this.nombre = `Usuario${Date.now()}`;
  }

  get getInfo() {
    modal.classList.remove("d-none");
    modal.querySelector(
      ".modal-header > p"
    ).textContent = `Bienvenido ${this.nombre}`;
    modal.querySelector(
      ".modal-body > p"
    ).textContent = `Email: ${this.email} Contraseña: ${this.password}`;
  }
}

class usuarioVip extends persona {
  constructor(nombre, email, password) {
    super(email, password);
    this.nombre = nombre;
  }

  get getInfo() {
    modal.classList.remove("d-none");
    modal.querySelector(
      ".modal-header > p"
    ).textContent = `Bienvenido ${this.nombre}`;
    modal.querySelector(
      ".modal-body > p"
    ).textContent = `Usuario: ${this.nombre} Email: ${this.email} Contraseña: ${this.password}`;
  }
}

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (opcion === "vip" && !nombre.value.trim()) {
    alert("Debe ingresar un nombre válido");
    nombre.focus();
    return;
  }

  if (!correo.value.trim()) {
    alert("Debe ingresar un correo válido");
    correo.focus();
    return;
  }

  if (!password.value.trim()) {
    alert("Debe ingresar una contraseña");
    password.focus();
    return;
  }

  if (!terms.checked) {
    alert("Para registrarse debe aprobar nuestros Términos y condiciones");
    return;
  }

  if (opcion === "vip") {
    const usuario = new usuarioVip(nombre.value, correo.value, password.value);
    usuario.getInfo;
  } else {
    const usuario = new usuarioRegular(correo.value, password.value);
    usuario.getInfo;
  }
});
