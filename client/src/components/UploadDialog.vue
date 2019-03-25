<template>
  <div class="upload">
    <md-dialog class="md-dialog" :md-active.sync="showDialog">
      <span class="title" style>{{text('uploadTitle')}}</span>

      <div class="area" @click="$refs.file.click()">
        <div class="cover guide" v-if="!previewImg"></div>
        <div
          v-else
          class="cover"
          :style="previewImg ? `background-image: url(${previewImg});` : `background-image: url('../assets/plus.png');`"
        ></div>
      </div>
      <input id="file" ref="file" type="file" accept="image/*" @change="onFileUpload($event)">
      <!-- <md-field style="margin: 15px; width:90%;">
        <label>Click here to add your images</label>
        <md-file v-model="uploadImg.name" @md-change="onFileUpload($event)" accept="image/*"/>
      </md-field>-->
      <div class="tags" style>
        <span
          class="tag"
          :md-ripple="false"
          v-for="(tag, index) in tags"
          :key="tag"
          @click="tags.splice(index, 1)"
        >#{{ tag | upperCase }}</span>
        <input
          class="input"
          v-model="inputTag"
          @keypress.enter="addTag"
          @focusout="addTag()"
          v-show="tags.length < 5"
          :placeholder="'#'+text('tags')"
        >
      </div>

      <md-dialog-actions>
        <span class="error">{{text(error)}}</span>
        <md-button class="md-accent" @click="close()">{{text('close')}}</md-button>
        <md-button class="md-primary" @click.native="upload()">{{text('upload')}}</md-button>
      </md-dialog-actions>
    </md-dialog>

    <SnackAlert :message="'Login first.'" :showSnackAlert="showAlert" :duration="3000"/>
  </div>
</template>

<script>
import PostService from "@/services/PostService"
import { mapGetters } from "vuex"
import SnackAlert from "@/components/SnackAlert"

export default {
  components: { SnackAlert },
  computed: {
    ...mapGetters(["text", "isLogined"])
  },
  data: () => ({
    uploadImg: null,
    previewImg: null,
    tags: [],
    inputTag: "",
    showDialog: false,
    showAlert: false,
    error: ""
  }),
  methods: {
    addTag() {
      if (!this.inputTag.trim()) return
      let isDup = false
      this.tags.forEach(value => {
        if (value == this.inputTag) isDup = true
      })
      if (isDup) return
      this.tags.push(this.inputTag)
      this.inputTag = ""
    },
    onFileUpload(evt) {
      const file = evt.target.files[0]
      this.uploadImg = file

      const input = evt.target
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.previewImg = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    showA() {
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
      }, 1500)
    },
    async upload() {
      if (!this.uploadImg) {
        this.error = "uploadError"
        return
      }
      if (!this.tags.length) {
        this.error = "uploadError2"
        return
      }
      this.tags.forEach((value, index, array) => {
        array[index] = value.toUpperCase()
      })
      let formData = new FormData()
      formData.append("img", this.uploadImg)
      formData.append("tags", this.tags)
      formData.append("authorId", this.$store.state.userInfo.user._id)
      formData.append("authorName", this.$store.state.userInfo.user.name)

      const res = await PostService.post(formData)
      // TODO: 업로드 후 홈 또는 마이페이지(posts) 로 연결하기
      this.close()
      window.location.href = "/"
    },
    open() {
      if (!this.$store.state.userInfo.isLogined) {
        this.showA()
        this.$router.push({ name: "login" })
        return
      }
      this.showDialog = true
      this.$refs.file
    },
    close() {
      this.uploadImg = null
      this.previewImg = null
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
  top: 300px;
  width: 500px;
  max-width: 800px;
  max-height: 500px;
  padding: 15px;
}
.md-dialog .title {
  font-size: 1.5rem;
  font-weight: 400;
  margin: 10px;
}
.area {
  width: 100%;
  height: 400px;
  margin: 10px auto;
  border: 2px dashed lightgray;
  display: flex;
  justify-content: center;
}
/* .area:active, */
.area:hover {
  cursor: pointer;
  /* filter: brightness(110%); */
  background-color: rgba(135, 206, 250, 0.295);
}
.cover {
  margin: auto auto;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/plus.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.guide {
  height: 70%;
}
img {
  object-fit: contain;
  display: block;
  max-width: 100%;
  max-height: 200px;
}
#file {
  display: none;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  margin-left: 0px;
  margin-bottom: 10px;
}
.tags .tag {
  margin: auto 5px;
  padding: 0 10px;
  color: steelblue;
  cursor: not-allowed;
}
.tags .input {
  width: 100px;
  height: 40px;
  text-align: start;
  padding: 0 10px;
  border: 1px dashed steelblue;
  color: steelblue;
}
.tags .input:focus {
  border: 1px none steelblue;
}
.tags .input::placeholder,
.tags .input::-webkit-input-placeholder {
  color: steelblue;
  font-weight: 400;
}
.tags * {
  font-size: 1rem;
  font-weight: 400;
}

.error {
  color: red;
  margin-right: 30px;
}
@media screen and (max-width: 800px) {
  .md-dialog {
    position: absolute;
    top: 300px;
    margin: 0px auto;
    width: 95%;
  }
  .title {
    font-weight: 500;
  }
}

@media screen and (max-width: 600px) {
  .md-dialog {
    position: absolute;
    top: 100px;
    margin: 0px auto;
    width: 95%;
  }
  .title {
    font-weight: 500;
  }
  .tags * {
    font-size: 0.5rem;
    font-weight: 400;
  }
  .tags .input {
    height: 30px;
  }
}
</style>


