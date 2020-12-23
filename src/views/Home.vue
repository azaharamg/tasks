<template>
  <div class="home">
    <div class="navbar">
      <h1 class="navbar-title" v-if="userLogged">
        Hello {{ userLogged.name }}!
      </h1>
      <div class="navbar-progress">
        <p class="navbar-progress-title">Progress</p>
        <p>{{ totalCompletedTasks }} / {{ tasks.length }}</p>
      </div>
    </div>
    <div class="task-container">
      <header>
        <h2 class="title">Tasks</h2>
        <img class="title-img" src="@/assets/note-task.svg" alt="note-task" />
      </header>
      <form class="form" @submit.prevent="createTask">
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

        <!-- Check all tasks-->
        <div class="tasks-list" v-if="tasks.length > 0">
          <label class="check-all"
            ><input
              type="checkbox"
              @click="checkAll"
              :checked="areAllCompleted"
            />{{ checkAllMessage }}</label
          >

          <!-- Tasks list -->
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
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import auth from "@/authentication/auth";

export default {
  name: "Home",
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
    checkAll(event) {
      this.tasks.forEach((task) => (task.completed = event.target.checked));
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
    areAllCompleted() {
      return this.tasks.every((task) => task.completed);
    },
    checkAllMessage() {
      if (this.areAllCompleted) {
        return "Mark all as undone";
      }

      return "Mark all as done";
    },
    userLogged() {
      return auth.getUserLogged();
    },
  },
};
</script>

<style>
@import "../styles/variables.css";

.task-container {
  margin: 0px auto;
  max-width: 100%;
  width: 800px;
}

header {
  align-items: center;
  display: flex;
  justify-content: center;
}

.title {
  color: var(--pink);
  padding: 2rem;
}

.title-img {
  transform: rotate(30deg);
  width: 50px;
}

.form {
  align-items: center;
  color: var(--dark);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.input-add {
  background: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 10px 22px -1px rgba(0, 0, 0, 0.25);
  margin: 10px 0 20px 0;
  padding: 0.5rem;
  width: 350px;
}

.button {
  background: var(--pink);
  border: none;
  border-radius: 5px;
  box-shadow: 0px 10px 22px -1px rgba(0, 0, 0, 0.25);
  color: var(--white);
  cursor: pointer;
  font-weight: bold;
  margin: 1rem 0 0 0.5rem;
  padding: 0.5rem 1rem;
}

.tasks-list {
  background: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 10px 22px -1px rgba(0, 0, 0, 0.25);
  margin: 10px 0 20px 0;
  padding: 0.5rem;
  width: 500px;
}

.check-all {
  border-bottom: 5px solid var(--grey);
  color: var(--pink);
  font-weight: bold;
  display: block;
  padding: 1rem 0;
  width: 100%;
}

.task {
  border-bottom: 4px double var(--grey);
  display: block;
  padding: 1rem 0;
  width: 100%;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}

.date {
  font-size: small;
  margin-top: 1rem;
  text-align: end;
}

.list {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
}

.completed {
  background-color: var(--darkBlue);
  color: var(--grey);
  text-decoration: line-through;
}

.navbar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 2rem 2rem 0 0;
}

.navbar-title {
  text-transform: capitalize;
  color: var(--darkGreen);
}

.navbar-progress {
    display: flex;
    justify-content: center;
    align-items: center;
}

.navbar-progress-title {
  margin-right: 0.5rem;
}

.warning-msg {
  margin: 20px 0;
}

.btn-trash {
  background: none;
  border: none;
  cursor: pointer;
  float: right;
  font-size: 16px;
  position: relative;
}

.btn-trash .completed {
  color: var(--grey);
}
</style>