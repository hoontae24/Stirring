<template>
  <div class="collections">
    <Collection class="collection" v-for="item in collections" :key="item._id" :collection="item"/>
  </div>
</template>

<script>
import Collection from "@/components/Collection"
import CollectionService from "@/services/CollectionService"

export default {
  components: { Collection },
  props: ["id", "search"],
  data() {
    return {
      collections: []
    }
  },
  methods: {
    loadCollections() {
      this.collections = []
      if (this.id) {
        CollectionService.getByAuthor(this.id).then(res => {
          this.collections = res.data.collections
        })
      } else {
        CollectionService.getByWords(this.search).then(res => {
          this.collections = res.data.collections
        })
      }
    }
  },
  created() {
    this.loadCollections()
  },
  watch: {
    id() {
      this.loadCollections()
    },
    search() {
      this.loadCollections()
    }
  }
}
</script>

<style>
.collections {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
