<template>
  <div class="collections">
    <Collection class="collection" v-for="item in collections" :key="item._id" :collection="item"/>
    <md-button
      class="md-elevation-4"
      style="border: 1px solid lightblue; width: 95%; height: 50px; margin: 20px 2.5% 10px 2.5%;"
      @click="$store.commit('addCount'); loadCollections()"
    >{{text('more')}}</md-button>
  </div>
</template>

<script>
import Collection from "@/components/Collection"
import CollectionService from "@/services/CollectionService"
import { mapGetters } from 'vuex';

export default {
  components: { Collection },
  props: ["id", "search"],
  data() {
    return {
      collections: []
    }
  },
  computed: {
    ...mapGetters(['text'])
  },
  methods: {
    loadCollections() {
      if (this.id) {
        CollectionService.getByAuthor(this.id).then(res => {
          this.collections = this.collections.concat(res.data.collections)
        })
      } else {
        CollectionService.getByWords(this.search).then(res => {
          this.collections = this.collections.concat(res.data.collections)
        })
      }
    }
  },
  created() {
    this.$store.commit("resetCount")
    this.loadCollections()
  },
  watch: {
    id() {
      this.collections = []
      this.loadCollections()
    },
    search() {
      this.collections = []
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
