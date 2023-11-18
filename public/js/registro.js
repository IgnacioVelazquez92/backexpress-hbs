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

    if (response.ok) {
      Swal.fire({
        title: "Inicio de sesión exitoso",
        icon: "success",
        text: responseData?.msg,
      });
    } else {
      Swal.fire({
        title: "Error de inicio de registro",
        icon: "error",
        text: responseData.errors[0].msg,
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
