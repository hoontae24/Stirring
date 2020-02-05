<template>
  <div class="likes">
    <Board :likes="user.likes"/>
  </div>
</template>

<script>
import Board from "@/components/Board"
export default {
  components: { Board },
  props: ["user"]
}
</script>

<style>
</style>
