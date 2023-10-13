const express = require('express')
const app = express()
const port = 3001
app.use(express.json())

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// faire un nom install de ejs
// Avoir un dossier nommer views pour i mettre ces fichier html

let tasks = [{ taskName: "Natation", isDone: false, dueDate: "2023-10-10" }, { taskName: "Salle de sport", isDone: true, dueDate: "2023-10-05" }, { taskName: "Cours de danse", isDone: false, dueDate: "2023-10-12" }, { taskName: "cours de piano", isDone: true, dueDate: "2023-10-07" }]

let task = { taskName: "visite de musée", isDone: false, dueDate: "2023-10-17" }

//fonction pour récupérer la liste de toutes les tâches non faites
function unDoneTasks(tabTasks) {
    let tab_unDoneTasks = []
    tabTasks.filter(task => {
        if (!task.isDone) {
            tab_unDoneTasks.push(task)
        }
    })
    return tab_unDoneTasks
}

//fonction pour ajouter une nouvelle tâche
function addTask(tab_tasks, task) {
    tab_tasks.push(task)
    return tab_tasks
}

//fonction qui marquer une tâche à done
function updateStatusTask(indexTaskToUpdate, tabTasks) {
    tabTasks[indexTaskToUpdate].isDone = true
    return tabTasks
}

//fonction pour modifier une tâche existante
function updateTask(indexTaskToUpdate, tabTasks, keyToUpdate, newValue) {
    console.log(tabTasks[indexTaskToUpdate][keyToUpdate])
    tabTasks[indexTaskToUpdate][keyToUpdate] = newValue
    return tabTasks
}

//fonction pour supprimer une tâche
function deleteTask(indexTaskToDelete, tabTasks) {
    if (indexTaskToDelete !== -1) {
        tabTasks.splice(indexTaskToDelete, 1)
        return tabTasks
    }
}

app.get('/', (req, res) => {
    res.render("test.html", {
        name: "tata"
    });
})

//récupérer la liste de toutes les tâches

app.get('/tasksAll', (req, res) => {
    let taskList = "<h1>Hello</h1><p>All tasks</p>"
    for (i in tasks) {
        taskList += `<li>${tasks[i].taskName}</li>`
    }
    console.log(taskList)
    res.send(taskList)
})

//récupérer la liste de toutes les tâches non faites
app.get('/undone', (req, res) => {
    //res.send('<h1>Hello</h1>')
    res.json(unDoneTasks(tasks))

})

//Ajouter une nouvelle tâche
app.post('/addTask', (req, res) => {
    let tache = req.body
    res.send(addTask(tasks, tache))
})

//Marquer une tâche à done
app.post('/updateItTodone', (req, res) => {
    let index = req.body.id
    res.json(updateStatusTask(index, tasks))
})

//Modifier une tâche existante
app.post('/update', (req, res) => {
    let keyToUpdate = Object.keys(req.body)[1]
    console.log(keyToUpdate)
    let valueToUpdate = Object.values(req.body)[1]
    console.log(valueToUpdate)
    res.send(updateTask(req.body.id, tasks, keyToUpdate, valueToUpdate))
})

//supprimer une tâche
app.post('/delete', (req, res) => {
    let index = req.body.id
    res.send(deleteTask(index, tasks))
})

app.listen(port, () => {

})