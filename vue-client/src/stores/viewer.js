import { reactive, computed } from 'vue';

const store = reactive({
  viewer: null,
  viewerId: computed(() => store.viewer && store.viewer.id),
  setViewer: v => (store.viewer = v),
});

export default store;
