<template>
  <div class="container center">
    <ul>
      <li><nuxt-link to="/todo">Task</nuxt-link></li>
      <li><nuxt-link to="/category">Category</nuxt-link></li>
      <li><nuxt-link to="/profile">Profile</nuxt-link></li>
      <li><nuxt-link to="login">Logout</nuxt-link></li>
    </ul>
  </div>
</template>

<style scoped>
.text-center{
  justify-content: center;
}

ul{
  display: inline-block;
  list-style-type:none;
}

li{
  margin: 20px;
  float: left;
}
</style>
