const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

require("dotenv").config();

const app = express();

const db = new PrismaClient();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
process.env.MODE === "local" ? app.use(cors()) : () => {};

/*
0 - BACKLOG
1 - DESIGN
2 - TODO
3 - DOING
4 - TESTING
5 - CODE REVIEW
6 - DONE
*/

function taskById(task) {
    return task.id === this.id;
}

app.get("/task/:id?", async (req, res) => {
    if (req.params.id === undefined) {
        let tasks = await db.task.findMany();
        return res.json(tasks).send();
    }

    let task = await db.task.find({
        where: {
            id: req.params.id
        }
    });
    return res.json(task || { statusCode: 400 });
});

app.post("/task", async (req, res) => {
    let newTask = req.body;

    if (newTask.title === undefined || newTask.author === undefined)
    {
        return res.sendStatus("400");
    }

    await db.task.create({
        data: {
            title: newTask.title,
            author: newTask.author,
            status: 0,
            priority: parseInt(newTask.priority) ?? 4
        }
    });

    return res.sendStatus(200);
});

app.delete("/task/:id", async (req, res) => {
    if (req.params.id === undefined)
    {
        return res.sendStatus(400);
    }

    await db.task.delete({
        where: {
            id: req.params.id
        }
    });

    return res.sendStatus(200);
});

app.put("/task/status/:id", async (req, res) => {
    if (req.params.id === undefined || req.query.newVal === undefined)
    {
        return res.sendStatus(400);
    }

    const id = req.params.id;

    await db.task.update({
        where: {
            id: id
        },
        data: {
            status: parseInt(req.query.newVal)
        }
    })

    return res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Working http://localhost:${PORT}`); });