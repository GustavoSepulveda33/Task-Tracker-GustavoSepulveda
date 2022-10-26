

// VIEW ENGINE ~ "A view engine translates a server-side template into HTML markup and renders it in the web browser 
//                  when triggered by a controller's action method."; 
//                  Essentially, it helps render server-side data in a more digestable format for the browser by 
//                  creating a html template in plain javascript. 
//                  This allows me to connect my back-end to my front-end (and it only took me 5 task trackers to learn this).
//                  Relates to the "html" page in the views folder. 

// Express.static ~ is a middleware. Static, speaks to imgs and javascript. 
// Body-parser ~ It parses the form sent into the server before the it gets to the handler. Allow me to pinpoint info I want. 
//                "extended: true" allows all the items sent back are not just strings. 



//IMPORTS

import fs from "fs";
import express from "express";
import bodyParser from "body-parser";

const port = 5000;
const app = express();

//SET THE VIEW ENGINE
app.set("view engine", "ejs");


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// taskJSON -> reads the json file & task -> parses the json information from taskJSON 
const taskJSON = fs.readFileSync("Tasks-List.json");
const task = JSON.parse(taskJSON);


// Id equals the totatl lenght fo the task array becasue as one new task gets pushed to the bottom of the list, it 
//    occupies the last position in the list, thus having an Id value the same as the total lenght. 
var taskID = task.length;



//ROUTES ROUTES ROUTES ROUTES ROUTES ROUTES ROUTES:

// res.render ~ "used to render a view and sends the rendered HTML string to the client."
app.get("/", function (req, res) {
    res.render("index", { task: task });
    res.end();
});

//ADDING TASK: 
// code below: targets the user input and creates a new task with that value and afterwards pushes the added task
//    to the Tasks-List.json. It alsos validates it. 
//    After the task is added on screen and pushed to the json, the page will redirect to the first "/" route. 

app.post("/savetask", function (req, res) {

    let newTask = req.body.newtask;

    if (!newTask) {
    return res.status(404).send("No task detected, please try again.");
    }

    taskID++;



    task.push({ task: newTask, id: taskID });
    const stringyTask = JSON.stringify(task);


    fs.writeFileSync("Tasks-List.json", stringyTask, (err) => {
    if (err) throw err;
    });

    res.redirect("/");
});


// DELETING TASK: 
// code below targets a specific task on screen using .indedOf, and uses .splice to delete that task in the array/json without disrupting the rest
//      of the items in the Task-List.json. 
//      Afterwards, it parsed the entire new list and updates it. Redirects to "/" page later. 

app.post("/deletetask/:id", function (req, res) {

    const delTask = task.indexOf(
    task.find((g) => g.id === parseInt(req.params.id))
    );


    if (delTask == undefined)
    return res.status(404).send("ERROR, please try again.");


    task.splice(delTask, 1);


    const lastStringyTask = JSON.stringify(task);

    fs.writeFileSync("Tasks-List.json", lastStringyTask, (err) => {
    if (err) throw err;
    });
  
    res.redirect("/");
});


// EDIT TASK: 
// code below targets the specific task using the .indexOf, much like the delete task route above. 
//      It also validates, that said task has an Id in the array. Then it takes the edited task and adds it 
//      again as a new task in the task list per se. Simultanously it uses .splice to delete the un-edited version
//      of the task from the json file. Lastly it redirects to the "/" page. 

app.post("/edittask/:id", function (req, res) {

    const editTask = task.indexOf(
    task.find((c) => c.id === parseInt(req.params.id))
    );



    if (editTask == undefined)
    return res.status(404).send("The task with the given ID was not found.");


    let editedTask = req.body.check[editTask];


    task.push({ task: editedTask, id: taskID++ });


    task.splice(editTask, 1);

    const stringyTask = JSON.stringify(task);


    fs.writeFileSync("Tasks-List.json", stringyTask, (err) => {
    if (err) throw err;
    console.log("new task added to JSON file");
    });


    res.redirect("/");
});


// PORT LISTNEN
app.listen(port, (err) => {

    if (err) return err;
  console.log(`Listening on port ${port}`); 
});