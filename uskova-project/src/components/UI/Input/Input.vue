<template>
    <input 
    v-model="modelValue" 
    :placeholder="placeholder" 
    :type="type"
    :required = "required"
    @blur="validateField"
    @input="handleInput"
    
    />
    <span v-if="showError" class="error-text">{{ errorMessage }}</span>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {Props} from './InputTypes';
const errorMessage = ref('');
const showError = ref(false);
const props = defineProps<Props>();
const modelValue = defineModel<string>({ required: true });
const emit = defineEmits(['useMask','validation']);

const handleInput = (e: Event) => {
    validateField()
     emit('useMask', {
    field: modelValue.value
  });
    return
  }
const validateField = ():void => {
  let isValid = props.required 
    ? modelValue.value?.trim() !== '' 
    : true;
  let message = "Это поле обязательно";
  if (isValid && props.validator && modelValue.value) {
    const validationResult = props.validator(modelValue.value)
    isValid = validationResult.isValid
    message = validationResult.message || message
  }
    showError.value=!isValid;
    errorMessage.value = message
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
