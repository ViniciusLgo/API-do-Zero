import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/usuarios', async (req, res) => {
    try {
        await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
            },
        });
        res.send("Usuário criado com sucesso");
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    } finally {
        await prisma.$disconnect(); // Desconecta o Prisma após cada operação
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    } finally {
        await prisma.$disconnect();
    }
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.update({
            where: { id:(req.params.id) },
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
            },
        });
        res.send("Usuário atualizado com sucesso");
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    } finally {
        await prisma.$disconnect();
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: { id:(req.params.id) },
        });
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    } finally {
        await prisma.$disconnect();
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));