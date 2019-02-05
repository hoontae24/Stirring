<template>
  <div class="upload" @click="showD">
    <div>{{ text('upload') | upperCase }}</div>

    <md-dialog class="md-dialog" :md-active.sync="showDialog">
      <md-toolbar class="md-primary" style="margin-bottom: 15px;">
        <span class="title md-title">Upload the Post.</span>
      </md-toolbar>

      <md-field>
        <label>Click here to add your images</label>
        <md-file v-model="uploadImg.name" @md-change="onFileUpload($event)" accept="image/*"/>
      </md-field>
      <div class="tags" style="display: flex; margin-left: 30px;">
        <md-chip
          class="md-primary"
          :md-ripple="false"
          style="margin: auto 5px; padding: 0 10px;"
          v-for="(tag, index) in tags"
          :key="tag"
          @click="tags.splice(index, 1)"
        >#{{ tag }}</md-chip>
        <input
          v-model="inputTag"
          @keypress.enter="addTag"
          @focusout="addTag()"
          v-show="tags.length < 5"
          style="width: 100px; height: 40px; text-align: start; padding: 0 10px;"
          placeholder="Add tags"
        >
      </div>

      <md-dialog-actions>
        <span class="error">{{error}}</span>
        <md-button class="md-primary" @click="close()">Close</md-button>
        <md-button class="md-primary" @click.native="upload()">Upload</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog-alert :md-active.sync="showAlert" md-title="Please Login to upload."/>
  </div>
</template>

<script>
import PostService from "@/services/PostService"
import { mapGetters } from "vuex"
import axios from "axios"

export default {
  computed: {
    ...mapGetters(["text", "isLogined"])
  },
  data: () => ({
    uploadImg: { name: "" },
    tags: [],
    inputTag: "",
    showDialog: false,
    showAlert: false,
    error: ""
  }),
  methods: {
    addTag() {
      if (!this.inputTag.trim()) return
      const isDup = false
      this.tags.forEach(value => {
        if (value == this.inputTag) isDup = true
      })
      if (isDup) return
      this.tags.push(this.inputTag)
      this.inputTag = ""
    },
    onFileUpload(evt) {
      this.uploadImg = evt[0]
      console.log(evt[0])
    },
    showA() {
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
      }, 1500)
    },
    showD() {
      if (!this.$store.state.userInfo.isLogined) {
        this.showA()
        this.$router.push({ name: "login" })
        return
      }
      this.showDialog = true
    },
    async upload() {
      if (!this.uploadImg.name) {
        this.error = "Select your image to upload."
        return
      }
      let formData = new FormData()
      formData.append("img", this.uploadImg)
      formData.append("tags", this.tags)
      formData.append("authorId", this.$store.state.userInfo.id)
      formData.append("authorName", this.$store.state.userInfo.name)

      const res = await PostService.post(formData)
      console.log(res.data)
      this.close()
    },
    close() {
      this.uploadImg = { name: "" }
      this.showDialog = false
      this.error = ""
      this.tags = []
      this.inputTag = ""
    }
  },
  watch: {
    showDialog() {
      if (!this.showDialog) this.close()
    }
  }
}
</script>

<style scoped>
.md-dialog {
  position: absolute;
  top: 200px;
  width: 70%;
  max-width: 800px;
  max-height: 300px;
  padding: 20px;
}
.md-dialog .title {
  font-size: 2rem;
}

.tags * {
  font-size: 1rem;
  font-weight: 200;
}

.error {
  color: red;
  margin-right: 30px;
}
</style>


