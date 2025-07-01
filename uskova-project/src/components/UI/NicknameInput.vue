<template>
    <input v-model="modelNickname" placeholder="Никнейм" required>

</template>

<script setup lang="ts">
import {ref} from 'vue';
const modelNickname = defineModel<string>();

</script>

<style scoped lang="scss">
input {

    margin: 5px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 3px;
}
</style>
