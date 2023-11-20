const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#logEmail").value;
  const password = document.querySelector("#logPassword").value;

  const userData = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("/login", {
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
        text: responseData.resp.msg || "Inicio de sesión exitoso",
      }).then(() => {
        // Redirige a la página principal o realiza alguna acción necesaria después del inicio de sesión
        window.location.href = "/"; // Puedes cambiar la URL según tus necesidades
      });
    } else {
      Swal.fire({
        title: "Error de inicio de sesión",
        icon: "error",
        text: responseData.msg,
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error de inicio de sesión",
      icon: "error",
      text: "Error de servidor, inténtalo más tarde",
    });
  }
});
