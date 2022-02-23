const express = require('express')
const path = require('path');

const app = express()
var MongoClient = require('mongodb').MongoClient;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/cliente.html'));
        
})
app.get('/ejemplo', function (req, res) {
    console.log(req.query)
    res.json([{"name":"Victor"},{"name":"Alex"},{"name":"Pepe"}]);
        
})
app.get('/consulta', function (req, res) {
    //console.log(req.query.name)
    MongoClient.connect('mongodb+srv://victor:1Victormech@cluster0.vudsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', async function (err, client) {

        if (err) throw err;
    
        var db = client.db('School');
        
        const findResult = await db.collection('Alumnos').find({"name":req.query.name}).toArray();
        res.json(findResult);
    })
})


app.listen(8000,() =>{
    console.log("Servidor iniciado")
})