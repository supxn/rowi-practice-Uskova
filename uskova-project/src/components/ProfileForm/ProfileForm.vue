<template>
    <form id="profile" class="profileform">
        <NicknameInput v-model ="dataForm.nickname"/>
        <FIOInput />
        <PhoneInput />
    </form>
    <Button  buttonText="Сохранить" :disabled="isDisabled"></Button>
</template>


<script setup lang="ts">
import Button from '../UI/Button/Button.vue'
import NicknameInput from '../UI/NicknameInput.vue'
import FIOInput from '../UI/FIOInput.vue'
import PhoneInput from '../UI/PhoneInput.vue'
import {TypeData, InputFields} from "./ProfileFormTypes"
import { ref, computed } from 'vue';
import { Console } from 'console'

const dataForm = ref<TypeData>({
    nickname: "",
    FIO: "",
    number: "",
    email: "",
    password: ""
});

const inputStatuses = ref<InputFields[]>([{
    title: "nickname",
    status: true
}, {
    title: "FIO",
    status: true
}, {
    title: "number",
    status: true
}
])

const isDisabled = computed(() =>
  inputStatuses.value.some(s => !s.status)

);

</script>

<style scoped lang="scss">
.profileform {
    display: flex;
    flex-direction: column;
}
</style>
