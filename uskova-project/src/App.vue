<template>
    <div class="area">
       <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style lang="scss">
.area {
    width: 1200px;
    margin: auto;
}
</style>
