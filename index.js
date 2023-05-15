const express = require("express");
const app = express();

(async () => {
    
    const database = require('./db');
    const Camiao = require('./models/camiao');
    const Camionista = require('./models/camionista');
    const Rota = require('./models/rota');
    const Armazem = require('./models/armazem');
    await database.sync({force:true});

   
    /*const novoCamionista = await Camionista.create({
        nome: 'Joao',
        cc: '15289571'
    })

    const novoCamiao = await Camiao.create({
        marca: 'BMW',
        matricula: 'ZZ',
        idCamionista : novoCamionista.id
    })*/

    const novaRota = await Rota.create({
        pontoPartida:'Braga',
        pontoChegada:'Porto'
    })
    

    /**const camiao = await Camiao.findByPk(1);
    const camionista = await camiao.getCamionista();
    console.log(camionista.nome);*/

    /**const camiao = await Camiao.findByPk(2, { include : Camionista });
    console.log(camiaoo.camionista.cc);*/


    

    
})();




app.use(express.json());

app.listen(8080, ()=> {
    console.log(`app running on localhost:${8080}`);
    });

