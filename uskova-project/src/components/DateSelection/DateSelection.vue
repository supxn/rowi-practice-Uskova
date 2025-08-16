<template>
  <Input @click="clickInput" v-model="selectedDate" fieldname="selectDate" placeholder="__.__.____"
    :validator="validateDate" @useMask="DateMask" />
  <div class="calendar-popup">
    <Calendar v-if="isOpen" v-model="selectedDate" @dayclick="onDayClick" :locale="ru" :first-day-of-week="2"
      :attributes="attributes" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import Input from '../UI/Input/Input.vue';
import dayjs from 'dayjs';
import { Calendar } from 'v-calendar';
import { ru } from 'date-fns/locale';
import 'v-calendar/dist/style.css';
import { CalendarAttribute } from './DateSelectionTypes';

const selectedDate = ref(dayjs().format('DD.MM.YYYY'));
const isOpen = ref(false);

const clickInput = (event: MouseEvent) => {
  isOpen.value = !isOpen.value;
}

const attributes = ref<CalendarAttribute[]>([
  {
    key: 'today',
    highlight: {
      color: 'gray',
      fillMode: 'outline',
    },
    dates: new Date(),
  },

]);
const onDayClick = (day) => {
  selectedDate.value = dayjs(day.date).format('DD.MM.YYYY');
  isOpen.value = false;
};

const DateMask = (): void => {
  const cleanValue = selectedDate.value.replace(/\D/g, '').substring(0, 8);
  if (cleanValue.length === 0) {
    selectedDate.value = '';
    return;
  }
  if (cleanValue.length <= 2) {
    selectedDate.value = cleanValue;
  } else if (cleanValue.length <= 4) {
    const day = cleanValue.substring(0, 2);
    const month = cleanValue.substring(2, 4);
    selectedDate.value = `${day}.${month}`;
  } else {
    const day = cleanValue.substring(0, 2);
    const month = cleanValue.substring(2, 4);
    const year = cleanValue.substring(4, 8);
    selectedDate.value = `${day}.${month}.${year}`;
  }
}

const validateDate = (value: string): { isValid: boolean, message: string } => {
  const dateFormat = /^\d{2}\.\d{2}\.\d{4}/;
  if (!dateFormat.test(value)) {
    return {
      isValid: false,
      message: "Введите дату в формате ДД.ММ.ГГГГ"
    };
  }
  const [day, month, year] = value.split('.');
  const date = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD', true);

  if (!date.isValid()) {
    return {
      isValid: false,
      message: "Некорректная дата"
    };
  }
  if (date.date() !== parseInt(day) || date.month() + 1 !== parseInt(month)) {
    return {
      isValid: false,
      message: "Несуществующая дата"
    };
  }
  return {
    isValid: true,
    message: ""
  };
}
</script>
<style scoped></style>