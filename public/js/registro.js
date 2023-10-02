//REGISTRO
console.log("soy el registro");

const formulario = document.querySelector("form");

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Captura los valores de los campos del formulario
  const name = document.querySelector("#name").value;
  const lastName = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const userData = {
    name: name,
    lastName: lastName,
    email: email,
    password: password,
  };

  try {
    const response = await fetch("/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      alert("Usuario registrado con éxito");
    } else {
      alert("Error al registrar usuario");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
});
