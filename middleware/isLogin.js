export default function (context) {
  context.store.dispatch('todo/isAuth', context.req)
  if (!context.store.state.todo.token) {
    context.redirect('/login')
  }
}
