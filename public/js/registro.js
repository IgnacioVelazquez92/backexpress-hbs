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

  try {
    const response = await fetch("/user/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    console.log(responseData)

    if (response.ok) {
      Swal.fire({
        title: "Inicio de sesión exitoso",
        icon: "success",
        text: responseData?.msg,
      }).then(() => {
        // Redirige a la página principal o realiza alguna acción necesaria después del inicio de sesión
        window.location.href = "/login"; // Puedes cambiar la URL según tus necesidades
      });
      ;
    } else {
      Swal.fire({
        title: "Error de inicio de registro",
        icon: "error",
        text: responseData?.errors[0].msg,
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error de inicio de sesión",
      icon: "error",
      text: responseData?.errors[0]?.msg || "error de servidor",
    });
  }
});
