document.addEventListener('DOMContentLoaded', function () {
    //Tjekker om bruger er logget ind
      const loggedIn = localStorage.getItem("loggedInUser");
      if (!loggedIn) { 
          location.href = "/login.html";
           window.alert('Not logged in')
        };
    
    
    
    //Slet bruger
    let submitButtonDelete = document.getElementById('submitDelete');

    submitButtonDelete.addEventListener('click', function(e) {
        e.preventDefault();

        let usernameDelete = document.getElementById('usernameDelete').value;
        let passwordDelete = document.getElementById('passwordDelete').value;

        let deleteUser = {
            username: usernameDelete,
            password: passwordDelete
        }
        
        //Fetcher slet bruger samt fjerne bruger fra local storage, så bruger skal logge ind igen for at tilgå visse dele.
        fetch('http://localhost:3000/users/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteUser)
        }).then(response => response.json())
        .then(() => {
            window.alert('User deleted');
            localStorage.removeItem("loggedInUser");
            location.href = "/login.html";
        })
        .catch((error) => {
            console.log(error)
        });
    });

    //Opdater brugernavn
    let updateUsername = document.getElementById("updateUsernameSubmit")
        
    updateUsername.addEventListener("click", function (e) {
        e.preventDefault();

        //Henter henholdsvis gamle bruger info og ny bruger info
        let oldUsername = document.getElementById("oldUsernameUpdateUsername").value;
        let oldPassword = document.getElementById("oldPasswordUpdateUsername").value;
        let newUsername = document.getElementById("newUsername").value;


        let updatedUser = {
            oldUsername: oldUsername,
            oldPassword: oldPassword,
            newUsername: newUsername,
        };

        //Fetcher PUT til at opdatere username. Opdaterer samtidigt brugeroplysninger i local storage.
        fetch("http://localhost:3000/users/username_update", {
            method: "PUT",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(() => {
        window.alert('Username updated')
        localStorage.setItem("loggedInUser", JSON.stringify({username: newUsername, password: oldPassword }));
        document.getElementById("updateUsernameForm").reset();
        })
        .catch((error) => {
            console.log("Error:", error)
        });
    });

    //Opdater password
    let updatePassword = document.getElementById("updatePasswordSubmit");
        
    updatePassword.addEventListener("click", function(e) {
        e.preventDefault();

        //Henter henholdsvis gamle bruger info og ny bruger info
        let oldUsername = document.getElementById("oldUsernameUpdatePassword").value;
        let oldPassword = document.getElementById("oldPasswordUpdatePassword").value;
        let newPassword = document.getElementById("newPassword").value;


        let updatedUser = {
            oldUsername: oldUsername,
            oldPassword: oldPassword,
            newPassword: newPassword,
        };

        //Fetcher PUT til at opdatere password. Opdaterer samtidigt brugeroplysninger i local storage.
        fetch("http://localhost:3000/users/password_update", {
            method: "PUT",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(() => {
        window.alert('Password updated')
        localStorage.setItem("loggedInUser", JSON.stringify({username: oldUsername, password: newPassword }));
        document.getElementById("updatePasswordForm").reset();
        })
        .catch((error) => {
            console.log("Error:", error)
        });
    });
});