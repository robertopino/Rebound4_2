"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log("🟢 Connected!");

var registerForm = document.querySelector("#registerForm");
var correo = document.querySelector("#correo");
var password = document.querySelector("#password");
var nombre = document.querySelector("#username");
var terms = document.querySelector("#terms");
var desc = document.querySelector("#desc");

var vipField = document.querySelector("#vipField");
var sendBtn = document.querySelector(".send-btn");
var modal = document.querySelector("#modal");

var userSelectors = document.querySelectorAll("input[name='signup']");
var opcion = "regular";

userSelectors.forEach(function (item) {
  item.addEventListener("click", function () {
    if (item.checked) {
      opcion = item.value;
    }

    if (opcion === "vip") {
      vipField.classList.remove("d-none");
      sendBtn.style.backgroundColor = "#ffee02";
      sendBtn.style.color = "black";

      desc.textContent = "Complete los siguientes campos para crear su cuenta VIP. Por ser un usuario VIP podrá crear su nombre de usuario personalizado.";
    } else {
      vipField.classList.add("d-none");
      sendBtn.style.backgroundColor = "#1163ed";
      sendBtn.style.color = "white";

      desc.textContent = "Complete los siguientes campos para crear su cuenta regular. Considere que a este tipo de cuenta se le asigna un nombre de usuario.";
    }
  });
});

var closeModal = function closeModal(modal) {
  modal.classList.add("d-none");
};

//CLASSES

var persona = function () {
  function persona(email, password) {
    _classCallCheck(this, persona);

    this.email = email;
    this.password = password;
  }

  _createClass(persona, [{
    key: "setEmail",
    set: function set(nuevoEmail) {
      this.email = nuevoEmail;
    }
  }, {
    key: "setPassword",
    set: function set(nuevoPassword) {
      this.password = nuevoPassword;
    }
  }]);

  return persona;
}();

var usuarioRegular = function (_persona) {
  _inherits(usuarioRegular, _persona);

  function usuarioRegular(email, password) {
    _classCallCheck(this, usuarioRegular);

    var _this = _possibleConstructorReturn(this, (usuarioRegular.__proto__ || Object.getPrototypeOf(usuarioRegular)).call(this, email, password));

    _this.nombre = "Usuario" + Date.now();
    return _this;
  }

  _createClass(usuarioRegular, [{
    key: "getInfo",
    get: function get() {
      modal.classList.remove("d-none");
      modal.querySelector(".modal-header > p").textContent = "Bienvenido " + this.nombre;
      modal.querySelector(".modal-body > p").textContent = "Email: " + this.email + " Contrase\xF1a: " + this.password;
    }
  }]);

  return usuarioRegular;
}(persona);

var usuarioVip = function (_persona2) {
  _inherits(usuarioVip, _persona2);

  function usuarioVip(nombre, email, password) {
    _classCallCheck(this, usuarioVip);

    var _this2 = _possibleConstructorReturn(this, (usuarioVip.__proto__ || Object.getPrototypeOf(usuarioVip)).call(this, email, password));

    _this2.nombre = nombre;
    return _this2;
  }

  _createClass(usuarioVip, [{
    key: "getInfo",
    get: function get() {
      modal.classList.remove("d-none");
      modal.querySelector(".modal-header > p").textContent = "Bienvenido " + this.nombre;
      modal.querySelector(".modal-body > p").textContent = "Usuario: " + this.nombre + " Email: " + this.email + " Contrase\xF1a: " + this.password;
    }
  }]);

  return usuarioVip;
}(persona);

registerForm.addEventListener("submit", function (e) {
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
    var usuario = new usuarioVip(nombre.value, correo.value, password.value);
    usuario.getInfo;
  } else {
    var _usuario = new usuarioRegular(correo.value, password.value);
    _usuario.getInfo;
  }
});