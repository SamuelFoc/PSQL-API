const express   = require("express");
const app       = express();
const pool      = require("./db");

//Using JSON data
app.use(express.json())

//Create a todo
app.post("/create_todo", async(req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1)", [description]);
        res.json(`Todo: '${description}' added to todo list. `)
    } catch (err){
        console.log(err.message);
    }
})

//Get all todos
app.get("/get_todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)
    } catch (err){
        console.log(err.message);
    }
})

//Get a todo
app.get("/get_a_todo/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const aTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(aTodo.rows)
    } catch (err){
        console.log(err.message);
    }
})

//Update a todo
app.put("/update_a_todo/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const description = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description.description, id]);

        res.json(`Todo updated to: '${description.description}.' `)
    } catch (err){
        console.log(err.message);
    }
})

//Delete a todo
app.delete("/delete_a_todo/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json(`Todo with id: '${id}' deleted successfully. `)
    } catch (err){
        console.log(err.message);
    }
})


app.listen(3000, () => {
    console.log("Server listening on port 3000...")
});