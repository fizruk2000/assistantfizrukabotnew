<template>
<div>
  <h1>Шкала оценки уровня сформированности двигательных навыков учащихся</h1>
  <div class="selectors">
  <label for="gender">Пол:</label>
  <select id="gender" v-model="gender" @change="resetResults">
    <option value="male">Мужской</option>
    <option value="female">Женский</option>
  </select>
</div>
  <label for="age">Возраст:</label>
  <select id="age" v-model="age" @change="resetResults">
    <option value="">Выберите возраст</option>
    <option v-for="ageOption in ageOptions" :key="ageOption" :value="ageOption">
      {{ ageOption }}
    </option>
  </select>

  <div v-if="!age" style="margin-top: 20px; color: red;">
    Пожалуйста, выберите класс.
  </div>

  <div v-else style="margin-top: 20px;">
    <div
      v-for="event in filteredEvents"
      :key="event.name"
      style="margin-bottom: 15px;"
    >
      <label :for="event.name" style="display: block; font-weight: bold;">
        {{ event.name }} 
      </label>
      <input
        type="number"
        :id="event.name"
        v-model.number="event.result"
        @input="calculatePoints(event)"
        min="0"
        step="any"
        placeholder="Введите результат"
        style="width: 100%; padding: 5px;"
      />
      Балл: {{ event.points }}
    </div>
     </div>
</div>
</template>

<script>
export default {
data() {
  return {
    gender: 'male',
    age: '',
    ageOptions: ['5 класс', '6 класс', '7 класс', '8 класс', '9 класс', '10 класс', 
    '11 класс'],
    events: [
      { name: 'Прыжок в длину с разбега (см)', result: 0, points: 0 },
      { name: 'Прыжок в высоту с разбега (см)', result: 0, points: 0 },
      { name: 'Метание мяча 150 г с разбега (м)', result: 0, points: 0 },
      { name: 'Подтягивание на низкой перекладине (раз)', result: 0, points: 0 },
      { name: 'Метание гранаты 700 г с разбега (м)', result: 0, points: 0 },
      { name: 'Удержание ног в положении угла в упоре на брусьях (с)', result: 0, points: 0 },
      { name: 'Подъем переворотом на перекладине (раз)', result: 0, points: 0 },
      { name: 'Подъем силой на перекладине (раз)', result: 0, points: 0 },
      { name: 'Сгибание и разгибание рук в упоре на брусьях (раз)', result: 0, points: 0 },
      { name: 'Сгибание и разгибание рук в упоре лежа (раз)', result: 0, points: 0 },
      { name: 'Бег 60 м (с)', result: 0, points: 0 },
      { name: 'Бег 100 м (с)', result: 0, points: 0 },
      { name: 'Бег на лыжах 1 км (мин, с)', result: 0, points: 0 },
      { name: 'Бег на лыжах 1,5 км (мин, с)', result: 0, points: 0 },
      { name: 'Бег на лыжах 2 км (мин, с)', result: 0, points: 0 },
      { name: 'Бег на лыжах 3 км (мин, с)', result: 0, points: 0 },
      { name: 'Бег на лыжах 5 км (мин, с)', result: 0, points: 0 },
      { name: 'Кросс 1500 м (мин, с)', result: 0, points: 0 },
      { name: 'Кросс 2000 м (мин, с)', result: 0, points: 0 },
      { name: 'Кросс 3000 м (мин, с)', result: 0, points: 0 },
      { name: 'Бег 1500 м (мин, с)', result: 0, points: 0 },
      { name: 'Бег 2000 м (мин, с)', result: 0, points: 0 },
      { name: '6-минутный бег (м)', result: 0, points: 0 },
      { name: 'Бег 3000 м (мин, с)', result: 0, points: 0 }
    ],
    
    scoringData: {
     male: {
        '5 класс': {
        'Прыжок в длину с разбега (см)':  [
    { result: 246, points: 1 },
    { result: 247, points: 2 },
    { result: 260, points: 3 },
    { result: 273, points: 4 },
    { result: 286, points: 5 },
    { result: 300, points: 6 },
    { result: 313, points: 7 },
    { result: 326, points: 8 },
    { result: 340, points: 9 },
    { result: 353, points: 10 }
],
      'Прыжок в высоту с разбега (см)': [
    { result: 65, points: 1 },
    { result: 70, points: 2 },
    { result: 75, points: 3 },
    { result: 80, points: 4 },
    { result: 85, points: 5 },
    { result: 90, points: 6 },
    { result: 95, points: 7 },
    { result: 100, points: 8 },
    { result: 105, points: 9 },
    { result: 110, points: 10 }
  ],
  'Метание мяча 150 г с разбега (м)': [
    { result: 17, points: 1 },
    { result: 18, points: 2 },
    { result: 20, points: 3 },
    { result: 22, points: 4 },
    { result: 24, points: 5 },
    { result: 27, points: 6 },
    { result: 29, points: 7 },
    { result: 31, points: 8 },
    { result: 34, points: 9 },
    { result: 37, points: 10 }
  ],
  '6-минутный бег (м)': [
    { result: 930, points: 1 },
    { result: 950, points: 2 },
    { result: 1000, points: 3 },
    { result: 1030, points: 4 },
    { result: 1100, points: 5 },
    { result: 1125, points: 6 },
    { result: 1150, points: 7 },
    { result: 1180, points: 8 },
    { result: 1220, points: 9 },
    { result: 1255, points: 10 }
  ],
        'Бег 60 м (с)': [
    { result: 9.8, points: 10 },
    { result: 10.0, points: 9 },
    { result: 10.2, points: 8 },
    { result: 10.4, points: 7 },
    { result: 10.6, points: 6 },
    { result: 10.8, points: 5 },
    { result: 11.0, points: 4 },
    { result: 11.2, points: 3 },
    { result: 11.4, points: 2 },
    { result: 11.5, points: 1 }
],
      'Бег на лыжах 1 км (мин, с)': [
    { result: 6.20, points: 10 },
    { result: 6.30, points: 9 },
    { result: 6.40, points: 8 },
    { result: 6.50, points: 7 },
    { result: 7.00, points: 6 },
    { result: 7.14, points: 5 },
    { result: 7.27, points: 4 },
    { result: 7.40, points: 3 },
    { result: 7.53, points: 2 },
    { result: 7.54, points: 1 }
],
'Кросс 1500 м (мин, с)': [
    { result: 8.37, points: 10 },
    { result: 8.50, points: 9 },
    { result: 9.04, points: 8 },
    { result: 9.17, points: 7 },
    { result: 9.30, points: 6 },
    { result: 9.40, points: 5 },
    { result: 9.50, points: 4 },
    { result: 10.00, points: 3 },
    { result: 10.10, points: 2 },
    { result: 10.11, points: 1 }
],
        // Добавьте другие виды спорта и результаты
      },
'6 класс': {
        'Прыжок в длину с разбега (см)':  [
    { result: 248, points: 1 },
    { result: 249, points: 2 },
    { result: 265, points: 3 },
    { result: 282, points: 4 },
    { result: 298, points: 5 },
    { result: 315, points: 6 },
    { result: 327, points: 7 },
    { result: 338, points: 8 },
    { result: 350, points: 9 },
    { result: 362, points: 10 }
],
      'Прыжок в высоту с разбега (см)': [
    { result: 70, points: 1 },
    { result: 75, points: 2 },
    { result: 80, points: 3 },
    { result: 85, points: 4 },
    { result: 90, points: 5 },
    { result: 95, points: 6 },
    { result: 100, points: 7 },
    { result: 105, points: 8 },
    { result: 110, points: 9 },
    { result: 115, points: 10 }
  ],
  'Метание мяча 150 г с разбега (м)': [
    { result: 17, points: 1 },
    { result: 18, points: 2 },
    { result: 20, points: 3 },
    { result: 22, points: 4 },
    { result: 25, points: 5 },
    { result: 28, points: 6 },
    { result: 30, points: 7 },
    { result: 33, points: 8 },
    { result: 35, points: 9 },
    { result: 37, points: 10 }
  ],
  '6-минутный бег (м)': [
    { result: 990, points: 1 },
    { result: 1000, points: 2 },
    { result: 1030, points: 3 },
    { result: 1100, points: 4 },
    { result: 1140, points: 5 },
    { result: 1190, points: 6 },
    { result: 1200, points: 7 },
    { result: 1250, points: 8 },
    { result: 1290, points: 9 },
    { result: 1320, points: 10 }
  ],
      'Бег 60 м (с)': [
    { result: 9.7, points: 10 },
    { result: 9.9, points: 9 },
    { result: 10.1, points: 8 },
    { result: 10.3, points: 7 },
    { result: 10.5, points: 6 },
    { result: 10.7, points: 5 },
    { result: 10.9, points: 4 },
    { result: 11.2, points: 3 },
    { result: 11.4, points: 2 },
    { result: 11.5, points: 1 }
],
'Бег 1500 м (мин, с)': [
    { result: 7.30, points: 10 },
    { result: 7.36, points: 9 },
    { result: 7.42, points: 8 },
    { result: 7.49, points: 7 },
    { result: 7.56, points: 6 },
    { result: 8.03, points: 5 },
    { result: 8.10, points: 4 },
    { result: 8.17, points: 3 },
    { result: 8.23, points: 2 },
    { result: 8.24, points: 1 }
],
      'Бег на лыжах 1,5 км (мин, с)': [
    { result: 10.00, points: 10 },
    { result: 10.15, points: 9 },
    { result: 10.28, points: 8 },
    { result: 10.42, points: 7 },
    { result: 10.55, points: 6 },
    { result: 11.04, points: 5 },
    { result: 11.12, points: 4 },
    { result: 11.20, points: 3 },
    { result: 11.28, points: 2 },
    { result: 11.29, points: 1 }
],
'Кросс 1500 м (мин, с)': [
    { result: 8.14, points: 10 },
    { result: 8.25, points: 9 },
    { result: 8.37, points: 8 },
    { result: 8.49, points: 7 },
    { result: 9.00, points: 6 },
    { result: 9.09, points: 5 },
    { result: 9.17, points: 4 },
    { result: 9.25, points: 3 },
    { result: 9.30, points: 2 },
    { result: 9.31, points: 1 }
],
},
      '7 класс': {
        'Прыжок в длину с разбега (см)':  [
    { result: 249, points: 1 },
    { result: 250, points: 2 },
    { result: 270, points: 3 },
    { result: 290, points: 4 },
    { result: 310, points: 5 },
    { result: 330, points: 6 },
    { result: 340, points: 7 },
    { result: 350, points: 8 },
    { result: 360, points: 9 },
    { result: 370, points: 10 }
],
      'Прыжок в высоту с разбега (см)': [
    { result: 70, points: 1 },
    { result: 75, points: 2 },
    { result: 80, points: 3 },
    { result: 85, points: 4 },
    { result: 90, points: 5 },
    { result: 95, points: 6 },
    { result: 100, points: 7 },
    { result: 105, points: 8 },
    { result: 110, points: 9 },
    { result: 115, points: 10 }
  ],
  'Метание мяча 150 г с разбега (м)': [
    { result: 17, points: 1 },
    { result: 18, points: 2 },
    { result: 21, points: 3 },
    { result: 23, points: 4 },
    { result: 26, points: 5 },
    { result: 29, points: 6 },
    { result: 31, points: 7 },
    { result: 34, points: 8 },
    { result: 36, points: 9 },
    { result: 38, points: 10 }
  ],
  '6-минутный бег (м)': [
    { result: 1020, points: 1 },
    { result: 1050, points: 2 },
    { result: 1080, points: 3 },
    { result: 1110, points: 4 },
    { result: 1150, points: 5 },
    { result: 1195, points: 6 },
    { result: 1210, points: 7 },
    { result: 1240, points: 8 },
    { result: 1290, points: 9 },
    { result: 1310, points: 10 }
  ],
      'Бег 60 м (с)': [
    { result: 9.6, points: 10 },
    { result: 9.8, points: 9 },
    { result: 10.0, points: 8 },
    { result: 10.2, points: 7 },
    { result: 10.4, points: 6 },
    { result: 10.6, points: 5 },
    { result: 10.8, points: 4 },
    { result: 11.1, points: 3 },
    { result: 11.3, points: 2 },
    { result: 11.4, points: 1 }
],
'Бег 1500 м (мин, с)': [
    { result: 7.00, points: 10 },
    { result: 7.10, points: 9 },
    { result: 7.20, points: 8 },
    { result: 7.30, points: 7 },
    { result: 7.35, points: 6 },
    { result: 7.45, points: 5 },
    { result: 7.50, points: 4 },
    { result: 8.00, points: 3 },
    { result: 8.05, points: 2 },
    { result: 8.06, points: 1 }
],
      'Бег на лыжах 2 км (мин, с)': [
    { result: 13.43, points: 10 },
    { result: 14.00, points: 9 },
    { result: 14.16, points: 8 },
    { result: 14.33, points: 7 },
    { result: 14.50, points: 6 },
    { result: 14.53, points: 5 },
    { result: 14.56, points: 4 },
    { result: 15.00, points: 3 },
    { result: 15.03, points: 2 },
    { result: 15.04, points: 1 }

],
'Кросс 1500 м (мин, с)': [
    { result: 7.50, points: 10 },
    { result: 8.00, points: 9 },
    { result: 8.10, points: 8 },
    { result: 8.20, points: 7 },
    { result: 8.30, points: 6 },
    { result: 8.37, points: 5 },
    { result: 8.43, points: 4 },
    { result: 8.50, points: 3 },
    { result: 8.57, points: 2 },
    { result: 8.58, points: 1 }
],
},
'8 класс': {
        'Прыжок в длину с разбега (см)':  [
    { result: 269, points: 1 },
    { result: 270, points: 2 },
    { result: 290, points: 3 },
    { result: 310, points: 4 },
    { result: 330, points: 5 },
    { result: 350, points: 6 },
    { result: 360, points: 7 },
    { result: 370, points: 8 },
    { result: 380, points: 9 },
    { result: 390, points: 10 }
],
      'Прыжок в высоту с разбега (см)': [
    { result: 75, points: 1 },
    { result: 80, points: 2 },
    { result: 85, points: 3 },
    { result: 90, points: 4 },
    { result: 95, points: 5 },
    { result: 100, points: 6 },
    { result: 105, points: 7 },
    { result: 110, points: 8 },
    { result: 115, points: 9 },
    { result: 120, points: 10 }
  ],
  'Метание мяча 150 г с разбега (м)': [
    { result: 19, points: 1 },
    { result: 20, points: 2 },
    { result: 23, points: 3 },
    { result: 26, points: 4 },
    { result: 29, points: 5 },
    { result: 31, points: 6 },
    { result: 33, points: 7 },
    { result: 36, points: 8 },
    { result: 39, points: 9 },
    { result: 42, points: 10 }
  ],
  '6-минутный бег (м)': [
    { result: 1080, points: 1 },
    { result: 1100, points: 2 },
    { result: 1120, points: 3 },
    { result: 1150, points: 4 },
    { result: 1190, points: 5 },
    { result: 1220, points: 6 },
    { result: 1240, points: 7 },
    { result: 1270, points: 8 },
    { result: 1300, points: 9 },
    { result: 1360, points: 10 }
  ],
      'Бег 60 м (с)': [
    { result: 9.1, points: 10 },
    { result: 9.4, points: 9 },
    { result: 9.7, points: 8 },
    { result: 10.0, points: 7 },
    { result: 10.2, points: 6 },
    { result: 10.4, points: 5 },
    { result: 10.7, points: 4 },
    { result: 11.0, points: 3 },
    { result: 11.3, points: 2 },
    { result: 11.4, points: 1 }
],
'Бег 1500 м (мин, с)': [
    { result: 6.20, points: 10 },
    { result: 6.30, points: 9 },
    { result: 6.40, points: 8 },
    { result: 7.00, points: 7 },
    { result: 7.15, points: 6 },
    { result: 7.20, points: 5 },
    { result: 7.40, points: 4 },
    { result: 7.50, points: 3 },
    { result: 8.00, points: 2 },
    { result: 8.01, points: 1 }
],
      'Бег на лыжах 2 км (мин, с)': [
    { result: 12.40, points: 10 },
    { result: 13.00, points: 9 },
    { result: 13.20, points: 8 },
    { result: 13.40, points: 7 },
    { result: 14.00, points: 6 },
    { result: 14.10, points: 5 },
    { result: 14.20, points: 4 },
    { result: 14.30, points: 3 },
    { result: 14.40, points: 2 },
    { result: 14.41, points: 1 }
],
'Кросс 2000 м (мин, с)': [
    { result: 10.20, points: 10 },
    { result: 10.30, points: 9 },
    { result: 10.40, points: 8 },
    { result: 10.50, points: 7 },
    { result: 11.00, points: 6 },
    { result: 11.10, points: 5 },
    { result: 11.20, points: 4 },
    { result: 11.30, points: 3 },
    { result: 11.40, points: 2 },
    { result: 11.41, points: 1 }
],
},
'9 класс': {
        'Прыжок в длину с разбега (см)': [
    { result: 289, points: 1 },
  { result: 290, points: 2 },
  { result: 310, points: 3 },
  { result: 330, points: 4 },
  { result: 350, points: 5 },
  { result: 370, points: 6 },
  { result: 383, points: 7 },
  { result: 396, points: 8 },
  { result: 410, points: 9 },
  { result: 424, points: 10 }
],
      'Прыжок в высоту с разбега (см)': [
    { result: 80, points: 1 },
  { result: 85, points: 2 },
  { result: 90, points: 3 },
  { result: 95, points: 4 },
  { result: 100, points: 5 },
  { result: 105, points: 6 },
  { result: 110, points: 7 },
  { result: 115, points: 8 },
  { result: 120, points: 9 },
  { result: 125, points: 10 }

  ],
  'Метание мяча 150 г с разбега (м)': [
    { result: 24, points: 1 },
  { result: 25, points: 2 },
  { result: 28, points: 3 },
  { result: 31, points: 4 },
  { result: 34, points: 5 },
  { result: 37, points: 6 },
  { result: 38, points: 7 },
  { result: 40, points: 8 },
  { result: 42, points: 9 },
  { result: 44, points: 10 }
  ],
  '6-минутный бег (м)': [
    { result: 1080, points: 1 },
    { result: 1100, points: 2 },
    { result: 1130, points: 3 },
    { result: 1170, points: 4 },
    { result: 1220, points: 5 },
    { result: 1280, points: 6 },
    { result: 1300, points: 7 },
    { result: 1330, points: 8 },
    { result: 1370, points: 9 },
    { result: 1410, points: 10 }
  ],
      'Бег 60 м (с)': [
    { result: 8.5, points: 10 },
  { result: 8.8, points: 9 },
  { result: 9.1, points: 8 },
  { result: 9.4, points: 7 },
  { result: 9.7, points: 6 },
  { result: 10.0, points: 5 },
  { result: 10.3, points: 4 },
  { result: 10.5, points: 3 },
  { result: 10.7, points: 2 },
  { result: 10.8, points: 1 }
],
'Бег 2000 м (мин, с)': [
    { result: 8.04, points: 10 },
  { result: 8.30, points: 9 },
  { result: 8.58, points: 8 },
  { result: 9.24, points: 7 },
  { result: 9.50, points: 6 },
  { result: 10.08, points: 5 },
  { result: 10.24, points: 4 },
  { result: 10.40, points: 3 },
  { result: 10.56, points: 2 },
  { result: 10.57, points: 1 }
],
      'Бег на лыжах 3 км (мин, с)': [
    { result: 14.50, points: 10 },
  { result: 15.30, points: 9 },
  { result: 16.10, points: 8 },
  { result: 16.50, points: 7 },
  { result: 17.30, points: 6 },
  { result: 18.00, points: 5 },
  { result: 18.30, points: 4 },
  { result: 19.00, points: 3 },
  { result: 19.30, points: 2 },
  { result: 19.31, points: 1 }
],
'Кросс 3000 м (мин, с)': [
    { result: 15.10, points: 10 },
  { result: 15.30, points: 9 },
  { result: 15.50, points: 8 },
  { result: 16.10, points: 7 },
  { result: 16.30, points: 6 },
  { result: 16.50, points: 5 },
  { result: 17.10, points: 4 },
  { result: 17.30, points: 3 },
  { result: 17.50, points: 2 },
  { result: 17.51, points: 1 }
],
},
'10 класс': {
        'Прыжок в длину с разбега (см)': [
    { result: 303, points: 1 },
  { result: 304, points: 2 },
  { result: 330, points: 3 },
  { result: 356, points: 4 },
  { result: 382, points: 5 },
  { result: 410, points: 6 },
  { result: 423, points: 7 },
  { result: 436, points: 8 },
  { result: 450, points: 9 },
  { result: 463, points: 10 }
],
      'Прыжок в высоту с разбега (см)': [
    { result: 85, points: 1 },
  { result: 90, points: 2 },
  { result: 95, points: 3 },
  { result: 100, points: 4 },
  { result: 105, points: 5 },
  { result: 110, points: 6 },
  { result: 115, points: 7 },
  { result: 120, points: 8 },
  { result: 125, points: 9 },
  { result: 130, points: 10 }
  ],
  'Метание мяча 150 г с разбега (м)': [
    { result: 27, points: 1 },
  { result: 28, points: 2 },
  { result: 31, points: 3 },
  { result: 34, points: 4 },
  { result: 37, points: 5 },
  { result: 40, points: 6 },
  { result: 41, points: 7 },
  { result: 43, points: 8 },
  { result: 45, points: 9 },
  { result: 47, points: 10 }
  ],
  'Метание гранаты 700 г с разбега (м)': [
    { result: 20, points: 1 },
  { result: 21, points: 2 },
  { result: 22, points: 3 },
  { result: 23, points: 4 },
  { result: 24, points: 5 },
  { result: 26, points: 6 },
  { result: 28, points: 7 },
  { result: 30, points: 8 },
  { result: 32, points: 9 },
  { result: 34, points: 10 }
  ],
  '6-минутный бег (м)': [
    { result: 1170, points: 1 },
    { result: 1210, points: 2 },
    { result: 1250, points: 3 },
    { result: 1280, points: 4 },
    { result: 1300, points: 5 },
    { result: 1320, points: 6 },
    { result: 1350, points: 7 },
    { result: 1380, points: 8 },
    { result: 1400, points: 9 },
    { result: 1430, points: 10 }
  ],
  'Удержание ног в положении угла в упоре на брусьях (с)': [
    { result: 0, points: 1 },
    { result: 1, points: 5 },
    { result: 2, points: 6 },
    { result: 3, points: 7 },
    { result: 4, points: 8 },
  { result: 5, points: 9 },
  { result: 6, points: 10 }
  ],
  'Подъем переворотом на перекладине (раз)': [
      { result: 0, points: 1 },
      { result: 1, points: 7 },
  { result: 2, points: 8 },
  { result: 3, points: 9 },
  { result: 4, points: 10 }
  ],
  'Подъем силой на перекладине (раз)': [
  { result: 0, points: 1 },
  { result: 1, points: 7 },
{ result: 2, points: 8 },
{ result: 3, points: 9 },
{ result: 4, points: 10 }
],
  'Сгибание и разгибание рук в упоре на брусьях (раз)': [
      { result: 3, points: 1 },
  { result: 4, points: 2 },
  { result: 5, points: 3 },
  { result: 6, points: 4 },
  { result: 7, points: 5 },
  { result: 8, points: 6 },
  { result: 9, points: 7 },
  { result: 10, points: 8 },
  { result: 11, points: 9 },
  { result: 12, points: 10 }
  ],
      'Бег 100 м (с)': [
    { result: 13.9, points: 10 },
  { result: 14.2, points: 9 },
  { result: 14.5, points: 8 },
  { result: 14.7, points: 7 },
  { result: 14.9, points: 6 },
  { result: 15.1, points: 5 },
  { result: 15.3, points: 4 },
  { result: 15.5, points: 3 },
  { result: 15.7, points: 2 },
  { result: 15.8, points: 1 }
],
'Бег 3000 м (мин, с)': [
    { result: 13.20, points: 10 },
  { result: 14.05, points: 9 },
  { result: 14.45, points: 8 },
  { result: 15.25, points: 7 },
  { result: 16.05, points: 6 },
  { result: 16.50, points: 5 },
  { result: 17.40, points: 4 },
  { result: 18.30, points: 3 },
  { result: 19.20, points: 2 },
  { result: 19.21, points: 1 }
],
      'Бег на лыжах 3 км (мин, с)': [
    { result: 14.50, points: 10 },
  { result: 15.10, points: 9 },
  { result: 15.25, points: 8 },
  { result: 15.50, points: 7 },
  { result: 16.05, points: 6 },
  { result: 16.30, points: 5 },
  { result: 17.10, points: 4 },
  { result: 17.30, points: 3 },
  { result: 18.50, points: 2 },
  { result: 17.31, points: 1 }
],
'Бег на лыжах 5 км (мин, с)': [
    { result: 26.10, points: 10 },
  { result: 27.00, points: 9 },
  { result: 27.50, points: 8 },
  { result: 28.40, points: 7 },
  { result: 29.30, points: 6 },
  { result: 30.00, points: 5 },
  { result: 30.30, points: 4 },
  { result: 31.00, points: 3 },
  { result: 31.30, points: 2 },
  { result: 31.31, points: 1 }
],
'Кросс 3000 м (мин, с)': [
    { result: 13.30, points: 10 },
  { result: 14.15, points: 9 },
  { result: 14.55, points: 8 },
  { result: 15.35, points: 7 },
  { result: 16.15, points: 6 },
  { result: 17.05, points: 5 },
  { result: 17.55, points: 4 },
  { result: 18.50, points: 3 },
  { result: 19.45, points: 2 },
  { result: 19.46, points: 1 }
],
'Кросс 2000 м (мин, с)': [
    { result: 8.35, points: 10 },
  { result: 9.10, points: 9 },
  { result: 9.45, points: 8 },
  { result: 10.20, points: 7 },
  { result: 10.35, points: 6 },
  { result: 10.50, points: 5 },
  { result: 11.15, points: 4 },
  { result: 11.40, points: 3 },
  { result: 12.10, points: 2 },
  { result: 12.11, points: 1 }
],
},
'11 класс': {
        'Прыжок в длину с разбега (см)': [
    { result: 372, points: 1 },
  { result: 373, points: 2 },
  { result: 380, points: 3 },
  { result: 387, points: 4 },
  { result: 394, points: 5 },
  { result: 400, points: 6 },
  { result: 416, points: 7 },
  { result: 432, points: 8 },
  { result: 450, points: 9 },
  { result: 468, points: 10 }
],
'Прыжок в высоту с разбега (см)': [
{ result: 90, points: 1 },
{ result: 95, points: 2 },
{ result: 100, points: 3 },
{ result: 105, points: 4 },
{ result: 110, points: 5 },
{ result: 115, points: 6 },
{ result: 120, points: 7 },
{ result: 125, points: 8 },
{ result: 130, points: 9 },
{ result: 135, points: 10 }
],
  'Метание мяча 150 г с разбега (м)': [
    { result: 30, points: 1 },
  { result: 31, points: 2 },
  { result: 35, points: 3 },
  { result: 38, points: 4 },
  { result: 40, points: 5 },
  { result: 43, points: 6 },
  { result: 47, points: 7 },
  { result: 50, points: 8 },
  { result: 55, points: 9 },
  { result: 58, points: 10 }
  ],
  'Метание гранаты 700 г с разбега (м)': [
    { result: 23, points: 1 },
  { result: 24, points: 2 },
  { result: 26, points: 3 },
  { result: 28, points: 4 },
  { result: 30, points: 5 },
  { result: 32, points: 6 },
  { result: 34, points: 7 },
  { result: 36, points: 8 },
  { result: 38, points: 9 },
  { result: 40, points: 10 }
  ],
  '6-минутный бег (м)': [
    { result: 1080, points: 1 },
    { result: 1100, points: 2 },
    { result: 1170, points: 3 },
    { result: 1210, points: 4 },
    { result: 1300, points: 5 },
    { result: 1335, points: 6 },
    { result: 1370, points: 7 },
    { result: 1410, points: 8 },
    { result: 1460, points: 9 },
    { result: 1505, points: 10 }
  ],
  'Удержание ног в положении угла в упоре на брусьях (с)': [
    { result: 0, points: 1 },
  { result: 1, points: 2 },
  { result: 2, points: 3 },
  { result: 3, points: 4 },
  { result: 4, points: 5 },
  { result: 5, points: 6 },
  { result: 6, points: 7 },
  { result: 7, points: 8 },
  { result: 8, points: 9 },
  { result: 9, points: 10 }
  ],
  'Подъем переворотом на перекладине (раз)': [
      { result: 0, points: 1 },
  { result: 1, points: 6 },
  { result: 2, points: 7 },
  { result: 3, points: 8 },
  { result: 4, points: 9 },
  { result: 5, points: 10 }
  ],
  'Подъем силой на перекладине (раз)': [
  { result: 0, points: 1 },
  { result: 1, points: 6 },
  { result: 2, points: 7 },
  { result: 3, points: 8 },
  { result: 4, points: 9 },
  { result: 5, points: 10 }
  ],
  'Сгибание и разгибание рук в упоре на брусьях (раз)': [
      { result: 4, points: 1 },
  { result: 5, points: 2 },
  { result: 6, points: 3 },
  { result: 7, points: 4 },
  { result: 8, points: 5 },
  { result: 9, points: 6 },
  { result: 10, points: 7 },
  { result: 11, points: 8 },
  { result: 12, points: 9 },
  { result: 13, points: 10 }
  ],
      'Бег 100 м (с)': [
    { result: 13.8, points: 10 },
  { result: 14.0, points: 9 },
  { result: 14.3, points: 8 },
  { result: 14.5, points: 7 },
  { result: 14.8, points: 6 },
  { result: 15.1, points: 5 },
  { result: 15.4, points: 4 },
  { result: 15.5, points: 3 },
  { result: 15.6, points: 2 },
  { result: 15.7, points: 1 }
],
'Бег 3000 м (мин, с)': [
    { result: 14.30, points: 10 },
  { result: 14.50, points: 9 },
  { result: 15.10, points: 8 },
  { result: 15.35, points: 7 },
  { result: 15.55, points: 6 },
  { result: 16.20, points: 5 },
  { result: 16.40, points: 4 },
  { result: 17.00, points: 3 },
  { result: 17.20, points: 2 },
  { result: 17.21, points: 1 }
],
    'Бег на лыжах 5 км (мин, с)': [
    { result: 25.10, points: 10 },
  { result: 26.00, points: 9 },
  { result: 26.50, points: 8 },
  { result: 27.40, points: 7 },
  { result: 28.30, points: 6 },
  { result: 29.20, points: 5 },
  { result: 30.10, points: 4 },
  { result: 31.00, points: 3 },
  { result: 31.50, points: 2 },
  { result: 31.51, points: 1 }
],
'Кросс 3000 м (мин, с)': [
    { result: 12.50, points: 10 },
  { result: 13.30, points: 9 },
  { result: 14.10, points: 8 },
  { result: 14.50, points: 7 },
  { result: 15.30, points: 6 },
  { result: 16.00, points: 5 },
  { result: 16.25, points: 4 },
  { result: 16.50, points: 3 },
  { result: 17.20, points: 2 },
  { result: 17.21, points: 1 }
],
'Кросс 2000 м (мин, с)': [
      { result: 8.03, points: 10 },
  { result: 8.20, points: 9 },
  { result: 8.37, points: 8 },
  { result: 8.54, points: 7 },
  { result: 9.10, points: 6 },
  { result: 9.37, points: 5 },
  { result: 10.00, points: 4 },
  { result: 10.30, points: 3 },
  { result: 10.57, points: 2 },
  { result: 10.58, points: 1 }
],
},
        // Добавьте остальные возрастные группы
      },
      female: {
       '5 класс': {
        'Прыжок в длину с разбега (см)': [
    { result: 206, points: 1 },
    { result: 207, points: 2 },
    { result: 220, points: 3 },
    { result: 233, points: 4 },
    { result: 246, points: 5 },
    { result: 260, points: 6 },
    { result: 273, points: 7 },
    { result: 286, points: 8 },
    { result: 300, points: 9 },
    { result: 314, points: 10 }
],
'Прыжок в высоту с разбега (см)': [
{ result: 55, points: 1 },
{ result: 60, points: 2 },
{ result: 65, points: 3 },
{ result: 70, points: 4 },
    { result: 75, points: 5 },
    { result: 80, points: 6 },
    { result: 85, points: 7 },
    { result: 90, points: 8 },
    { result: 95, points: 9 },
    { result: 100, points: 10 }
],
'Метание мяча 150 г с разбега (м)': [
{ result: 11, points: 1 },
    { result: 12, points: 2 },
    { result: 13, points: 3 },
    { result: 14, points: 4 },
    { result: 15, points: 5 },
    { result: 16, points: 6 },
    { result: 17, points: 7 },
    { result: 18, points: 8 },
    { result: 19, points: 9 },
    { result: 20, points: 10 }
],
'6-минутный бег (м)': [
    { result: 845, points: 1 },
    { result: 880, points: 2 },
    { result: 910, points: 3 },
    { result: 950, points: 4 },
    { result: 990, points: 5 },
    { result: 1025, points: 6 },
    { result: 1080, points: 7 },
    { result: 1140, points: 8 },
    { result: 1210, points: 9 },
    { result: 1250, points: 10 }
  ],
'Подтягивание на низкой перекладине (раз)': [
{ result: 7, points: 1 },
{ result: 8, points: 2 },
    { result: 9, points: 3 },
    { result: 10, points: 4 },
    { result: 11, points: 5 },
    { result: 12, points: 6 },
    { result: 13, points: 7 },
    { result: 14, points: 8 },
    { result: 15, points: 9 },
    { result: 16, points: 10 }
      ],
      'Бег 60 м (с)': [
    { result: 10.2, points: 10 },
    { result: 10.4, points: 9 },
    { result: 10.5, points: 8 },
    { result: 10.6, points: 7 },
    { result: 10.8, points: 6 },
    { result: 11.0, points: 5 },
    { result: 11.2, points: 4 },
    { result: 11.4, points: 3 },
    { result: 11.6, points: 2 },
    { result: 11.7, points: 1 }
],
      'Бег на лыжах 1 км (мин, с)': [
    { result: 6.50, points: 10 },
    { result: 7.00, points: 9 },
    { result: 7.10, points: 8 },
    { result: 7.20, points: 7 },
    { result: 7.30, points: 6 },
    { result: 7.43, points: 5 },
    { result: 7.57, points: 4 },
    { result: 8.10, points: 3 },
    { result: 8.23, points: 2 },
    { result: 8.24, points: 1 }
],
'Кросс 1500 м (мин, с)': [
    { result: 8.46, points: 10 },
    { result: 9.00, points: 9 },
    { result: 9.14, points: 8 },
    { result: 9.27, points: 7 },
    { result: 9.40, points: 6 },
    { result: 9.57, points: 5 },
    { result: 10.14, points: 4 },
    { result: 10.30, points: 3 },
    { result: 10.46, points: 2 },
    { result: 10.47, points: 1 }
],
      },
      '6 класс': {
        'Прыжок в длину с разбега (см)': [
    { result: 210, points: 1 },
  { result: 211, points: 2 },
  { result: 225, points: 3 },
  { result: 240, points: 4 },
  { result: 255, points: 5 },
  { result: 270, points: 6 },
  { result: 282, points: 7 },
  { result: 293, points: 8 },
  { result: 305, points: 9 },
  { result: 317, points: 10 }
],
'Прыжок в высоту с разбега (см)': [
{ result: 60, points: 1 },
{ result: 65, points: 2 },
{ result: 70, points: 3 },
  { result: 75, points: 4 },
  { result: 80, points: 5 },
  { result: 85, points: 6 },
  { result: 90, points: 7 },
  { result: 95, points: 8 },
  { result: 100, points: 9 },
  { result: 105, points: 10 }
],
'Метание мяча 150 г с разбега (м)': [
 { result: 13, points: 1 },
  { result: 14, points: 2 },
  { result: 15, points: 3 },
  { result: 16, points: 4 },
  { result: 17, points: 5 },
  { result: 18, points: 6 },
  { result: 19, points: 7 },
  { result: 20, points: 8 },
  { result: 21, points: 9 },
  { result: 22, points: 10 }
],
'6-минутный бег (м)': [
    { result: 890, points: 1 },
    { result: 925, points: 2 },
    { result: 960, points: 3 },
    { result: 1000, points: 4 },
    { result: 1055, points: 5 },
    { result: 1095, points: 6 },
    { result: 1110, points: 7 },
    { result: 1130, points: 8 },
    { result: 1200, points: 9 },
    { result: 1240, points: 10 }
  ],
'Подтягивание на низкой перекладине (раз)': [
{ result: 6, points: 1 },
  { result: 7, points: 2 },
  { result: 8, points: 3 },
  { result: 9, points: 4 },
  { result: 11, points: 5 },
  { result: 12, points: 6 },
  { result: 13, points: 7 },
  { result: 15, points: 8 },
  { result: 16, points: 9 },
  { result: 17, points: 10 }
      ],
      'Бег 60 м (с)': [
    { result: 10.2, points: 10 },
    { result: 10.4, points: 9 },
    { result: 10.5, points: 8 },
    { result: 10.6, points: 7 },
    { result: 10.7, points: 6 },
    { result: 10.9, points: 5 },
    { result: 11.1, points: 4 },
    { result: 11.3, points: 3 },
    { result: 11.5, points: 2 },
    { result: 11.6, points: 1 }
],
'Бег 1500 м (мин, с)': [
    { result: 7.35, points: 10 },
    { result: 7.45, points: 9 },
    { result: 8.00, points: 8 },
    { result: 8.10, points: 7 },
    { result: 8.15, points: 6 },
    { result: 8.20, points: 5 },
    { result: 8.30, points: 4 },
    { result: 8.40, points: 3 },
    { result: 8.50, points: 2 },
    { result: 8.51, points: 1 }
],
      'Бег на лыжах 1,5 км (мин, с)': [
    { result: 10.35, points: 10 },
    { result: 10.45, points: 9 },
    { result: 10.55, points: 8 },
    { result: 11.05, points: 7 },
    { result: 11.15, points: 6 },
    { result: 11.27, points: 5 },
    { result: 11.39, points: 4 },
    { result: 11.50, points: 3 },
    { result: 12.02, points: 2 },
    { result: 12.03, points: 1 }

],
'Кросс 1500 м (мин, с)': [
    { result: 8.28, points: 10 },
    { result: 8.40, points: 9 },
    { result: 8.52, points: 8 },
    { result: 9.04, points: 7 },
    { result: 9.15, points: 6 },
    { result: 9.34, points: 5 },
    { result: 9.52, points: 4 },
    { result: 10.10, points: 3 },
    { result: 10.28, points: 2 },
    { result: 10.29, points: 1 }
],
      },
'7 класс': {
        'Прыжок в длину с разбега (см)': [
     { result: 213, points: 1 },
  { result: 214, points: 2 },
  { result: 230, points: 3 },
  { result: 246, points: 4 },
  { result: 263, points: 5 },
  { result: 280, points: 6 },
  { result: 290, points: 7 },
  { result: 300, points: 8 },
  { result: 310, points: 9 },
  { result: 320, points: 10 }
],
'Прыжок в высоту с разбега (см)': [
 { result: 60, points: 1 },
  { result: 65, points: 2 },
  { result: 70, points: 3 },
  { result: 75, points: 4 },
  { result: 80, points: 5 },
  { result: 85, points: 6 },
  { result: 90, points: 7 },
  { result: 95, points: 8 },
  { result: 100, points: 9 },
  { result: 105, points: 10 }
],
'Метание мяча 150 г с разбега (м)': [
  { result: 13, points: 1 },
  { result: 14, points: 2 },
  { result: 15, points: 3 },
  { result: 16, points: 4 },
  { result: 17, points: 5 },
  { result: 18, points: 6 },
  { result: 19, points: 7 },
  { result: 21, points: 8 },
  { result: 22, points: 9 },
  { result: 23, points: 10 }
],
'6-минутный бег (м)': [
    { result: 880, points: 1 },
    { result: 900, points: 2 },
    { result: 940, points: 3 },
    { result: 980, points: 4 },
    { result: 1030, points: 5 },
    { result: 1075, points: 6 },
    { result: 1090, points: 7 },
    { result: 1110, points: 8 },
    { result: 1180, points: 9 },
    { result: 1200, points: 10 }
  ],
'Подтягивание на низкой перекладине (раз)': [
{ result: 7, points: 1 },
  { result: 8, points: 2 },
  { result: 9, points: 3 },
  { result: 10, points: 4 },
  { result: 12, points: 5 },
  { result: 14, points: 6 },
  { result: 15, points: 7 },
  { result: 16, points: 8 },
  { result: 17, points: 9 },
  { result: 18, points: 10 }
      ],
      'Бег 60 м (с)': [
    { result: 10.2, points: 10 },
    { result: 10.3, points: 9 },
    { result: 10.4, points: 8 },
    { result: 10.5, points: 7 },
    { result: 10.6, points: 6 },
    { result: 10.8, points: 5 },
    { result: 11.0, points: 4 },
    { result: 11.2, points: 3 },
    { result: 11.4, points: 2 },
    { result: 11.5, points: 1 }
],
'Бег 1500 м (мин, с)': [
    { result: 7.05, points: 10 },
    { result: 7.15, points: 9 },
    { result: 7.30, points: 8 },
    { result: 7.45, points: 7 },
    { result: 7.55, points: 6 },
    { result: 8.10, points: 5 },
    { result: 8.20, points: 4 },
    { result: 8.30, points: 3 },
    { result: 8.40, points: 2 },
    { result: 8.41, points: 1 }
],
      'Бег на лыжах 2 км (мин, с)': [
    { result: 14.20, points: 10 },
    { result: 14.30, points: 9 },
    { result: 14.40, points: 8 },
    { result: 14.50, points: 7 },
    { result: 15.00, points: 6 },
    { result: 15.10, points: 5 },
    { result: 15.20, points: 4 },
    { result: 15.30, points: 3 },
    { result: 15.40, points: 2 },
    { result: 15.41, points: 1 }
],
'Кросс 1500 м (мин, с)': [
    { result: 8.10, points: 10 },
    { result: 8.20, points: 9 },
    { result: 8.30, points: 8 },
    { result: 8.40, points: 7 },
    { result: 8.50, points: 6 },
    { result: 9.10, points: 5 },
    { result: 9.30, points: 4 },
    { result: 9.50, points: 3 },
    { result: 10.10, points: 2 },
    { result: 10.11, points: 1 }
],
      },
'8 класс': {
        'Прыжок в длину с разбега (см)': [
     { result: 223, points: 1 },
  { result: 224, points: 2 },
  { result: 240, points: 3 },
  { result: 256, points: 4 },
  { result: 273, points: 5 },
  { result: 290, points: 6 },
  { result: 300, points: 7 },
  { result: 310, points: 8 },
  { result: 320, points: 9 },
  { result: 330, points: 10 }
],
'Прыжок в высоту с разбега (см)': [
 { result: 65, points: 1 },
 { result: 70, points: 2 },
  { result: 75, points: 3 },
  { result: 80, points: 4 },
  { result: 85, points: 5 },
  { result: 90, points: 6 },
  { result: 95, points: 7 },
  { result: 100, points: 8 },
  { result: 105, points: 9 },
  { result: 110, points: 10 }
],
'Метание мяча 150 г с разбега (м)': [
  { result: 14, points: 1 },
  { result: 15, points: 2 },
  { result: 16, points: 3 },
  { result: 17, points: 4 },
  { result: 18, points: 5 },
  { result: 19, points: 6 },
  { result: 20, points: 7 },
  { result: 22, points: 8 },
  { result: 24, points: 9 },
  { result: 26, points: 10 }
],
'6-минутный бег (м)': [
    { result: 840, points: 1 },
    { result: 870, points: 2 },
    { result: 900, points: 3 },
    { result: 930, points: 4 },
    { result: 1000, points: 5 },
    { result: 1050, points: 6 },
    { result: 1080, points: 7 },
    { result: 1100, points: 8 },
    { result: 1160, points: 9 },
    { result: 1190, points: 10 }
  ],
'Подтягивание на низкой перекладине (раз)': [
  { result: 9, points: 1 },
  { result: 10, points: 2 },
  { result: 11, points: 3 },
  { result: 12, points: 4 },
  { result: 13, points: 5 },
  { result: 15, points: 6 },
  { result: 16, points: 7 },
  { result: 17, points: 8 },
  { result: 19, points: 9 },
  { result: 21, points: 10 }
      ],
      'Бег 60 м (с)': [
    { result: 9.6, points: 10 },
    { result: 9.8, points: 9 },
    { result: 10.0, points: 8 },
    { result: 10.2, points: 7 },
    { result: 10.4, points: 6 },
    { result: 10.6, points: 5 },
    { result: 10.9, points: 4 },
    { result: 11.2, points: 3 },
    { result: 11.5, points: 2 },
    { result: 11.6, points: 1 }
],
'Бег 1500 м (мин, с)': [
    { result: 6.35, points: 10 },
    { result: 6.45, points: 9 },
    { result: 6.55, points: 8 },
    { result: 7.15, points: 7 },
    { result: 7.25, points: 6 },
    { result: 7.35, points: 5 },
    { result: 7.55, points: 4 },
    { result: 8.05, points: 3 },
    { result: 8.15, points: 2 },
    { result: 8.16, points: 1 }
],
      'Бег на лыжах 2 км (мин, с)': [
    { result: 13.50, points: 10 },
    { result: 14.00, points: 9 },
    { result: 14.10, points: 8 },
    { result: 14.20, points: 7 },
    { result: 14.30, points: 6 },
    { result: 14.40, points: 5 },
    { result: 14.50, points: 4 },
    { result: 15.00, points: 3 },
    { result: 15.10, points: 2 },
    { result: 15.11, points: 1 }
],
'Кросс 2000 м (мин, с)': [
    { result: 11.10, points: 10 },
    { result: 11.30, points: 9 },
    { result: 11.50, points: 8 },
    { result: 12.10, points: 7 },
    { result: 12.30, points: 6 },
    { result: 12.50, points: 5 },
    { result: 13.10, points: 4 },
    { result: 13.30, points: 3 },
    { result: 13.50, points: 2 },
    { result: 13.51, points: 1 }
],
      },
'9 класс': {
        'Прыжок в длину с разбега (см)': [
     { result: 243, points: 1 },
  { result: 244, points: 2 },
  { result: 260, points: 3 },
  { result: 276, points: 4 },
  { result: 292, points: 5 },
  { result: 310, points: 6 },
  { result: 326, points: 7 },
  { result: 342, points: 8 },
  { result: 360, points: 9 },
  { result: 376, points: 10 }
],
'Прыжок в высоту с разбега (см)': [
 { result: 70, points: 1 },
  { result: 75, points: 2 },
  { result: 80, points: 3 },
  { result: 85, points: 4 },
  { result: 90, points: 5 },
  { result: 95, points: 6 },
  { result: 100, points: 7 },
  { result: 105, points: 8 },
  { result: 110, points: 9 },
  { result: 115, points: 10 }
],
'Метание мяча 150 г с разбега (м)': [
  { result: 15, points: 1 },
  { result: 16, points: 2 },
  { result: 17, points: 3 },
  { result: 18, points: 4 },
  { result: 19, points: 5 },
  { result: 20, points: 6 },
  { result: 21, points: 7 },
  { result: 23, points: 8 },
  { result: 24, points: 9 },
  { result: 25, points: 10 }
],
'6-минутный бег (м)': [
    { result: 850, points: 1 },
    { result: 855, points: 2 },
    { result: 910, points: 3 },
    { result: 960, points: 4 },
    { result: 1000, points: 5 },
    { result: 1070, points: 6 },
    { result: 1100, points: 7 },
    { result: 1120, points: 8 },
    { result: 1180, points: 9 },
    { result: 1215, points: 10 }
  ],
'Подтягивание на низкой перекладине (раз)': [
  { result: 9, points: 1 },
  { result: 10, points: 2 },
  { result: 11, points: 3 },
  { result: 12, points: 4 },
  { result: 14, points: 5 },
  { result: 16, points: 6 },
  { result: 18, points: 7 },
  { result: 19, points: 8 },
  { result: 20, points: 9 },
  { result: 23, points: 10 }
      ],
      'Бег 60 м (с)': [
    { result: 9.5, points: 10 },
  { result: 9.7, points: 9 },
  { result: 9.9, points: 8 },
  { result: 10.1, points: 7 },
  { result: 10.2, points: 6 },
  { result: 10.3, points: 5 },
  { result: 10.5, points: 4 },
  { result: 10.7, points: 3 },
  { result: 10.9, points: 2 },
  { result: 11.0, points: 1 }
],
'Бег 1500 м (мин, с)': [
    { result: 6.15, points: 10 },
  { result: 6.25, points: 9 },
  { result: 6.35, points: 8 },
  { result: 6.55, points: 7 },
  { result: 7.05, points: 6 },
  { result: 7.15, points: 5 },
  { result: 7.35, points: 4 },
  { result: 7.45, points: 3 },
  { result: 7.55, points: 2 },
  { result: 7.56, points: 1 }
],
      'Бег на лыжах 3 км (мин, с)': [
    { result: 16.15, points: 10 },
  { result: 16.50, points: 9 },
  { result: 17.26, points: 8 },
  { result: 18.03, points: 7 },
  { result: 18.40, points: 6 },
  { result: 19.13, points: 5 },
  { result: 19.46, points: 4 },
  { result: 20.20, points: 3 },
  { result: 20.53, points: 2 },
  { result: 20.54, points: 1 }
],
'Кросс 2000 м (мин, с)': [
    { result: 11.00, points: 10 },
  { result: 11.20, points: 9 },
  { result: 11.35, points: 8 },
  { result: 11.50, points: 7 },
  { result: 12.10, points: 6 },
  { result: 12.45, points: 5 },
  { result: 13.10, points: 4 },
  { result: 13.30, points: 3 },
  { result: 13.50, points: 2 },
  { result: 13.51, points: 1 }
],
      },
'10 класс': {
        'Прыжок в длину с разбега (см)': [
     { result: 276, points: 1 },
  { result: 277, points: 2 },
  { result: 290, points: 3 },
  { result: 303, points: 4 },
  { result: 317, points: 5 },
  { result: 330, points: 6 },
  { result: 340, points: 7 },
  { result: 350, points: 8 },
  { result: 360, points: 9 },
  { result: 370, points: 10 }
],
'Прыжок в высоту с разбега (см)': [
 { result: 70, points: 1 },
  { result: 75, points: 2 },
  { result: 80, points: 3 },
  { result: 85, points: 4 },
  { result: 90, points: 5 },
  { result: 95, points: 6 },
  { result: 100, points: 7 },
  { result: 105, points: 8 },
  { result: 110, points: 9 },
  { result: 115, points: 10 }
],
'Метание мяча 150 г с разбега (м)': [
  { result: 14, points: 1 },
  { result: 15, points: 2 },
  { result: 16, points: 3 },
  { result: 18, points: 4 },
  { result: 19, points: 5 },
  { result: 21, points: 6 },
  { result: 23, points: 7 },
  { result: 24, points: 8 },
  { result: 25, points: 9 },
  { result: 26, points: 10 }
],
'6-минутный бег (м)': [
    { result: 910, points: 1 },
    { result: 980, points: 2 },
    { result: 1040, points: 3 },
    { result: 1090, points: 4 },
    { result: 1110, points: 5 },
    { result: 1130, points: 6 },
    { result: 1170, points: 7 },
    { result: 1200, points: 8 },
    { result: 1250, points: 9 },
    { result: 1285, points: 10 }
  ],
'Сгибание и разгибание рук в упоре лежа (раз)': [
  { result: 1, points: 1 },
  { result: 2, points: 2 },
  { result: 3, points: 3 },
  { result: 4, points: 4 },
  { result: 5, points: 5 },
  { result: 6, points: 6 },
  { result: 8, points: 7 },
  { result: 10, points: 8 },
  { result: 15, points: 9 },
  { result: 16, points: 10 }
      ],
'Подтягивание на низкой перекладине (раз)': [
  { result: 9, points: 1 },
  { result: 10, points: 2 },
  { result: 11, points: 3 },
  { result: 12, points: 4 },
  { result: 15, points: 5 },
  { result: 17, points: 6 },
  { result: 18, points: 7 },
  { result: 19, points: 8 },
  { result: 21, points: 9 },
  { result: 24, points: 10 }
      ],
      'Бег 100 м (с)': [
    { result: 15.7, points: 10 },
  { result: 16.0, points: 9 },
  { result: 16.3, points: 8 },
  { result: 16.5, points: 7 },
  { result: 16.7, points: 6 },
  { result: 17.0, points: 5 },
  { result: 17.2, points: 4 },
  { result: 17.4, points: 3 },
  { result: 17.6, points: 2 },
  { result: 17.7, points: 1 }
],
      'Бег на лыжах 3 км (мин, с)': [
    { result: 16.00, points: 10 },
  { result: 16.30, points: 9 },
  { result: 17.05, points: 8 },
  { result: 17.50, points: 7 },
  { result: 18.15, points: 6 },
  { result: 18.55, points: 5 },
  { result: 19.20, points: 4 },
  { result: 19.50, points: 3 },
  { result: 20.30, points: 2 },
  { result: 20.31, points: 1 }
],
'Кросс 2000 м (мин, с)': [
    { result: 10.32, points: 10 },
  { result: 11.00, points: 9 },
  { result: 11.28, points: 8 },
  { result: 11.54, points: 7 },
  { result: 12.20, points: 6 },
  { result: 12.40, points: 5 },
  { result: 13.00, points: 4 },
  { result: 13.20, points: 3 },
  { result: 13.40, points: 2 },
  { result: 13.41, points: 1 }
],
      },
'11 класс': {
        'Прыжок в длину с разбега (см)': [
     { result: 304, points: 1 },
  { result: 305, points: 2 },
  { result: 310, points: 3 },
  { result: 317, points: 4 },
  { result: 324, points: 5 },
  { result: 330, points: 6 },
  { result: 346, points: 7 },
  { result: 362, points: 8 },
  { result: 380, points: 9 },
  { result: 396, points: 10 }
],
'Прыжок в высоту с разбега (см)': [
 { result: 70, points: 1 },
  { result: 75, points: 2 },
  { result: 80, points: 3 },
  { result: 85, points: 4 },
  { result: 90, points: 5 },
  { result: 95, points: 6 },
  { result: 100, points: 7 },
  { result: 105, points: 8 },
  { result: 110, points: 9 },
  { result: 115, points: 10 }
],
'Метание мяча 150 г с разбега (м)': [
  { result: 15, points: 1 },
  { result: 16, points: 2 },
  { result: 17, points: 3 },
  { result: 18, points: 4 },
  { result: 20, points: 5 },
  { result: 22, points: 6 },
  { result: 24, points: 7 },
  { result: 26, points: 8 },
  { result: 28, points: 9 },
  { result: 29, points: 10 }
],
'6-минутный бег (м)': [
    { result: 895, points: 1 },
    { result: 930, points: 2 },
    { result: 990, points: 3 },
    { result: 1040, points: 4 },
    { result: 1090, points: 5 },
    { result: 1105, points: 6 },
    { result: 1145, points: 7 },
    { result: 1180, points: 8 },
    { result: 1200, points: 9 },
    { result: 1245, points: 10 }
  ],
'Сгибание и разгибание рук в упоре лежа (раз)': [
  { result: 1, points: 1 },
  { result: 2, points: 2 },
  { result: 3, points: 3 },
  { result: 4, points: 4 },
  { result: 5, points: 5 },
  { result: 6, points: 6 },
  { result: 9, points: 7 },
  { result: 12, points: 8 },
  { result: 15, points: 9 },
  { result: 18, points: 10 }
      ],
      'Бег 100 м (с)': [
    { result: 15.2, points: 10 },
  { result: 15.5, points: 9 },
  { result: 15.8, points: 8 },
  { result: 16.1, points: 7 },
  { result: 16.3, points: 6 },
  { result: 16.6, points: 5 },
  { result: 16.8, points: 4 },
  { result: 17.0, points: 3 },
  { result: 17.2, points: 2 },
  { result: 17.3, points: 1 }
],
      'Бег на лыжах 3 км (мин, с)': [
    { result: 16.00, points: 10 },
  { result: 16.30, points: 9 },
  { result: 17.05, points: 8 },
  { result: 17.50, points: 7 },
  { result: 18.15, points: 6 },
  { result: 18.55, points: 5 },
  { result: 19.20, points: 4 },
  { result: 19.50, points: 3 },
  { result: 20.30, points: 2 },
  { result: 20.31, points: 1 }
],
'Кросс 2000 м (мин, с)': [
    { result: 10.17, points: 10 },
  { result: 10.30, points: 9 },
  { result: 10.43, points: 8 },
  { result: 10.56, points: 7 },
  { result: 12.10, points: 6 },
  { result: 12.30, points: 5 },
  { result: 12.50, points: 4 },
  { result: 13.10, points: 3 },
  { result: 13.30, points: 2 },
  { result: 13.31, points: 1 }
],
      },
      }
    },
    positiveDirectionEvents: [
      'Прыжок в длину с разбега (см)',
      'Прыжок в высоту с разбега (см)',
      'Метание мяча 150 г с разбега (м)',
      'Подтягивание на низкой перекладине (раз)',
      'Метание гранаты 700 г с разбега (м)',
      'Удержание ног в положении угла в упоре на брусьях (с)',
      'Подъем переворотом на перекладине (раз)',
      'Подъем силой на перекладине (раз)',
      'Сгибание и разгибание рук в упоре на брусьях (раз)',
      'Сгибание и разгибание рук в упоре лежа (раз)',
      '6-минутный бег (м)',
    ]
  };
},
computed: {
  filteredEvents() {
    if (!this.age) return [];
    const ageGroup = this.scoringData[this.gender]?.[this.age];
    if (!ageGroup) return [];
    return this.events.filter(event => ageGroup.hasOwnProperty(event.name));
  },
  totalPoints() {
    return this.events.reduce((sum, event) => sum + event.points, 0);
  }
},
watch: {
  gender() {
    this.resetResults();
  },
  age() {
    this.resetResults();
  }
},
methods: {
  resetResults() {
    this.events.forEach(event => {
      event.result = 0;
      event.points = 0;
    });
  },
  calculatePoints(event) {
    // Проверяем, что результат — число и не пустой
if (event.result === null || event.result === undefined || event.result === '' || isNaN(event.result)) {
  event.points = 0;
  return;
}
     if (!this.age) {
      event.points = 0;
      return;
    }
    const ageGroup = this.scoringData[this.gender]?.[this.age];
    if (!ageGroup) {
      event.points = 0;
      return;
    }
    const scores = ageGroup[event.name];
    if (!scores || scores.length === 0) {
      event.points = 0;
      return;
    }

    const positiveDirection = this.positiveDirectionEvents.includes(event.name);
    let entry = null;

    if (positiveDirection) {
      // Ищем максимальный result <= введённому
      for (let i = scores.length - 1; i >= 0; i--) {
        if (event.result >= scores[i].result) {
          entry = scores[i];
          break;
        }
      }
    } else {
      // Ищем минимальный result >= введённому
      entry = scores.find(e => event.result <= e.result);
    }

    event.points = entry ? entry.points : 0;
  }
}
};
</script>

<style>
@media only screen and (max-width: 768px) {
.competition {
  padding: 20px;
}
.points {
  margin-top: 4px;
  font-weight: bold;
  color: #2c3e50;
}
.event-forms {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.event-form {
  margin-bottom: 20px;
}
label {
  width: 100%;
}
input[type="number"] {
  width: 100%;
  padding: 10px;
}
span {
  font-size: 16px;
}
}
</style>
