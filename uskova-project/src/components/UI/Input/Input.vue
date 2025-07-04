<template>
    <input 
    v-model="modelValue" 
    :placeholder="placeholder" 
    :type="type"
    :required = "required"
    @blur="validateField"
    />
    <span v-if="showError" class="error-text">Это поле обязательно</span>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {Props} from './InputTypes';
const showError = ref(false);
const props = defineProps<Props>();
const modelValue = defineModel<string>({ required: true });
const emit = defineEmits(['validation']);
const validateField = ():void => {
  const isValid = props.required 
    ? modelValue.value?.trim() !== '' 
    : true;
    showError.value=!isValid;
  emit('validation', {
    field: props.fieldName,
    status: isValid
  });
};
</script>

<style scoped lang="scss">
input {

    margin: 5px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 3px;
}
.error-text {
  color: #ff4444;
  font-size: 0.8rem;
  display: block;
  margin-top: 0.25rem;
}
</style>
