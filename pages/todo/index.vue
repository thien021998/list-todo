<template>
  <div>
    <Task />
  </div>
</template>
<script>
import Task from '@/components/tasks/Task.vue'
export default {
  components: {
    Task,
  },
  layout: 'header',
  middleware: 'isLogin',

  created() {
    this.$store.dispatch('todo/getTodoItems')
    this.$store.dispatch('todo/getCategories')
  },


}
</script>
