<template>
  <div class="task-list" id="app">
    <header>
      <h1 class="title">Tasks</h1>
      <img class="title-img" src="@/assets/note-task.svg" alt="note-task" />
    </header>
    <form class="form" @submit.prevent="createTask">
      <div class="progress-bar">
        <h3 class="title-progress">Progress</h3>
        <p>{{ totalCompletedTasks }} / {{ tasks.length }}</p>
      </div>
      <div>
        <input
          class="input-add"
          type="text"
          id="task"
          v-model="newTask"
          placeholder="Create a new task ..."
        />
        <input class="button" type="submit" value="+" />
      </div>
      <p class="warning-msg" v-if="error !== ''">{{ error }}</p>
      <ul class="list">
        <li
          class="task"
          :class="{ completed: task.completed }"
          v-for="(task, i) in tasks"
          :key="'task' + i"
        >
          <label :for="task.id" @click="completedTask(task.id)">
            <input
              type="checkbox"
              name="task' + i"
              :id="task.id"
              value="task.text"
              :checked="task.completed"
            />
          </label>
          <span>{{ task.text }}</span>
          <button
            :class="{ completed: task.completed }"
            class="btn-trash"
            @click.prevent="handleDelete(task.id)"
          >
            <ion-icon name="trash-outline"></ion-icon>
          </button>
          <p class="date">Created: {{ new Date().toLocaleDateString() }}</p>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "TodoList",
  data: () => ({
    newTask: "",
    tasks: [],
    error: "",
  }),
  methods: {
    createTask() {
      this.error = "";

      let task = {
        id: uuidv4(),
        text: this.newTask,
        completed: false,
      };
      if (Object.values(task.text).length > 0) {
        this.tasks.push(task);
        this.newTask = "";
      } else {
        this.error = "Sorry, you didn't write any task. Try again!";
      }
    },
    completedTask(taskId) {
      this.tasks.find((task) => {
        if (task.id === taskId) {
          task.completed = !task.completed;
        }
      });
    },
    handleDelete(taskId) {
      const indexToRemove = this.tasks.findIndex((task) => task.id === taskId);
      if (indexToRemove !== -1) {
        this.tasks.splice(indexToRemove, 1);
      }
    },
  },
  computed: {
    totalCompletedTasks() {
      if (this.tasks.length === 0) {
        return 0;
      } else {
        const completedTasks = this.tasks.filter(
          (task) => task.completed === true
        );
        return completedTasks.length;
      }
    },
  },
};
</script>

<style>
@import "../styles/variables.css";

.task-list {
  width: 800px;
  max-width: 100%;
  margin: 0px auto;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  color: var(--pink);
  padding: 2rem;
}

.title-img {
  width: 50px;
  transform: rotate(30deg);
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--dark);
}

.input-add,
.task {
  background: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  width: 40vw;
  box-shadow: 0px 10px 22px -1px rgba(0, 0, 0, 0.25);
  margin: 10px 0 20px 0;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}

.date {
  text-align: end;
  font-size: small;
  margin-top: 1rem;
}

.button {
  background: var(--pink);
  color: var(--white);
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  box-shadow: 0px 10px 22px -1px rgba(0, 0, 0, 0.25);
  margin-top: 10px;
  cursor: pointer;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
}

.task {
  width: 30vw;
  margin: 5px 0 5px 0;
}

.completed {
  text-decoration: line-through;
  color: var(--grey);
  background-color: var(--darkBlue);
}

.progress-bar {
  display: flex;
  align-items: center;
  align-self: flex-end;
  margin: 20px;
}

.title-progress {
  margin-right: 0.5rem;
}

.warning-msg {
  margin: 20px 0;
}

.btn-trash {
  border: none;
  position: relative;
  background: none;
  float: right;
  font-size: 16px;
  cursor: pointer;
}

.btn-trash .completed {
  color: var(--grey);
}
</style>