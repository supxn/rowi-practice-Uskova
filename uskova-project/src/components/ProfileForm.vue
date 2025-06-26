<template>
    <form id="profile" class="profileform">
        <NicknameInput />
        <FIOInput />
        <PhoneInput />
    </form>
    <Button buttonText="Сохранить" :disabled="isDisabled"></Button>

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
interface InputFields { //Возможно нужно будет вынести куда-то, а то некрасиво
    title: string;
    status: boolean;
}
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

const isDisabled = computed(() => {  //C кнопочкой вроде разобралась
    for (const s of inputStatuses.value) {
        if (!s.status) return true;
    }
    return false;
});
</script>

<style lang="scss">
.profileform {
    display: flex;
    flex-direction: column;
}
</style>
