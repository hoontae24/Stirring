<template>
  <div class="collection-edit-dialog">
    <md-dialog :md-active.sync="showDialog" md-clicked-outside="close">
      <div class="content">
        <div class="title">
          <md-field>
            <label>Collection Title</label>
            <md-input v-model="title"></md-input>
          </md-field>
        </div>
      </div>
      <md-dialog-actions>
        <md-button class="md-accent" @click="del">Delete</md-button>
        <md-button class="md-primary" @click="close">Cancel</md-button>
        <md-button class="md-primary" @click="submit">Edit</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import CollectionService from "@/services/CollectionService"
import { EventBus } from "@/mixins/EventBus"

export default {
  props: ["collection"],
  data() {
    return {
      showDialog: false,
      title: ''
    }
  },
  methods: {
    open() {
      this.showDialog = true
      this.title = this.collection.title
    },
    close() {
      this.showDialog = false
      EventBus.$emit("loadUser")
    },
    submit() {
      this.collection.title = this.title
      CollectionService.update({ collection: this.collection }).then(res => {
        this.close()
      })
    },
    del() {
      CollectionService.delete({ collection: this.collection })
      this.close()
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.md-dialog {
  width: 310px;
  min-width: 310px;
  height: 170px;
}
.content {
  margin: 20px 50px;
}
</style>