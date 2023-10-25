const formulario = document.querySelector("#registration-form");

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

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

  console.log(userData);

  try {
    console.log("Enviando solicitud...");
    const response = await fetch("/user/create-user", {
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
