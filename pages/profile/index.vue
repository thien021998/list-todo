<template>
  <div>
    <User :testg="item"/>
  </div>
</template>

<script>
import User from '~/components/user/User.vue'
export default {
  components :{
    User
  },
  layout: 'header',
  middleware: 'isLogin',
  data() {
    return {
      item : {
        name : "testPosst",
        age : 34
      }
    }
  },
}
</script>
