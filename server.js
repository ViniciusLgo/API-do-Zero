import express from 'express';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();  
app.use(express.json());

const users = [];

app.post('/usuarios', async (req, res) => {

    
        await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
            }
        })


    res.send("Deu, ok ok ok");


    });
    

app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany();

    res.status(200).json(users);

});

app.listen(3000);



app.put('/usuarios/:id', async (req, res) => {

    
    await prisma.user.update({
        where: { id: req.params.id },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        }
    })


res.send("Deu, ok ok ok");


});


// d4x0il@ senha mongo db