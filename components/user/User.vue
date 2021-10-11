/* eslint-disable vue/no-dupe-keys */
<template>
  <div class="container">
    <b-card bg-variant="light">
      <b-form-group
        label-cols-lg="3"
        label="Profile"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
        <b-form-group
          label="ID:"
          label-for="nested-street"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input
            id="nested-street"
            v-model="formUser.id"
            :disabled="true"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="UserName:"
          label-for="nested-city"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input
            id="nested-city"
            v-model="formUser.username"
            :disabled="disabled"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          v-if="edit === true"
          label="New Password:"
          label-for="nested-city"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input
            id="password"
            v-model="formUser.password"
            :disabled="disabled"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Create-At:"
          label-for="nested-state"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input
            id="nested-state"
            v-model="formUser.createdAt"
            :disabled="true"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Update-At:"
          label-for="nested-country"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input
            id="nested-country"
            v-model="formUser.updatedAt"
            :disabled="true"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="last-Update-Password:"
          label-for="nested-country"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input
            id="nested-country"
            v-model="formUser.lastUpdatePassword"
            :disabled="true"
          ></b-form-input>
        </b-form-group>
      </b-form-group>

      <button
        v-if="edit === false"
        class="btn btn-info align"
        type="submit"
        @click="clickEdit()"
      >
        edit
      </button>
      <button
        v-if="edit === true"
        class="btn btn-info align"
        type="submit"
        @click="updateUser()"
      >
        Save
      </button>
      <button
        v-if="edit === true"
        class="btn btn-danger align"
        type="submit"
        @click="clickCancel()"
      >
        Cancel
      </button>
    </b-card>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      edit: false,
      disabled: true,
      formUser: {
        id: '',
        password: null,
        username: '',
        createdAt: '',
        updatedAt: '',
        lastUpdatePassword: null,
      },
    }
  },

  created() {
    this.getUser()
  },

  mounted() {},

  methods: {
    clickEdit() {
      this.disabled = false
      this.edit = true
    },

    clickCancel() {
      this.edit = false
      this.disabled = true
    },

    async updateUser() {
      const newUser = {}
      newUser.username = this.formUser.username
      newUser.newPassword = this.formUser.password
      try {
        const response = await fetch(
          `https://mvn-task-manager.work/api/users/${this.$store.state.todo.userId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.$store.state.todo.token}`,
            },
            body: JSON.stringify(newUser),
          }
        )
        const data = await response.json()
        if (data.message) {
          alert(data.message)
        } else {
          localStorage.removeItem('token', data.token)
          localStorage.removeItem('UserId', data.id)
          Cookies.remove('token', data.token)
          Cookies.remove('UserId', data.id)
          alert('Thay đổi thành công. Vui lòng đăng nhập lại!')
          this.$router.push('/login')
        }
      } catch (err) {
        alert(err)
      }
      this.clickCancel()
    },

    async getUser() {
      try {
        const response = await fetch(
          `https://mvn-task-manager.work/api/users/${this.$store.state.todo.userId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${this.$store.state.todo.token}`,
            },
          }
        )
        const data = await response.json()
        if (data.message) {
          alert(data.message)
        } else {
          this.formUser = { ...this.formUser, ...data }
        }
      } catch (err) {
        alert(err)
      }
    },
  },
}
</script>
