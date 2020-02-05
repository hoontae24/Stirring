<template>
  <div class="app">
    <Header/>
    <router-view class="main-content"/>
    <Footer/>
    <SnackAlert :duration="2000" :message="message" :showSnackAlert="alert"/>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SnackAlert from "@/components/SnackAlert"
import { EventBus } from "@/mixins/EventBus"

export default {
  components: {
    Header,
    Footer,
    SnackAlert
  },
  data() {
    return {
      message: "",
      alert: false
    }
  },
  created() {
    EventBus.$on("showMessage", (message, time = 2000, cb) => {
      this.message = message
      this.alert = true
      setTimeout(() => {
        this.alert = false
        this.message = ""
        if (cb) cb()
      }, time)
    })
  }
}
</script>

<style>
.app {
  font-family: "Nunito", "Malgun Gothic", sans-serif;
  font-weight: 500;
}
.main-content {
  margin: 0 auto;
  max-width: 1920px;
  min-height: calc(100vh - 87px - 75px);
}

.fs10 {
  font-size: 1rem;
}
.fs15 {
  font-size: 1.5rem;
}
.fs20 {
  font-size: 2rem;
}
.fs25 {
  font-size: 2.5rem;
}
.fs30 {
  font-size: 3rem;
}
.fw100 {
  font-weight: 100;
}
.fw200 {
  font-weight: 200;
}
.fw300 {
  font-weight: 300;
}
.fw400 {
  font-weight: 400;
}
.fw500 {
  font-weight: 500;
}
.fw600 {
  font-weight: 600;
}
.fw700 {
  font-weight: 700;
}
</style>
