<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='scss'>
@import './scss/commom/commom.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
  border-color: #dcdfe6;
}
.el-submenu .el-menu-item {
  color: #fff!important;
}
.el-submenu .el-menu-item {
  &:hover {
    color: #409EFF!important;
  }
}
.el-menu-item.is-active {
  color: #409EFF!important;
}
</style>
