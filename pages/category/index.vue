<template>
  <div>
    <TodoList/>
  </div>
</template>

<script>
import TodoList from '@/components/todoList/TodoList.vue'
export default {
  components :{
    TodoList
  },
  layout: 'header',
  middleware: 'isLogin',

  created() {
    this.$store.dispatch('todo/getCategories')
  },
}
</script>
