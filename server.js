const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql2');
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'projet'
});

//Récupérer la liste de toutes les tâches
app.get('/allTasks', (req, res) => {
  connection.query(
    'SELECT * FROM `tasks` ORDER BY id',
    function (err, results, fields) {
      // results contains rows returned by server
      // fields contains extra meta data about results, if available
      res.send(results)
    }
  );
})

//Récupérer la liste de toutes les tâches faites
app.get('/done', (req, res) => {
  connection.query(
    'SELECT * FROM `tasks` WHERE isDone="true"',
    function (err, results, fields) {
      res.send(results)
    }
  );
})

//Récupérer la liste de toutes les tâches non faites
app.get('/undone', (req, res) => {
  connection.query(
    'SELECT * FROM `tasks` WHERE isDone="false"',
    function (err, results, fields) {
      res.send(results)
    }
  );
})

//Ajouter une nouvelle tâche
app.post('/addTask', (req, res) => {
  task = req.body
  taskName = task.taskName
  isDone = task.isDone
  dueDate = task.dueDate
  connection.query(
    'INSERT INTO `tasks`(`taskName`, `isDone`, `dueDate`) VALUES (?,?,?)', [taskName, isDone, dueDate],
    function (err, results, fields) {
      res.json(results)
    }
  );
})

//Marquer une tâche à done ou pas (changer la valeur de isDone à true or false 
app.post('/updateStatus/:id', (req, res) => {
  indexTaskToupdate = req.params.id
  task = req.body
  statusIsDone = task.isDone
  console.log(task)
  connection.query(
    'UPDATE `tasks` SET `isDone`=? WHERE id=?', [statusIsDone, indexTaskToupdate],
    function (err, results, fields) {
      res.json(results)
      if (results.affectedRows === 0) {

        res.status(404).json({
          statuss: 'fail',
          message: 'No stak object with ID' + indexTaskToDelete + ' is found to update'
        })

      }
    }
  );
})

//Modifier une tâche existante (modifier son nom)
app.post('/updateTaskName/:id', (req, res) => {
  indexTaskToUpdate = req.params.id
  task = req.body
  let name = task.taskName
  console.log(task)
  connection.query(
    'UPDATE `tasks` SET `taskName`=? WHERE id=?', [name, indexTaskToUpdate],
    function (err, results, fields) {
      res.json(results)
      if (results.affectedRows === 0) {

        res.status(404).json({
          statuss: 'fail',
          message: 'No stak object with ID' + indexTaskToUpdate + ' is found to update'
        })

      }
    }
  );
})

//supprimer une tâche (bonus)
app.delete('/deleteTask/:id', (req, res) => {
  indexTaskToDelete = req.params.id
  connection.query(
    'DELETE FROM `tasks` WHERE id=?', [indexTaskToDelete],
    function (err, results, fields) {
      res.json(results)
      if (results.affectedRows === 0) {

        res.status(404).json({
          statuss: 'fail',
          message: 'No stak object with ID' + indexTaskToDelete + ' is found to delete'
        })

      }
    }
  );
})


app.listen(port, () => {
  console.log("server is running")
})