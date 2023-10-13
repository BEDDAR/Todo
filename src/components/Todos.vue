<template>
    <body>
        <header>
            <H1>To do list</H1>
        </header>
        <form action="">

            <input class="todo-input" type="text" placeholder="Ajouter une nouvelle tâche" v-model="newTask" ref="name"
                autofocus>
            <button title="Ajouter une tâche" class="todo-button" @click="addTask"><i
                    class="fa-solid fa-square-plus"></i></button>

            <select class="filter-todo" v-model="Selected">
                <option>Toutes</option>
                <option>Faites</option>
                <option>À faire</option>
            </select>

        </form>
        <div class="todo-container">
            <ul class="todo-list">
                <div class="todo" v-for="(task, i) in filteredTodos" :key="i">
                    <li class="todo-item" :class="{ completed: task.isDone === 'true' }">{{ task.taskName }}</li>
                    <input class="complete-input" type="checkbox" v-model="task.isDone" true-value='true'
                        false-value='false' @click="updateTask(task.id)">
                    <button class="trash-btn" title="Supprimer la tâche" @click="deleteTask(task.id)"><i
                            class="fa-solid fa-trash-can"></i></button>

                </div>
            </ul>
        </div>
    </body>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            tasks: [],
            doneTasks: [],
            unDoneTasks: [],
            newTask: "",
            editing: null,
            counter: 0,
            valeur: '',
            Selected: 'Toutes'
        }
    },

    async created() {
        //Récupérer la liste de toutes les tâches
        this.tasks = await ((axios.get('http://localhost:3000/allTasks')).then(response => response.data))
        //Récupérer la liste de toutes les tâches faites
        this.doneTasks = await (axios.get('http://localhost:3000/done').then(response => response.data))
        //Récupérer la liste de toutes les tâches non faites
        this.unDoneTasks = await (axios.get('http://localhost:3000/undone').then(response => response.data))
    },

    async updated() {
        this.tasks = await ((axios.get('http://localhost:3000/allTasks')).then(response => response.data))
        this.doneTasks = await (axios.get('http://localhost:3000/done').then(response => response.data))
        this.unDoneTasks = await (axios.get('http://localhost:3000/undone').then(response => response.data))
    },
    methods: {
        //Ajouter une nouvelle tâche
        async addTask() {
            await axios.post('http://localhost:3000/addTask', { taskName: this.newTask, isDone: "false", dueDate: "2023-10-15" }).then(response => { console.log(response) });
            this.newTask = "";
            this.$refs.name.focus();
        },
        //Supprimer une tâche
        async deleteTask(index) {
            await axios.delete(`http://localhost:3000/deleteTask/${index}`)
        },
        //Mettre à jour une tâche à true ou false
        updateTask(index) {
            this.tasks.forEach(task => {
                if (task.id === index) {
                    if (task.isDone === 'true') {
                        this.valeur = 'false'
                    }
                    else {
                        this.valeur = 'true'
                    }
                    axios.post(`http://localhost:3000/updateStatus/${index}`, { isDone: this.valeur });

                }
            })
        },

    },
    computed: {
        //Envoyer la liste des tâches selon le filtre
        filteredTodos() {
            if (this.Selected === 'À faire') { return this.unDoneTasks }
            else if (this.Selected === 'Faites') { return this.doneTasks }
            return this.tasks
        }
    },
}
</script>

<style src="./Style.css"></style>