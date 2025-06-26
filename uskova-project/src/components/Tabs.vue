<template>
    <div class="tabchoose">
        <button @click="setTabStatus(1)">Профиль</button>
        <button @click="setTabStatus(2)">Личные данные</button>
        <button @click="setTabStatus(3)">Доверенные лица</button>
    </div>
    <div v-if="tabStatus == 1 || tabStatus > 3" class="tabdiv">
        <ProfileForm />
    </div>
    <div v-else-if="tabStatus == 2" class="tabdiv">
         В разработке
        <Okak/>
        
    </div>
    <div v-else="tabStatus==3" class="ыtabdiv">
        Тоже в разработке
        <Okak/>
    </div>
</template>


<script setup lang="ts">
import ProfileForm from './ProfileForm.vue'
import Okak from './Okak.vue'
import { ref, computed } from 'vue';
const tabStatus = ref(0); //С табами получается тоже разобралась, покрасить теперь нормально их
const setTabStatus = (num: number) => {
    tabStatus.value = num;
}
</script>

<style lang="scss">
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
