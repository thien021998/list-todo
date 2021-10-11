<template>
  <div>
    <Tutorial />
  </div>
</template>

<script>
export default {
  layout: 'header',
  middleware: 'isLogin',
}
</script>
