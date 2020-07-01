<template>
  <div
    class="vue-input-container"
    :class="{ 'full-width': fullWidth }"
  >
    <div class="vue-input-wrapper">
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
        v-bind="{
          title: '',
          ...$attrs,
          ...(state.visibility ? { type: 'text' } : {}),
          ...inputProps,
        }"
        v-model="value"
        :ref="inputRef"
      />
      <div class="vue-input-btn-wrapper">
        <i
          v-if="clearable && Boolean(value)"
          class="vue-input-btn far fa-times-circle"
          @click="$emit('update:modelValue', '')"
        ></i>
        <i
          v-if="$attrs.type === 'password'"
          class="vue-input-btn fas fa-eye"
          :class="state.visibility ? 'fa-eye-slash' : 'fa-eye'"
          @click="toggleVisiblity()"
        ></i>
      </div>
    </div>
    <span class="vue-input-helper-text" :class="{ error }">
      {{ helperText || '' }}
    </span>
  </div>
</template>

<script>
import { computed, reactive } from 'vue';

export default {
  name: 'VueInput',
  props: {
    modelValue: String,
    required: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    fullWidth: { type: Boolean, default: false },
    icon: { type: [Object, String] },
    helperText: { type: String },
    error: { type: Boolean },
    inputRef: { type: Function },
  },
  inheritAttrs: false,
  setup(props, { emit, attrs }) {
    const inputProps = {
      required: props.required,
      placeholder: (props.required ? '*' : '') + (attrs.label || ''),
    };
    const value = computed({
      get: () => props.modelValue,
      set: (v) => emit('update:modelValue', v),
    });
    const state = reactive({
      visibility: attrs.type !== 'password',
    });
    const toggleVisiblity = () =>
      (state.visibility = !state.visibility);
    return { inputProps, value, state, toggleVisiblity };
  },
};
</script>

<style scoped lang="scss">
$input-padding: 12;
$input-btn-width: 40;

.vue-input-container {
  display: inline-block;
  &.full-width {
    display: block;
  }
}

.vue-input-wrapper {
  display: flex;
  align-items: center;

  padding: 0px #{$spacing * 0.5}px;
  border-style: solid;
  border-radius: 4px;
  border-width: 1px;
  border-color: #{$border-color-dark};
  transition: border-color 0.2s ease-in;

  &:focus-within {
    border-color: #{$primary};
  }

  .vue-input-icon-wrapper {
    padding: #{$spacing * 0.5}px;
    margin-left: #{$spacing * 0.5}px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    & .vue-input-icon {
      color: #{$text-secondary};
      display: inline-block;
    }
  }

  .vue-input-btn-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    & .vue-input-btn {
      padding: #{$spacing * 0.5}px;
      margin-right: #{$spacing * 0.5}px;
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
  flex-grow: 2;
  display: inline-block;
  margin: #{$spacing * 0.5}px #{$spacing * 1}px;
  padding: 0px;
  height: calc(40px - #{$spacing * 0.5}px);
  line-height: calc(40px - #{$spacing * 0.5}px);

  color: #{$text-regular};

  border: none;
  outline: none;

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

.vue-input-helper-text {
  display: block;
  padding: 0px #{$spacing * 1}px;
  color: #{$text-regular};
  font-size: smaller;

  &.error {
    color: #{$danger};
  }
}
</style>
