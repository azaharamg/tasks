<template>
  <form @submit.prevent="createTask">
    <label class="label" for="task">New task:</label>
    <input type="text" id="task" v-model="newTask" />
    <input type="submit" value="Create task" />
    <ul>
      <li
        :class="{ completed: task.completed }"
        v-for="(task, i) in tasks"
        :key="'task' + i"
        @click="completedTask(task.id)"
      >
        <input
          type="checkbox"
          name="task' + i"
          id="task' + i"
          value="task.text"
          :checked="task.completed"
        />
        <label for="task' + i">{{ task.text }}</label>
      </li>
    </ul>
  </form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "TodoList",
  data: () => ({
    newTask: "",
    tasks: [],
  }),
  methods: {
    createTask() {
      let task = {
        id: uuidv4(),
        text: this.newTask,
        completed: false,
      };
      this.tasks.push(task);
      this.newTask = "";
    },
    completedTask(taskId) {
      this.tasks.find((task) => {
        if (task.id === taskId) {
          task.completed = !task.completed;
        }
      });
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: grey;
}
</style>