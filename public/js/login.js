document.addEventListener("DOMContentLoaded", () => {
  const logForm = document.getElementById("loginForm");

  logForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#logEmail").value;
    const password = document.querySelector("#logPassword").value;

    const userData = {
      email: email,
      password: password,
    };

    console.log(userData);

    try {
      console.log("Enviando solicitud...");
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        Swal.fire({
          title: "Inicio de sesión exitoso",
          icon: "success",
          text: responseData.msg,
        });
        // .then(() => {
        //   window.location.href = "/"; // Redirección después del inicio de sesión exitoso
        // });
      } else {
        Swal.fire({
          title: "Error de inicio de sesión",
          icon: "error",
          text: responseData,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        title: "Error de inicio de sesión",
        icon: "error",
        text: responseData,
      });
    }
  });
});
