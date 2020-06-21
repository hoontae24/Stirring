import { inject, reactive, computed } from 'vue';

export const UTIL_STORE_KEY = Symbol('UTIL_STORE');

export const useUtilStore = () => inject(UTIL_STORE_KEY);

export const createUtilStore = () => {
  const state = reactive({
    queue: [],
  });

  const alert = (message) => {
    if (typeof window !== 'undefined') {
      window.alert(message);
    }
  };

  return {
    queue: computed(() => state.queue),
    alert,
  };
};
