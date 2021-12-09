const express = require('express');
const fs = require('fs');
const cors = require('cors');

const router = express();

router.use(cors());

//Åbner database som javascript objekter
const dataArray = JSON.parse(fs.readFileSync('./models/items.json'));

// Få brugerens egne produkter
router.get("/showUsersItems", (req, res) => {
    res.send(dataArray);
})

//Se varer tabel kun mine
router.get('/stored', (req, res) => {
            res.send(dataArray)
});

//Opret en vare
router.post('/new', function (req,res) {

    dataArray.push(req.body)

    fs.writeFile('./models/items.json', JSON.stringify(dataArray, null, 4), function(err) {
        if(err) return res.send(err)
            res.send({
                msg: 'Item created'
            });
    });
});

//Opdater vare ud fra vare id
router.put('/update', function (req, res) {
    // Looper igennem items.json for at finde varen, som passer til input (itemdid) og opdatere derefter diverse oplysninger.
    for (let i = 0; i < dataArray.length; i++) {

        if( dataArray[i].itemid == req.body.id ) {
            dataArray[i].productName = req.body.productName
            dataArray[i].price = req.body.price
            dataArray[i].category = req.body.category
            dataArray[i].image = req.body.image
            
            fs.writeFile('./models/items.json', JSON.stringify(dataArray, null, 4), function(err) {
                if(err) return res.send(err)
                    res.send({
                        msg: 'Item created'
                    });
            });
        };
    };
});

//Fjern vare
router.delete('/delete/:itemid', function (req, res) {
    // Looper igennem items.json for at finde varen, som passer til input (itemdid) og sletter derefter varen.
    for (let i = 0; i < dataArray.length; i++) {

        if( dataArray[i].itemid == req.params.itemid ) {
            dataArray.splice(i, 1)

            fs.writeFile('./models/items.json', JSON.stringify(dataArray, null, 4), function(err) {
                if(err) return res.send(err)
                    res.send({
                        msg: 'User deleted'
                    });
            });
        };
    };
});


// Få produkt udfra kategori 
router.get("/showItems", (req, res) => {
    res.send(dataArray);
})

module.exports = router;