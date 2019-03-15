<template>
  <div class="collect-dialog">
    <md-dialog
      :md-active.sync="showDialog"
      md-clicked-outside="close"
      class="dialog"
      @click="$event.cancelBubble = true; isAdd = false; error = ''"
    >
      <md-dialog-title style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size:1.5rem; vertical-align: middle;">Collections</span>
        <md-button class="md-primary" @click="close">close</md-button>
      </md-dialog-title>
      <md-content
        style="margin: 30px 5px; display: flex; flex-direction: column; align-items: center; overflow: auto;"
      >
        <div
          class="collection btn"
          :class="hasPost(post, collection) ? 'collected' : '' "
          v-for="collection in collections"
          :key="collection._id"
          @click="$event.cancelBubble = true; actionCollect(post, collection)"
        >
          <div class="content" style="margin: auto 10px;">
            <span
              style="font-size: 1rem; font-weight: 700; color: Steelblue;"
            >{{ collection.title }}</span>
            <br>
            <span>posts: {{ collection.posts.length }}</span>
            <span v-if="hasPost(post, collection)">(Already Collected)</span>
          </div>
          <span style="position: relative; display: flex; flex-direction: column;">
            <i class="fas fa-plus" style="font-size: 1.5rem;" v-if="!hasPost(post, collection)"></i>
            <i class="fas fa-minus" style="font-size: 1.5rem;" v-else></i>
          </span>
        </div>
        <div
          class="collection btn"
          style="padding: 10px; border: 1px solid Steelblue; border-radius: 1em;"
          @click="$event.cancelBubble = true; isAdd = true; newTitle = ''"
        >
          <img
            src="@/assets/icon_collection.png"
            style="display: inline; height: 50px;; margin: auto 10px;"
          >
          <div class="collection-title" style="display: inline-block">
            <span v-if="!isAdd">ADD TO NEW COLLECTION</span>
            <div class="field" v-if="isAdd" style="display: flex;">
              <md-field>
                <label></label>
                <md-input
                  v-model="newTitle"
                  placeholder="TITLE FOR NEW"
                  @keyup.enter="createCollection"
                ></md-input>
              </md-field>
              <span
                v-if="isAdd"
                @click="createCollection"
                style="font-size: 1.5rem; margin: auto 5px;"
              >
                <i class="fas fa-plus"></i>
              </span>
              <!-- <span v-if="isAdd" style="">
                <i class="fas fa-times"></i>
              </span>-->
            </div>
          </div>
        </div>
      </md-content>
      <span style="font-size:0.8rem; color: red; margin: 10px auto; text-align: center;">{{error}}</span>
    </md-dialog>
  </div>
</template>

<script>
import CollectionService from "@/services/CollectionService"
import authGuard from "@/mixins/authGuard"
import { actions } from "@/mixins/actions"
import { EventBus } from "@/mixins/EventBus"

export default {
  data: () => ({
    showDialog: false,
    isAdd: false,
    newTitle: "",
    error: "",
    post: null,
    collections: []
  }),
  methods: {
    actionCollect(post, collection) {
      if (!this.hasPost(post, collection)) {
        CollectionService.addPost({ collection, post })
          .then(res => {
            EventBus.$emit("loadCollections")
            this.open(this.post)
          })
          .catch(err => {
            this.error = err.message
          })
      } else {
        CollectionService.subtractPost({ collection, post })
          .then(res => {
            EventBus.$emit("loadCollections")
            this.open(this.post)
          })
          .catch(err => {
            this.error = err.message
          })
      }
    },
    createCollection() {
      if (!this.newTitle) {
        this.error = "Enter the TITLE"
        return
      } else if (this.newTitle.length > 20) {
        this.error = "The title should be 20 charracters or less."
        return
      }
      this.error = ""
      this.$store
        .dispatch("createCollection", this.newTitle)
        .then(success => {
          this.open(this.post)
        })
        .catch(err => {
          this.error = err.message
        })
    },
    open(post) {
      this.isAdd = false
      this.newTitle = ""
      this.error = ""
      this.showDialog = true
      this.post = post
      CollectionService.getByAuthor(this.$store.state.userInfo.user._id)
        .then(res => {
          if (!res.data.success) throw new Error("Failed to load collections")
          this.collections = res.data.collections
        })
        .catch(err => {
          this.error = err.message
        })
    },
    close() {
      this.showDialog = false
      this.post = null
      this.collections = []
      EventBus.$emit("loadUser")
    }
  },
  created() {
    EventBus.$on("showCollections", post => {
      this.open(post)
    })
  },
  mixins: [actions]
}
</script>

<style scoped>
.dialog {
  width: 80%;
  max-width: 800px;
  min-width: 550px;
  /* max-height: 500px; */
}
.collection {
  min-width: 300px;
  min-height: 80px;
  margin: 10px;
  padding: 10px;
  border: 1px solid Steelblue;
  border-radius: 1em;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.collected {
  background-color: lightgreen;
}

/* .btn:active, */
.btn:hover {
  cursor: pointer;
  font-weight: 700;
  color: Steelblue;
  background-color: cornsilk;
}

@media screen and (max-width: 800px) {
  .dialog {
    min-width: 320px;
    width: 95%;
    height: 70%;
  }
  .collection {
    margin: 3px;
    padding: 3px;
  }
}
</style>