<template>
  <div v-if="open" class="dialog-root" :class="{ open }">
    <div
      class="dialog-backdrop"
      @click.stop="handleClose('BACKDROP')"
    />
    <div
      class="dialog-container"
      @click="
        $event.currentTarget === $event.target &&
          handleClose('BACKDROP')
      "
    >
      <div class="dialog-paper">
        <template v-if="$slots['header']">
          <div class="dialog-header dialog-section">
            <slot name="header"></slot>
          </div>
          <VueDivider />
        </template>

        <div
          v-if="$slots['default'] || $slots['content']"
          class="dialog-content dialog-section"
        >
          <slot v-if="$slots['content']" name="content"></slot>
          <slot v-else-if="$slots['default']"></slot>
        </div>

        <template v-if="$slots['footer']">
          <VueDivider />
          <div class="dialog-footer dialog-section">
            <slot name="footer"></slot>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { onUpdated } from 'vue';

export default {
  name: 'VueDialog',
  inheritAttrs: false,
  props: {
    open: { type: Boolean, require: true, default: false },
    disableBackdropClose: { type: Boolean, default: false },
    disableEscapeClose: { type: Boolean, default: false },
  },
  setup(props, ctx) {
    const handleClose = (reason) => {
      if (
        (reason === 'BACKDROP' && props.disableBackdropClose) ||
        (reason === 'ESCAPE' && props.disableEscapeClose)
      ) {
        return;
      }
      ctx.emit('close', reason);
    };

    const escapeHandler = (e) => {
      e.key === 'Escape' && handleClose('ESCAPE');
    };

    onUpdated(() => {
      if (props.open) {
        document.addEventListener('keydown', escapeHandler);
      } else {
        document.removeEventListener('keydown', escapeHandler);
      }
    });

    return {
      handleClose,
    };
  },
};
</script>

<style scoped lang="scss">
.dialog-root {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: calc(#{$z-index-dialog} - 1);
  &:not(.open) {
    z-index: -1;
  }
}

.dialog-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #{$background-hazy-dark};
}

.dialog-container {
  flex-grow: 1;
  padding: 30px 10%;
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
  z-index: #{$z-index-dialog};
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.dialog-paper {
  margin: 0 auto;
  min-width: 300px;
  max-width: 1440px;
  min-height: 30px;
  @include paper-border;
  background-color: #{$background-white};
  display: flex;
  flex-direction: column;
}

.dialog-section {
  padding: #{$spacing * 1.5}px #{$spacing * 2}px;
}

.dialog-header {
  font-size: large;
  font-weight: bolder;
}

.dialog-content {
  flex-grow: 1;
  flex-shrink: 1;
  overflow-x: auto;
}

.dialog-footer {
  text-align: right;
}
</style>
