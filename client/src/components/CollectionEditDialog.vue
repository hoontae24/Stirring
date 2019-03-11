<template>
  <div class="collection-edit-dialog">
    <md-dialog :md-active.sync="showDialog" md-clicked-outside="close">
      <div class="content">
        <div class="title">
          <md-field>
            <label>Collection Title</label>
            <md-input v-model="collection.title"></md-input>
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
      showDialog: false
    }
  },
  methods: {
    open() {
      this.showDialog = true
    },
    close() {
      this.showDialog = false
      EventBus.$emit("loadUser")
    },
    submit() {
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
  width: 50%;
  min-width: 420px;
}
.content {
  margin: 20px 50px;
}
</style>