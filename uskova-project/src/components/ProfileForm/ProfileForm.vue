<template>
    <form id="profile" class="profileform">
        <Input v-model="dataForm.nickname" fieldName="nickname" placeholder="Никнейм"
            @validation="updateValidationStatus" :disabled="!hasChanges" required />
        <Input v-model="dataForm.FIO" fieldName="FIO" placeholder="ФИО" @validation="updateValidationStatus"
            :validator="validateFIO" :disabled="!hasChanges" required />
        <Input v-model="dataForm.number" fieldName="number" placeholder="+7 (___) ___ __ __" :validator="validatePhone"
            @validation="updateValidationStatus" type="tel" :disabled="!hasChanges" @useMask="TelMask" required />
        <Input v-model="dataForm.email" placeholder="e-mail" type="email" :validator="validateEmail"
            @validation="updateValidationStatus" :disabled="!hasChanges" required />

        <template v-if="!dataForm.password">
            <InputPassword v-model="newPassword" fieldName="password" placeholder="Пароль"
                @validation="updateValidationStatus" :disabled="savedPassword" />
            <InputPassword v-if="!savedPassword" v-model="confirmPassword" fieldName="confirmPassword"
                placeholder="Подтверждение пароля" :validator="validatePasswordMatch"
                @validation="updateValidationStatus" />
            <Button v-else @click="changePassword" buttonText="Сменить пароль"></Button>
        </template>
    </form>
    <Button @click="saveFormToLocalStorage" buttonText="Сохранить" :disabled="isDisabled"></Button>
    <Button @click="resetProfile" buttonText="Сброс данных" type="secondary"></Button>
</template>

<script setup lang="ts">
import Button from '../UI/Button/Button.vue'
import { TypeData, InputFields } from "./ProfileFormTypes"
import { ref, computed } from 'vue'
import Input from '../UI/Input/Input.vue';
import InputPassword from '../UI/InputPassword.vue';

const hasChanges = ref(false);
const savedPassword = ref(false);
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
},
{
    title: "confirmPassword",
    status: false
}
])

const saveFormToLocalStorage = (): boolean => {
    try {
        localStorage.setItem('formData', JSON.stringify(dataForm.value))
        hasChanges.value = false;
        savedPassword.value = true;
        return true
    } catch (error) {
        console.error('Ошибка сохранения:', error)
        return false
    }
}
const isDisabled = computed(() => { return inputStatuses.value.some(s => !s.status) || !hasChanges.value }
);
const updateValidationStatus = (payload: { field: string, status: boolean }): void => {
    const field = inputStatuses.value.find(f => f.title === payload.field)
    if (field) {
        field.status = payload.status
        hasChanges.value = true;
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
    const phoneRegex = /^\+7\s?\(9\d{2}\)\s?\d{3}-\d{2}-\d{2}$/;
    return {
        isValid: phoneRegex.test(value),
        message: 'Введите телефон в формате +7 9XXXXXXXXX'
    }
}
const TelMask = (): void => {
    const cleanValue = dataForm.value.number.replace(/\D/g, '').substring(0, 11);
    let formatted = "+7 (";
    let startFlag = 0;
    if (cleanValue[0] == "7") startFlag = 1;
    if (cleanValue.length > 0) formatted += cleanValue.substring(startFlag, 4);
    if (cleanValue.length > 4) formatted += `) ${cleanValue.substring(4, 7)}`
    if (cleanValue.length > 7) formatted += `-${cleanValue.substring(7, 9)}`
    if (cleanValue.length > 9) formatted += `-${cleanValue.substring(9, 11)}`
    dataForm.value.number = formatted;
}
const validateEmail = (value: string) => {
    if (!value) return { isValid: true }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return {
        isValid: emailRegex.test(value),
        message: 'Введите корректный email'
    }
}
const newPassword = ref('')
const confirmPassword = ref('')
const validatePasswordMatch = () => {
    return {
        isValid: newPassword.value === confirmPassword.value,
        message: 'Пароли не совпадают'
    }
}
const changePassword = () => {
    savedPassword.value = false;
    dataForm.value.password = ''
    newPassword.value = ''
    confirmPassword.value = ''
    updateValidationStatus({ field: 'confirmPassword', status: false })

}
const resetData = () => {
    dataForm.value = {
        nickname: "",
        FIO: "",
        number: "",
        email: "",
        password: ""
    }
    localStorage.removeItem('profileData')
    savedPassword.value = false;
}
const resetProfile = () => {
    resetData()
    newPassword.value = ''
    confirmPassword.value = ''
    inputStatuses.value.forEach(field => {
        field.status = false
    })
    hasChanges.value = true
}
</script>

<style scoped lang="scss">
.profileform {
    display: flex;
    flex-direction: column;
}
</style>
