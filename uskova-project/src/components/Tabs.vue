<template>
    <div class="tabchoose">
        <button @click="setTabStatus(1)">Профиль</button>
        <button @click="setTabStatus(2)">Личные данные</button>
        <button @click="setTabStatus(3)">Доверенные лица</button>
    </div>
    <div v-if="showProfileForm" class="tabdiv">
        <ProfileForm />
    </div>
    <div v-else-if="tabStatus == 2" class="tabdiv">
         В разработке
        <Okak/>
        
    </div>
    <div v-else="tabStatus==3" class="tabdiv">
        Тоже в разработке
        <Okak/>
    </div>
</template>


<script setup lang="ts">
import ProfileForm from './ProfileForm/ProfileForm.vue'
import Okak from './Okak.vue'
import { ref, computed } from 'vue';
const tabStatus = ref(0);
const setTabStatus = (num: number): void => {
    tabStatus.value = num;
}

const showProfileForm = computed(()=> tabStatus.value == 1 || tabStatus.value > 3);
</script>

<style scoped lang="scss">
.tabchoose {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.tabdiv {
    display: flex;
    justify-content: center;
    padding: 20px;
    flex-direction: column;
    max-width: 400px;
    margin: auto;
}
</style>
