<template>
  <div class="container">
    <button class="btn btn-warning btn-home" type="submit" @click="home()">
      HOME
    </button>
    <h1>List Categories</h1>
    <div class="table-wrapper">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Index</th>
            <th>Content</th>
            <th>Create-date</th>
            <th>Update-date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in formatItem" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.createdAt[0] }}</td>
            <td>{{ item.updatedAt[0] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    formatItem() {
      return this.$store.getters[`todo/categories`].map((item) => {
        const date = {
          ...item,
          createdAt: item.createdAt.split('T', 1),
          updatedAt: item.updatedAt.split('T', 1),
        }
        return date
      })
    },
  },

  methods: {
    home() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.container {
  text-align: center;
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
}

.create,
.create--form {
  margin: 10px 0;
}
</style>
