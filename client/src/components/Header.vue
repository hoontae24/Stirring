<template>
  <div id="header">
    <router-link to="/">
      <img id="header-logo" alt="Vue logo" src="../assets/logo.png">
    </router-link>
    <div id="nav">
      <router-link class="nav-item" to="/">Home</router-link>
      <router-link class="nav-item" to="/about">About</router-link>
    </div>
    <div id="menu">
      <router-link to="/login">{{ login }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data:()=>({
    login: 'Login'
  })
}
</script>

<style lang="css" scoped>
#header {
  font-family: 'Nunito', sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 10px;
  border-bottom: 1px solid lightgray;
  display: flex;
}

#header-logo {
  width: 150px;
  height: 40.5px;
}

#nav {
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav-item {
  margin: 0 10px 0 10px;
}



#header a {
  color: #2c3e50;
}

#header a.router-link-exact-active {
  color: #42b983;
}
</style>
