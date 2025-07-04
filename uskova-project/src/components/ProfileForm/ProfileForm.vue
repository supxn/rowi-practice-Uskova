<template>
    <form id="profile" class="profileform">
        <Input v-model ="dataForm.nickname" fieldName = "nickname" placeholder="Никнейм" @validation="updateValidationStatus" required />
        <Input v-model ="dataForm.FIO" fieldName = "FIO" placeholder="ФИО" @validation="updateValidationStatus" required />
        <Input v-model ="dataForm.number" fieldName = "number" placeholder="Номер" @validation="updateValidationStatus" required />
        <Input v-model ="dataForm.email" placeholder="e-mail" @validation="updateValidationStatus" required />
        <Input v-model ="dataForm.password" fieldName = "password" placeholder="Пароль" @validation="updateValidationStatus" required />
    </form>
    <Button  buttonText="Сохранить" :disabled="isDisabled"></Button>
</template>
<script setup lang="ts">
import Button from '../UI/Button/Button.vue'
import {TypeData, InputFields} from "./ProfileFormTypes"
import { ref, computed } from 'vue';
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
},{
    title: "password",
    status: false
}
])

const isDisabled = computed(() =>
  inputStatuses.value.some(s => !s.status)

);
const updateValidationStatus = (payload: { field: string, status: boolean }):void => {
  const field = inputStatuses.value.find(f => f.title === payload.field)
  if (field) {
    field.status = payload.status
  }
}
</script>

<style scoped lang="scss">
.profileform {
    display: flex;
    flex-direction: column;
}
</style>
