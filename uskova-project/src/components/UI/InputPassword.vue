<template>
  <div class="password-area">
    <Input v-model="modelValue" :fieldName="fieldName" :placeholder="placeholder"
      :type="showPassword ? 'text' : 'password'" :required="true" :validator="validator" :disabled="disabled"
      @validation="updateValidationStatus" />
    <span class="eye-icon" @click="togglePasswordVisibility">
      <i v-if="showPassword" class="fi fi-ss-eye-crossed"></i>
      <i v-else class="fi fi-sr-eye"></i>
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Input from '../UI/Input/Input.vue';
import { IProps } from '../UI/Input/InputTypes';
const props = defineProps<IProps>();
const modelValue = defineModel<string>({ required: true });
const showPassword = ref(false)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
const emit = defineEmits(['useMask', 'validation']);
const updateValidationStatus = (payload: { field: string, status: boolean }): void => {
  emit('validation', {
    field: payload.field,
    status: payload.status
  });
}
</script>
<style scoped>
@import url('https://cdn-uicons.flaticon.com/3.0.0/uicons-solid-rounded/css/uicons-solid-rounded.css');
@import url('https://cdn-uicons.flaticon.com/3.0.0/uicons-solid-straight/css/uicons-solid-straight.css');

.password-area {
  width: 100%;
  position: relative;

  .eye-icon {
    position: absolute;
    right: 12px;
    top: 20px;

    cursor: pointer;
    color: #666;

    .eye-icon:hover {
      color: #333;
    }
  }
}

.fi {
  font-size: 18px;
}
</style>
