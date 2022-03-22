const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*
0 - BACKLOG
1 - DESIGN
2 - TODO
3 - DOING
4 - TESTING
5 - CODE REVIEW
6 - DONE
*/


// TODO: Replace this with a database connection
let TASKS = [
    {
        id: 0,
        title: "Do something important",
        author: "Alex Chadwick",
        priority: 1,
        status: 4
    },
    {
        id: 1,
        title: "Merge branches",
        author: "John Doe",
        priority: 3,
        status: 0
    }
];

function taskById(task) {
    return task.id === this.id;
}

app.get("/task/:id?", (req, res) => {
    if (req.params.id === undefined) {
        return res.json(TASKS).send();
    }

    let task = TASKS.find(taskById, { id: parseInt(req.params.id) });

    return res.json(task || { statusCode: 400 });
});

app.post("/task", (req, res) => {
    let newTask = req.body;

    if (newTask.title === undefined || newTask.author === undefined)
    {
        return res.sendStatus("400");
    }

    TASKS.push(
        {
            id: TASKS.length,
            title: newTask.title,
            author: newTask.author,
            priority: newTask.priority ?? 4
        }
    );

    return res.sendStatus(200);
});

app.delete("/task/:id", (req, res) => {
    if (req.params.id === undefined)
    {
        return res.sendStatus(400);
    }

    let taskIndex = TASKS.findIndex(item => item.id === parseInt(req.params.id));
    TASKS.splice(taskIndex, 1);

    return res.sendStatus(200);
});

app.put("/task/status/:id", (req, res) => {
    if (req.params.id === undefined || req.query.newVal === undefined)
    {
        return res.sendStatus(400);
    }

    const id = req.params.id;

    let taskIndex = TASKS.findIndex(item => item.id === parseInt(req.params.id));

    TASKS[taskIndex].priority = parseInt(req.query.newVal);

    return res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Working http://localhost:${PORT}`); });