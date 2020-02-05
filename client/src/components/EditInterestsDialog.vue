<template>
  <div class="edit-interests-dialog">
    <md-dialog
      :md-opened="open"
      :md-closed="close"
      :md-clicked-outside="close"
      class="container"
      :md-active.sync="showDialog"
    >
      <div class="wrapper">
        <div class="item title">
          <span>{{text('editInterests')}}</span>
        </div>
        <div class="item">
          <div class="interests" style>
            <div class="interest">
              <span>#1</span>
              <input class="chip" v-model="interests[0]">
            </div>
            <div class="interest">
              <span>#2</span>
              <input class="chip" v-model="interests[1]">
            </div>
            <div class="interest">
              <span>#3</span>
              <input class="chip" v-model="interests[2]">
            </div>
            <div class="interest">
              <span>#4</span>
              <input class="chip" v-model="interests[3]">
            </div>
            <div class="interest">
              <span>#5</span>
              <input class="chip" v-model="interests[4]">
            </div>
          </div>
        </div>
        <div class="item action">
          <div>
            <span style="color: red; font-size:0.8rem;">{{text(error)}}</span>
          </div>
          <div class="btn">
            <span style="color: firebrick;" @click="close()">{{text('close')}}</span>
          </div>
          <div class="btn">
            <span style="color: steelblue;" @click="submit()">{{text('edit')}}</span>
          </div>
        </div>
      </div>
    </md-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { EventBus } from "@/mixins/EventBus"
import UserService from "@/services/UserService"

export default {
  computed: { ...mapGetters(["text"]) },
  props: ["user"],
  data() {
    return {
      showDialog: false,
      interests: [],
      error: ""
    }
  },
  methods: {
    open() {
      this.showDialog = true
      this.interests = this.user.interests.slice(0, 5)
    },
    close() {
      this.showDialog = false
      this.interests = []
      this.error = ""
    },
    submit() {
      const length = this.interests.length
      let isDup = false
      first: for (let i = 0; i < length - 1; i++)
        for (let j = i + 1; j < length; j++)
          if (
            this.interests[i] === this.interests[j] &&
            this.interests !== ""
          ) {
            isDup = true
            break first
          }

      if (isDup) {
        this.error = "interestsError"
        return
      }
      this.interests = this.interests.filter(item => item)
      UserService.updateInterests({
        userId: this.user._id,
        interests: this.interests
      }).then(res => {
        EventBus.$emit("loadUser")
        this.close()
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 500px;
  height: 350px;
  padding: 20px;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item {
  margin: 20px;
  font-size: 1rem;
}

.title {
  margin: 20px auto;
  font-size: 1.3rem;
}
.name > * {
  margin: 0px 10px;
}

.item > input {
  font-size: 1rem;
  /* outline: none; */
  border: 0;
  border-bottom: 1px dashed black;
}

.interests {
  /* vertical-align: middle; */
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.interest {
  width: 100%;
  display: flex;
  justify-content: center;
}
.interest > span {
  margin: auto 5px;
}

.interest > input {
  width: 80%;
  margin: 5px;
}

.chip {
  margin: 0 5px;
  color: steelblue;
}
.action {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.action > .btn {
  margin: 0 5px;
  padding: 5px;
}
.btn:hover {
  cursor: pointer;
  background-color: lightgray;
}

@media screen and (max-width: 800px) {
  .container {
    width: 95%;
    padding: 10px;

    min-height: 350px;
    max-height: 350px;
  }
}
</style>