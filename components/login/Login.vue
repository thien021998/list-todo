/* eslint-disable no-console */
<template>
  <div class="form">
    <div class="align">
      Form Login
      <form action="">
        <label class="form-label text-start d-block">Username:</label>
        <input
          v-model="username"
          class="form-control"
          type="text"
          placeholder="Username"
        />
        <hr />
        <label class="form-label text-start d-block">Password:</label>
        <input
          v-model="password"
          class="form-control"
          type="password"
          placeholder="Password"
        />
        <hr />
      </form>
      <input
        class="btn btn-info align"
        type="submit"
        value="Login"
        @click="login()"
      />
      <input
        class="btn btn-info align"
        type="submit"
        value="SignUp"
        @click="signUp()"
      />
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },

  methods: {
    async login() {
      const user = {}
      user.username = this.username
      user.password = this.password
      const response = await fetch('https://mvn-task-manager.work/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await response.json()
      if (data.id) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('UserId', data.id)
        Cookies.set('token', data.token)
        Cookies.set('UserId', data.id)
        this.$router.push('/')
      } else {
        alert(data.message)
      }
    },

    async signUp() {
      const user = {}
      user.username = this.username
      user.password = this.password
      const response = await fetch(
        'https://mvn-task-manager.work/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      )
      const data = await response.json()
      if (data.id) {
        alert('đăng ký thành công, hãy đăng nhập')
      } else {
        alert(data.message)
      }
    },
  },
}
</script>

<style scoped>
.form {
  width: 30%;
  margin: auto;
  border: 2px solid gray;
  margin-top: 10%;
}

.align {
  margin: 15px;
}
</style>
