document.addEventListener("DOMContentLoaded", function () {
  console.log("Script cargado correctamente");

  // ---------- REGISTRO ----------
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("registerName").value;
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
      const confirm = document.getElementById("registerConfirm").value;
      const message = document.getElementById("registerMessage");

      if (password !== confirm) {
        message.textContent = "❌ Las contraseñas no coinciden.";
        message.style.color = "red";
        return;
      }

      const user = { name, email, password };
      localStorage.setItem("user", JSON.stringify(user));
      message.textContent = "✅ Registro exitoso. Redirigiendo a inicio de sesión...";
      message.style.color = "lightgreen";

      registerForm.reset();

      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    });
  }

  // ---------- INICIO DE SESIÓN ----------
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const message = document.getElementById("loginMessage");

      const storedUser = JSON.parse(localStorage.getItem("user"));

      const testUser = {
        name: "Usuario Demo",
        email: "usuario@calmind.com",
        password: "calmind123",
      };

      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        message.textContent = `✅ Bienvenido, ${storedUser.name}`;
        message.style.color = "lightgreen";
        loginForm.reset();

        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      } else if (
        email === testUser.email &&
        password === testUser.password
      ) {
        message.textContent = `✅ Bienvenido, ${testUser.name}`;
        message.style.color = "lightgreen";
        loginForm.reset();

        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      } else {
        message.textContent = "❌ Correo o contraseña incorrectos.";
        message.style.color = "red";
      }
    });
  }

  // ---------- VINCULAR DISPOSITIVO ----------
  const vincularForm = document.getElementById("vincularForm");
  if (vincularForm) {
    vincularForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const tipo = document.getElementById("tipo").value;
      const codigo = document.getElementById("codigo").value.trim();

      if (!nombre || !tipo || !codigo) {
        alert("⚠️ Por favor, completa todos los campos.");
        return;
      }

      const dispositivo = {
        nombre,
        tipo,
        codigo,
        fecha: new Date().toLocaleString()
      };

      let dispositivos = JSON.parse(localStorage.getItem("dispositivos")) || [];
      dispositivos.push(dispositivo);
      localStorage.setItem("dispositivos", JSON.stringify(dispositivos));

      alert("✅ Dispositivo vinculado correctamente.");
      vincularForm.reset();
    });
  }
});
