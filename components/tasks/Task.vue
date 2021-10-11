<template>
  <div class="container">
    <button class="btn btn-warning btn-home" type="submit" @click="home()">
      HOME
    </button>
    <h1>Task List</h1>
    <!-- Form create -->
    <div class="create">
      <button
        v-if="createTaskForm === false || id"
        class="btn btn-primary btn-create"
        type="submit"
        @click="formInput()"
      >
        Create
      </button>
    </div>
    <div v-if="createTaskForm === true" class="form-create">
      <b-card bg-variant="light">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            label-cols-lg="3"
            label="Task"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label="Title :"
              label-for="nested-street"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="nested-street"
                v-model="formTask.title"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              v-if="id"
              label="Status :"
              label-for="nested-street"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-radio-group
                v-model="formTask.status"
                :options="optionSelect"
                class="mb-3"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
              ></b-form-radio-group>
            </b-form-group>

            <b-form-group
              label="Catrgory:"
              label-for="nested-country"
              label-cols-sm="3"
              label-align-sm="right"
              required
            >
              <b-form-checkbox-group
                v-model="formTask.categoryIds"
                :options="category"
                class="mb-3"
                value-field="id"
                text-field="name"
              ></b-form-checkbox-group>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Cancel</b-button>
          </b-form-group>
        </b-form>
      </b-card>
    </div>
    <div class="table-wrapper">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Index</th>
            <th>Content</th>
            <th>Status</th>
            <th>Create-date</th>
            <th>Update-date</th>
            <th>Categories</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in formatItem" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.createdAt[0] }}</td>
            <td>{{ item.updatedAt[0] }}</td>
            <td>
              <ul v-for="cate in item.categories" :key="cate.id">
                <li>{{ cate.name }}</li>
              </ul>
            </td>
            <td>
              <button
                class="btn btn-warning"
                type="submit"
                @click="editForm(item.id)"
              >
                edit
              </button>
              <button
                class="btn btn-primary"
                type="submit"
                @click="deleteItem(item.id)"
              >
                delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      createTaskForm: false,
      category: [],
      id: '',
      optionSelect: [
        { item: 'IN_PROGRESS', name: 'IN_PROGRESS' },
        { item: 'COMPLETED', name: 'COMPLETED' },
      ],
      formTask: {
        status: '',
        title: '',
        categoryIds: [],
      },
    }
  },

  computed: {
    formatItem() {
      return this.$store.getters[`todo/todoItems`].map((item) => {
        const date = {
          ...item,
          createdAt: item.createdAt.split('T', 1),
          updatedAt: item.updatedAt.split('T', 1),
        }
        return date
      })
    },
  },

  mounted() {
    this.setCategory()
  },

  methods: {
    setCategory() {
      this.$store.state.todo.categories.forEach((element) => {
        const item = {}
        item.id = element.id
        item.name = element.name
        this.category.push(item)
      })
    },

    resetForm() {
      this.formTask.status = ''
      this.formTask.title = ''
      this.formTask.categoryIds = []
    },

    onSubmit(event) {
      event.preventDefault()
      const data = {}
      if (this.id) {
        const task = { ...this.formTask }
        data.task = { ...task }
        data.id = this.id
        // eslint-disable-next-line no-console
        console.log('formTask: ', data.task)
        this.$store.dispatch('todo/updateItem', data)
      } else {
        data.title = this.formTask.title
        data.categoryIds = this.formTask.categoryIds
        this.$store.dispatch('todo/addItem', data)
      }
      this.createTaskForm = false
      this.id = false
      this.resetForm()
    },

    onReset(event) {
      event.preventDefault()
      this.createTaskForm = false
      this.id = false
      this.resetForm()
    },

    home() {
      this.$router.push('/')
    },

    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('UserId')
      Cookies.remove('token')
      Cookies.remove('UserId')
      this.$router.push('/login')
    },

    formInput() {
      this.createTaskForm = true
      this.id = false
      this.resetForm()
    },

    editForm(id) {
      this.resetForm()
      for (let i = 0; i < this.$store.state.todo.todoItems.length; i++) {
        if (this.$store.state.todo.todoItems[i].id === id) {
          this.formTask.status = this.$store.state.todo.todoItems[i].status
          this.formTask.title = this.$store.state.todo.todoItems[i].title
          for (
            let j = 0;
            j < this.$store.state.todo.todoItems[i].categories.length;
            j++
          ) {
            this.formTask.categoryIds.push(
              this.$store.state.todo.todoItems[i].categories[j].id
            )
          }
        }
      }
      this.id = id
      this.createTaskForm = true
    },

    deleteItem(id) {
      this.$store.dispatch('todo/deleteItem', id)
    },
  },
}
</script>

<style >
.container {
  text-align: center;
}

.form-create {
  margin-bottom: 20px;
}

.table {
  border-collapse: collapse;
  border: 1px solid fff;
}

.table-wrapper {
  max-height: 70vh;
  overflow-y: auto;
  position: relative;
}

.table-wrapper th {
  top: 0;
  position: sticky;
  background: #fff;
}

.btn {
  margin: 0 10px;
}

.btn-create {
  width: 80px;
  margin: 20px;
}

.btn-home {
  margin: 30px;
  width: 80px;
  margin-right: 90%;
  float: right;
}

.create,
.create--form {
  margin: 10px 0;
}
</style>
