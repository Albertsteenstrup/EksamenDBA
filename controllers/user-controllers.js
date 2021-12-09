const express = require('express');
const fs = require('fs');
const cors = require('cors');

const router = express();

router.use(cors());

//Åbner fil som javascript objekt
const dataArray = JSON.parse(fs.readFileSync('./models/users.json'));

//Registrer bruger
router.post('/new', function (req,res) {
    //Pusher body til ny bruger ind i users.json
    dataArray.push(req.body)

    fs.writeFile('./models/users.json', JSON.stringify(dataArray, null, 4), function(err) {
        if(err) return res.send(err)
            res.send({
                msg: 'User created'
            });
    });
});

//Bruger login
router.post("/login", (req, res) => {

    //Laver skabelon til user-input
    function userTemplate(username, password) {
        this.username = username;
        this.password = password;
    };

    //Laver funktion som skal sammenligne input med database data
    function findUser(input) {
        return dataArray.find((database) => input.username == database.username)
    }

    //Indsætter input i skabelon
    const loginInput = new userTemplate(req.body.username, req.body.password);

    const databaseData = findUser(loginInput);
    
    //Tjekker om username findes, og derefter om password matcher.
    if (databaseData) {
        if (databaseData.password == loginInput.password) {
            res.status(200).send(true);
        } else {
            res.status(401).send(false);
        }
    } else {
        res.status(404).send(false);
    }
});

//Fjern bruger
router.delete('/delete', function (req, res) {

    /*Her lopper jeg igennem alle mine brugere og sletter, hvis username og password fra input 
    matcher username og password fra users.json*/
    for (let i = 0; i < dataArray.length; i++) {
        if( dataArray[i].username == req.body.username && dataArray[i].password == req.body.password) {
            dataArray.splice(i, 1)

            fs.writeFile('./models/users.json', JSON.stringify(dataArray, null, 4), function(err) {
                if(err) return res.send(err)
                    res.send({
                        msg: 'User deleted'
                    });
            });
        };
    };

});

//Opdater username
router.put("/username_update", (req, res) => {
    //Her looper jeg igennem min users.json for at tjekke om input matcher. Hvis input matcher en user, så opdateres username.
    for (let i = 0; i < dataArray.length; i++) {
        if(dataArray[i].password == req.body.oldPassword && dataArray[i].username == req.body.oldUsername ) {
            //Her opdateres username i users.json
            dataArray[i].username = req.body.newUsername
            fs.writeFile("./models/users.json", JSON.stringify(dataArray, null, 4), err => {
                if(err) 
                res.send(err)
                res.status(200).json({msg: "Updated username"})
            });
        }  
    }
})

//Opdater password
router.put("/password_update", (req, res) => {
    //Her looper jeg igennem min users.json for at tjekke om input matcher. Hvis input matcher en user, så opdateres password.
    for (let i = 0; i < dataArray.length; i++) {
        if(dataArray[i].password == req.body.oldPassword && dataArray[i].username == req.body.oldUsername ) {
            //Her opdateres password i users.json
            dataArray[i].password = req.body.newPassword
            fs.writeFile("./models/users.json", JSON.stringify(dataArray, null, 4), err => {
                if(err) 
                res.send(err)
                res.status(200).json({msg: "Updated password"})
            })
        }  
    }
})


module.exports = router;