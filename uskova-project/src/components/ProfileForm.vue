<template>
    <form id="profile">
        <NicknameInput/>
        <FIOInput />
        <PhoneInput />
    </form>
    <Button buttonText="Сохранить" :disabled = "isDisabled"></Button>

</template>


<script setup lang="ts">
import Button from './UI/Button.vue'
import NicknameInput from './UI/NicknameInput.vue'
import FIOInput from './UI/FIOInput.vue'
import PhoneInput from './UI/PhoneInput.vue'
import { ref, computed } from 'vue';

const dataForm = ref({
    nickname: "",
    FIO: "",
    number: ""
});
const isDisabled = computed(() => {
    return dataForm.value.nickname==="" || dataForm.value.FIO==="" || dataForm.value.number==="";
});
</script>

<style lang="scss"></style>
