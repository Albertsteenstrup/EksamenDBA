document.addEventListener('DOMContentLoaded',function () {
// Tjekker om bruger er logget ind
    const loggedIn = localStorage.getItem("loggedInUser");
    if (!loggedIn) { 
        location.href = "/login.html";
         window.alert('Not logged in');
    }

    let submitButton = document.getElementById('submit');

    submitButton.addEventListener('click', function(e) {
        e.preventDefault();

        //Henter username og password fra localstorage til at indsætte, når bruger laver en vare
        let localstorageUser = JSON.parse(localStorage.getItem("loggedInUser"));

        //Genererer unikt ID når item bliver lavet samt input fra form
        let usernameData = localstorageUser.username;
        let passwordData = localstorageUser.password;
        let newID = 'id' + Date.now().toString(36);
        let productName = document.getElementById('productName').value;
        let productPrice = document.getElementById('productPrice').value;
        let category = document.getElementById('category').value;
        let image = document.getElementById('image').value;

        let newItem = {
            username: usernameData,
            password: passwordData,
            itemid: newID,
            productName: productName,
            price: productPrice,
            category: category,
            image: image
        }
        
        //Poster input
        fetch('http://localhost:3000/items/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        }).then(response => response.json())
        .then(response => {
            window.alert('Item created');
            location.href = "/";
        })
        .catch((error) => {
            console.log(error)
        })


    });

});