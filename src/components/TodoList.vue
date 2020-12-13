<template>
  <form @submit.prevent="createTask">
    <label class="label" for="task">New task:</label>
    <input type="text" id="task" v-model="newTask" />
    {{ newTask }}
    <input type="submit" value="Create task" />
  </form>
</template>

<script>
export default {
  name: "TodoList",
  data: () => ({
    newTask: "",
    tasks: []
  }),
  methods: {
    createTask(){
      let task = {
        text: this.newTask,
        completed: false
      }
      this.tasks.push(task)
      this.newTask = ""
    }
  }
};
</script>

<style scoped>
</style>