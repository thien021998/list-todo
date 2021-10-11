const url = 'https://mvn-task-manager.work/api/tasks'
export const state = () => ({
  todoItems: [],
  token: null,
  categories: [],
  userId: null,
  user: null,
})

export const getters = {
  todoItems(state) {
    return state.todoItems
  },

  token(state) {
    return state.token
  },

  categories(state) {
    return state.categories
  },

  user(state) {
    return state.user
  }
}

export const mutations = {
  task(state, data) {
    state.todoItems = data
  },

  categories(state, data) {
    state.categories = data
  },

  user(state, data) {
    state.user = data
  },

  add(state, data) {
    state.todoItems = [data, ...state.todoItems]
  },

  delete(state, data) {
    state.todoItems = state.todoItems.filter(todo => todo.id !== data)
  },

  update(state, data) {
    state.todoItems = state.todoItems.map(todo => {
      if (todo.id === data.id) {
        todo = { ...todo, ...data }
      }
      return todo
    })
  },

  updateToken(state, data) {
    state.token = data
  },

  updateUserId(state, data) {
    state.userId = data
  },

  clearStore(state) {
    state.todoItems = []
    state.token  = null
    state.categories = []
    state.userId = null
    state.user = null
  }
}

export const actions = {
  async getCategories(vuexContext) {
    try {
      const response = await fetch('https://mvn-task-manager.work/api/categories', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${vuexContext.state.token}`,
        },
      })
      const data = await response.json()
      if (data.message) {
        alert(data.message)
      } else {
        vuexContext.commit('categories', data.items)
      }
    } catch (err) {
      alert(err)
    }
  },

  async getTodoItems(vuexContext) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${vuexContext.state.token}`,
        },
      })
      const data = await response.json()
      if (data.message) {
        alert(data.message)
      } else {
        vuexContext.commit('task', data.items)
      }
    } catch (err) {
      alert(err)
    }
  },

  async addItem(vuexContext, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${vuexContext.state.token}`,
        },
        body: JSON.stringify(data),
      }
      )
      const todo = await response.json()
      if (todo.id) {
        vuexContext.commit('add', todo)
      } else {
        alert(todo.message)
      }
    } catch (err) {
      alert(err)
    }
  },

  async deleteItem(vuexContext, id) {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${vuexContext.state.token}`,
      },
    })
    try {
      const item = await response.json()
      console.log(item)
    } catch {
      vuexContext.commit('delete', id)
    }
  },

  async updateItem(vuexContext, data) {
    try {
      const response = await fetch(`${url}/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${vuexContext.state.token}`,
        },
        body: JSON.stringify(data.task),
      })
      const item = await response.json()
      if (item.id) {
        vuexContext.commit('update', item)
      } else {
        alert(item.message)
      }
    } catch (err) {
      alert(err)
    }
  },

  isAuth(vuexContext, data) {
    let isToken, isUserId
    if (data) {
      if (!data.headers.cookie) return false
      isToken = data.headers.cookie.split(';').find(item => item.trim().startsWith("token=")).split('=')[1]
      isUserId = data.headers.cookie.split(';').find(item => item.trim().startsWith("UserId=")).split('=')[1]
    } else {
      isToken = localStorage.getItem('token')
      isUserId = localStorage.getItem('UserId')
    }
    if (isToken) {
      vuexContext.commit('updateToken', isToken)
      vuexContext.commit('updateUserId', isUserId)
    } else return false
  },

  cleanStore(vuexContext) {
    vuexContext.commit('clearStore')
  }
}
