import express from "express";
import bodyParser from "body-parser";
import { getDate, getToday } from "./date.js";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

let tasks = [];
let workTasks = [];



app.get("/", (req, res) => {
    let day = getDate();
    res.render("index.ejs", {listTitle: day, dayTasks: tasks})
});

app.get("/work", (req, res) =>{
    res.render("work.ejs", {workTasks: workTasks})
});

app.post("/submit", (req, res) => {
const newTask = req.body.task
const redirectURL = req.body.redirect;

  if(redirectURL === "/work"){
    workTasks.push(newTask);
  } else {
    tasks.push(newTask)
  }

  res.redirect(redirectURL);

});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})



/* worked, but there is an error that VS picks up despite it working.. testing something different



     <li>
                    <!--onchange="toggleTask(this, <%= index %>)">  needs to go into the below line for it to work-->
                    <input id="checkBox<%= index %>" type="checkbox" value="false" onchange="toggleTask(this, <%= index %>)"> 
                    <label id="newTask<%= index %>" for="checkBox<%= index %>"><%= task %></label>
                    <br>
                    <hr>
                </li>
            <% }) %>
        </ul>



*/