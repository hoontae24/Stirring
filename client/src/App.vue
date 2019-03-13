<template>
  <div class="app">
    <Header></Header>
    <router-view class="main-content"/>
    <SnackAlert :duration="2000" :message="message" :showSnackAlert="alert"/>
  </div>
</template>

<script>
import Header from "@/components/Header"
import SnackAlert from "@/components/SnackAlert"
import { EventBus } from "@/mixins/EventBus"

export default {
  components: {
    Header,
    SnackAlert
  },
  data() {
    return {
      message: '',
      alert: false
    }
  },
  created() {
    EventBus.$on("showMessage", message => {
      this.message = message
      this.alert = true
      setTimeout(() => {
        this.alert = false
        this.message = ''
      }, 2000)
    })
  }
}
</script>

<style>
* {
  font-family: "Nunito", "Noto Sans KR", sans-serif;
  font-weight: 700;
}
.main-content {
  margin: 0 auto;
  max-width: 1920px;
}
</style>
