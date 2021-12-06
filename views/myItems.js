document.addEventListener('DOMContentLoaded',function () {
    //Tjekker om bruger er logget ind
    const loggedIn = localStorage.getItem("loggedInUser");
    if (!loggedIn) { 
        location.href = "/login.html";
         window.alert('Not logged in');
    }

    let localstorageUser = JSON.parse(localStorage.getItem("loggedInUser"));

    let usernameData = localstorageUser.username;
    let passwordData = localstorageUser.password;

    //Se mine varer i tabel
    let view = document.getElementById('view');
    let list = document.getElementById('list');

    view.addEventListener('click', function (e) {
       
        //Indsætter tabelhovederne i html
        list.innerHTML = `
        <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Item ID</th>
            <th>Product name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
        </tr>
        `;
        /*
        Henter dataen fra item.json og indsætter i tabellen ved at loope igennem med forEach,
        hvis username og password fra items.json passer med localstorage username og password.
        */
        fetch('http://localhost:3000/items/stored', {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((res) => {
            res.forEach((e) => {
                if(e.username === usernameData && e.password === passwordData) {
                list.innerHTML += `
                <tr>
                    <td>${e.username}</td> 
                    <td>${e.password}</td> 
                    <td>${e.itemid}</td> 
                    <td>${e.productName}</td>       
                    <td>${e.price}</td>
                    <td>${e.category}</td>          
                    <td>${e.image}</td>             
                </tr>
                `;
                }
            });      
        });
    });


    //Opdaterer vare
    let submitButtonUpdate = document.getElementById('submitUpdate');

    submitButtonUpdate.addEventListener('click', function(e) {
        e.preventDefault();

        let sameID = document.getElementById('id').value;
        let productName = document.getElementById('productNameUpdate').value;
        let productPrice = document.getElementById('productPriceUpdate').value;
        let category = document.getElementById('categoryUpdate').value;
        let image = document.getElementById('imageUpdate').value;

        let updatedItem = {
            id: sameID,
            productName: productName,
            price: productPrice,
            category: category,
            image: image
        }
        
        //Fetcher PUT og opdaterer med varen i item.json med input fra skabelon - updatedItem
        fetch('http://localhost:3000/items/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        }).then(response => response.json())
        .then(response => {
            window.alert('Item Updated');
            document.getElementById("formRegisterUpdate").reset();
        })
        .catch((error) => {
            console.log('Error:', error)
        })
    });


    //Sletter vare
    let submitButtonDelete = document.getElementById('submitDelete');

    submitButtonDelete.addEventListener('click', function(e) {
        e.preventDefault();

        //Sletter vare ved at hente varens unikke ID og indsæt i url. 
        let deleteID = document.getElementById('idDelete').value;;

        let deletedItem = {
            id: deleteID
        }
        
        //Fetcher DELETE
        fetch('http://localhost:3000/items/delete/' + deleteID, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deletedItem)
        }).then(response => response.json())
        .then(response => {
            window.alert('Item Deleted');
            document.getElementById("formRegisterDelete").reset();
        })
        .catch((error) => {
            console.log(error)
        });
    });
});