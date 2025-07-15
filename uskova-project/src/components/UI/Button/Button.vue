<template>
<button :disabled="disabled">{{ buttonText }}</button>
</template>

<script setup lang="ts">
import {IProps} from "./ButtonTypes"

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  buttonText: '',
});
</script>

<style  scoped  lang="scss">
button{
    color: black;
    margin: 5px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 3px;
    background-color: #c9dce8;
    width: 100%;
    &:hover{
        background-color: #a8cfe7;
    }
    &:disabled{
        color: grey;
        background-color: #e6eaec;
        border: 1px solid grey;

    }
}

</style>
