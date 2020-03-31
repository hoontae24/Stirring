<template>
  <div class="root page-login">
    <el-card class="box-card card-root">
      <div slot="header" class="card-header">
        LOGIN
      </div>
      <component
        :is="field.type || 'vue-input'"
        v-for="field in fields"
        :key="field.name"
        :class="['field', field.name]"
        :placeholder="field.name | toUpperCase"
        v-model="$data[field.name]"
      />
    </el-card>
  </div>
</template>

<script>
const _fields = [{ name: 'username' }, { name: 'password' }];
const _fieldDatas = _fields.reduce((data, field) => {
  data[field.name] = field.defaultValue || '';
  return data;
}, {});

export default {
  name: 'login',
  data() {
    return {
      ..._fieldDatas,
    };
  },
  computed: {
    fields() {
      return _fields;
    },
  },
};
</script>

<style scoped lang="scss">
.root.page-login {
  .card-root {
    width: 80%;
    max-width: 500px;
    margin: #{$spacing * 4}px auto;

    .card-header {
      font-size: xx-large;
      text-align: center;
    }

    .field {
      margin-top: #{$spacing}px;
      margin-bottom: #{$spacing}px;
    }
  }
}
</style>
