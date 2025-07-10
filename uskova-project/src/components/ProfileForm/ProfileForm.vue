<template>
    <form id="profile" class="profileform">
        <Input v-model="dataForm.nickname" fieldName="nickname" placeholder="Никнейм"
            @validation="updateValidationStatus" required />
        <Input v-model="dataForm.FIO" fieldName="FIO" placeholder="ФИО" @validation="updateValidationStatus"
            :validator="validateFIO" required />
        <Input v-model="dataForm.number" fieldName="number"  placeholder="+7 (___) ___ __ __" 
        :validator="validatePhone" 
        @validation="updateValidationStatus"
        @useMask="TelMask"
            required />
        <Input v-model="dataForm.email" placeholder="e-mail" 
        :validator="validateEmail" @validation="updateValidationStatus" required />
        <Input v-model="dataForm.password" fieldName="password" placeholder="Пароль"
            @validation="updateValidationStatus" required />
    </form>
    <Button buttonText="Сохранить" :disabled="isDisabled"></Button>
</template>
<script setup lang="ts">
import Button from '../UI/Button/Button.vue'
import { TypeData, InputFields } from "./ProfileFormTypes"
import { ref, computed, watch } from 'vue';
import Input from '../UI/Input/Input.vue';

const dataForm = ref<TypeData>({
    nickname: "",
    FIO: "",
    number: "",
    email: "",
    password: ""
});

const inputStatuses = ref<InputFields[]>([{
    title: "nickname",
    status: false
}, {
    title: "FIO",
    status: false
}, {
    title: "number",
    status: false
}, {
    title: "password",
    status: false
}
])

const isDisabled = computed(() =>
    inputStatuses.value.some(s => !s.status)

);
const updateValidationStatus = (payload: { field: string, status: boolean }): void => {
    const field = inputStatuses.value.find(f => f.title === payload.field)
    if (field) {
        field.status = payload.status
    }
}
const validateFIO = (value: string) => {
    const words = value.trim().split(/\s+/)
    return {
        isValid: words.length >= 2,
        message: 'Должно содержать минимум 2 слова'

    }
}


const validatePhone = (value: string) => {

  const phoneRegex = /^\+7\s?9\d{2}\s?\d{3}\d{2}\d{2}$/
   return {
    isValid: phoneRegex.test(value),
   message: 'Введите телефон в формате +7 9XXXXXXXXX'
  }
}
const TelMask = (value: string):void=>{//пока не работает, я над этим работаю
    if (value.length > 11) value = value.substring(0, 11)
    let formatted = ''
    if (value.length > 0) {
      formatted = '+7'
      console.log(formatted);
      if (value.length > 1) formatted += ` (${value.substring(1, 4)}`
      if (value.length > 4) formatted += `) ${value.substring(4, 7)}`
      if (value.length > 7) formatted += `-${value.substring(7, 9)}`
      if (value.length > 9) formatted += `-${value.substring(9, 11)}`
      
    }

}

const validateEmail = (value: string) => {
  if (!value) return { isValid: true }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return {
    isValid: emailRegex.test(value),
    message: 'Введите корректный email'
  }
}
</script>

<style scoped lang="scss">
.profileform {
    display: flex;
    flex-direction: column;
}
</style>
