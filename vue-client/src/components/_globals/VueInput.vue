<template>
  <div class="vue-input-wrapper" :class="{ 'full-width': fullWidth }">
    <div class="vue-input-icon-wrapper" v-if="Boolean(icon)">
      <keep-alive v-if="typeof icon === 'object'">
        <component :is="icon" class="vue-input-icon"></component>
      </keep-alive>
      <i
        v-else-if="typeof icon === 'string'"
        class="vue-input-icon"
        :class="icon"
      ></i>
    </div>
    <input
      class="vue-input"
      :class="{ clearable, 'has-icon': Boolean(icon) }"
      v-bind="{ ...$attrs }"
      v-model="value"
    />
    <div class="vue-input-btn-wrapper" v-show="clearable && Boolean(value)">
      <i
        class="vue-input-btn far fa-times-circle"
        @click="$emit('update:modelValue', '')"
      ></i>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'VueInput',
  props: {
    modelValue: String,
    clearable: { type: Boolean, default: true },
    fullWidth: { type: Boolean, default: true },
    icon: { type: [Object, String] },
  },
  setup(props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: v => emit('update:modelValue', v),
    });

    return { value };
  },
};
</script>

<style scoped lang="scss">
$input-padding: 12;
$input-btn-width: 40;

.vue-input-wrapper {
  position: relative;
  display: inline-block;

  &.full-width {
    display: block;
  }

  .vue-input-icon-wrapper {
    position: absolute;
    width: #{$input-btn-width}px;
    height: 100%;
    left: 0px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    & .vue-input-icon {
      color: #{$text-secondary};
      display: inline-block;
    }
  }

  .vue-input-btn-wrapper {
    position: absolute;
    width: #{$input-btn-width}px;
    height: 100%;
    right: 0px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    & .vue-input-btn {
      display: inline-block;
      color: #{$text-placeholder};
      transition: color 0.2s ease-in;
      &:hover,
      &:focus {
        color: #{$text-secondary};
        cursor: pointer;
      }
    }
  }
}

.vue-input {
  display: inline-block;
  padding: 0 #{$input-padding}px;
  &.has-icon {
    padding-left: #{$input-btn-width}px;
  }
  &.clearable {
    padding-right: #{$input-btn-width}px;
  }
  width: 100%;
  height: 40px;
  line-height: 40px;

  color: #{$text-regular};

  border-style: solid;
  border-radius: 4px;
  border-width: 1px;
  border-color: #{$border-dark};
  outline: none;

  transition: border-color 0.2s ease-in;

  &:focus {
    border-color: #{$primary};
  }
  &::placeholder {
    color: #{$text-placeholder};
  }
  &:-moz-placeholder {
    color: #{$text-placeholder};
  }
  &::-webkit-input-placeholder {
    color: #{$text-placeholder};
  }
}
</style>
