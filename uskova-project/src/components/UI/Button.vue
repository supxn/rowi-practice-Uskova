<template>
<button :disabled="disabled">{{ buttonText }}</button>
</template>


<script setup lang="ts">
const props = defineProps({
  buttonText: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss">
button{
  //display: flex;
    color: black;
    margin: 5px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 3px;
    background-color: #c9dce8;

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
