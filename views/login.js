document.addEventListener("DOMContentLoaded", function() {
  // Tjekker om bruger er logget ind
    const loggedIn = localStorage.getItem("loggedInUser");
    if (loggedIn) {
      location.href = "/";
    }
  
    document.getElementById("formLogin").addEventListener("submit", function(e) {
      e.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const userInput = {
        username: username,
        password: password,
      };

      // Poster givne oplysninger og redirecter brugeren til startsiden, hvis login-oplysningerne er korrekte
      // Derudover gemmes login-oplysninger i local storage
      fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            localStorage.setItem("loggedInUser", JSON.stringify(userInput));
            location.href = "/";
          } else {
            window.alert('Username or password incorrect');
          }
        })
        .catch(() => {
          window.alert("Error");
        });
    });
  });