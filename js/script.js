document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    subject: "",
    message: "",
  };

  // Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#subject");
  const inputMensaje = document.querySelector("#message");

  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  // Asignar eventos
  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);

  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    resetFormulario();
  });

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add("flex");
    spinner.classList.remove("spinner");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("spinner");

      resetFormulario();

      //Crear alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add("exito");
      alertaExito.textContent = "Message sent successfully";

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  function validar(e) {
    if (e.target.value.trim() === "") {
      mostrarAlerta(
        `The input ${e.target.id} is mandatory`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("Invalid email", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    // Asigna los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    // Comprobar el objeto de email
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Generar alerta en el HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("alerta");

    // Inyectar el error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    // comprobar si ya existe una alerta
    const alerta = referencia.querySelector(".alerta");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity");
    btnSubmit.disabled = false;
    //console.log(btnSubmit);
  }

  function resetFormulario() {
    // Reiniciar el objeto
    email.email = "";
    email.subject = "";
    email.message = "";

    formulario.reset();
    comprobarEmail();
  }
});
