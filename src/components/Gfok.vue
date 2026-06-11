<template>
<div>
  <h2>ГФОК Республики Беларусь</h2>

  <label for="gender">Пол:</label>
  <select id="gender" v-model="gender" @change="resetResults">
    <option value="male">Мужской</option>
    <option value="female">Женский</option>
  </select>

  <label for="age">Возраст:</label>
  <select id="age" v-model="age" @change="resetResults">
    <option value="">Выберите возраст</option>
    <option v-for="ageOption in ageOptions" :key="ageOption" :value="ageOption">
      {{ ageOption }}
    </option>
  </select>

  <div v-if="!age" style="margin-top: 20px; color: red;">
    Пожалуйста, выберите возраст.
  </div>

  <div v-else>
    <div
      v-for="event in filteredEvents"
      :key="event.name"
      style="margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 5px;"
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
      <div style="color: #666; font-size: 0.9em;">Балл: {{ event.points }}</div>
    </div>

    <!-- Блок с информацией о значках -->
    <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px; text-align: center;">
  <h3 style="margin-top: 0;">Результат:</h3>
  <div v-if="allEventsCompleted">
    <p v-if="allEventsHaveMinPoints(9)" style="font-size: 18px; font-weight: bold; color: #DAA520;">
      ✅ <strong>ЗОЛОТОЙ</strong> значок
    </p>
    <p v-else-if="allEventsHaveMinPoints(7)" style="font-size: 18px; font-weight: bold; color: #A9A9A9;">
      ✅ <strong>СЕРЕБРЯНЫЙ</strong> значок
    </p>
    <p v-else-if="allEventsHaveMinPoints(5)" style="font-size: 18px; font-weight: bold; color: #8B7D6B;">
      ✅ <strong>БРОНЗОВЫЙ</strong> значок
    </p>
    <p v-else style="color: red; font-size: 18px;">
      Результаты недостаточные для получения значка.
    </p>
  </div>
  <div v-else>
    <p style="color: gray;">Введите результаты всех упражнений для определения значка.</p>
  </div>
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
    ageOptions: ['6 лет', '7 лет', '8 лет', '9 лет', '10 лет', '11 лет',
                 '12 лет', '13 лет', '14 лет', '15 лет', '16 лет',
                 '17-18 лет', '19-22 лет', '23-29 лет', '30-34 лет', '35-39 лет',
                 '40-44 лет', '45-49 лет', '50-54 лет', '55-59 лет', '60 лет и старше'],
    events: [
      { name: 'Прыжок в длину с места', result: 0, points: 0 },
      { name: 'Наклон вперед из положения сидя', result: 0, points: 0 },
      { name: 'Сгибание и разгибание рук в упоре лежа', result: 0, points: 0 },
      { name: 'Подтягивание на высокой перекладине', result: 0, points: 0 },
      { name: 'Поднимание туловища из положения лежа на спине', result: 0, points: 0 },
      { name: 'Челночный бег 4 х 9 м', result: 0, points: 0 },
      { name: 'Бег 30 м', result: 0, points: 0 },
      { name: 'Бег 800 м', result: 0, points: 0 },
      { name: 'Бег 1000 м', result: 0, points: 0 },
      { name: 'Бег 1500 м', result: 0, points: 0 },
      { name: 'Бег 3000 м', result: 0, points: 0 },
      { name: 'Бег 6 мин', result: 0, points: 0 }
    ],
    scoringData: {
   male: {
      '6 лет': {
      'Прыжок в длину с места': [
      { result: 94, points: 1 },
      { result: 95, points: 2 },
      { result: 105, points: 3 },
      { result: 110, points: 4 },
      { result: 115, points: 5 },
      { result: 119, points: 6 },
      { result: 121, points: 7 },
      { result: 126, points: 8 },
      { result: 130, points: 9 },
      { result: 140, points: 10 }
      ],
      'Наклон вперед из положения сидя': [
      { result: -10, points: 1 },
      { result: -9, points: 2 },
      { result: -6, points: 3 },
      { result: -4, points: 4 },
      { result: -2, points: 5 },
      { result: -1, points: 6 },
      { result: 0, points: 7 },
      { result: 2, points: 8 },
      { result: 4, points: 9 },
      { result: 6, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 0, points: 1 },
{ result: 1, points: 2 },
{ result: 4, points: 3 },
{ result: 5, points: 4 },
{ result: 6, points: 5 },
{ result: 8, points: 6 },
{ result: 9, points: 7 },
{ result: 10, points: 8 },
{ result: 12, points: 9 },
{ result: 15, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 0, points: 1 },
  { result: 1, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 11, points: 1 },
{ result: 12, points: 2 },
{ result: 14, points: 3 },
{ result: 15, points: 4 },
{ result: 16, points: 5 },
{ result: 17, points: 6 },
{ result: 18, points: 7 },
{ result: 19, points: 8 },
{ result: 20, points: 9 },
{ result: 22, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 11.9, points: 10 },
    { result: 12.0, points: 9 },
    { result: 12.4, points: 8 },
    { result: 12.6, points: 7 },
    { result: 12.7, points: 6 },
    { result: 12.9, points: 5 },
    { result: 13.1, points: 4 },
    { result: 13.4, points: 3 },
    { result: 13.7, points: 2 },
    { result: 14.1, points: 1 }
    ],
    'Бег 30 м': [
    { result: 6.2, points: 10 },
    { result: 6.3, points: 9 },
    { result: 6.5, points: 8 },
    { result: 6.6, points: 7 },
    { result: 6.8, points: 6 },
    { result: 6.9, points: 5 },
    { result: 7.0, points: 4 },
    { result: 7.1, points: 3 },
    { result: 7.3, points: 2 },
    { result: 7.6, points: 1 }
    ],
'Бег 1000 м': [
{ result: 5.28, points: 10 },
{ result: 5.29, points: 9 },
{ result: 5.40, points: 8 },
{ result: 6.04, points: 7 },
{ result: 6.09, points: 6 },
{ result: 6.15, points: 5 },
{ result: 6.24, points: 4 },
{ result: 6.35, points: 3 },
{ result: 7.05, points: 2 },
{ result: 7.27, points: 1 }
    ],
      // Добавьте другие виды спорта и результаты
    },
'7 лет': {
      'Прыжок в длину с места': [
      { result: 99, points: 1 },
      { result: 100, points: 2 },
      { result: 110, points: 3 },
      { result: 115, points: 4 },
      { result: 120, points: 5 },
      { result: 125, points: 6 },
      { result: 130, points: 7 },
      { result: 133, points: 8 },
      { result: 138, points: 9 },
      { result: 145, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -9, points: 1 },
{ result: -8, points: 2 },
{ result: -5, points: 3 },
{ result: -4, points: 4 },
{ result: -3, points: 5 },
{ result: -2, points: 6 },
{ result: 0, points: 7 },
{ result: 1, points: 8 },
{ result: 3, points: 9 },
{ result: 7, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 1, points: 1 },
{ result: 2, points: 2 },
{ result: 5, points: 3 },
{ result: 6, points: 4 },
{ result: 8, points: 5 },
{ result: 10, points: 6 },
{ result: 12, points: 7 },
{ result: 13, points: 8 },
{ result: 15, points: 9 },
{ result: 20, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 0, points: 1 },
{ result: 1, points: 8 },
{ result: 2, points: 9 },
{ result: 3, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 12, points: 1 },
{ result: 13, points: 2 },
{ result: 15, points: 3 },
{ result: 17, points: 4 },
{ result: 18, points: 5 },
{ result: 19, points: 6 },
{ result: 20, points: 7 },
{ result: 21, points: 8 },
{ result: 22, points: 9 },
{ result: 24, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 11.4, points: 10 },
    { result: 11.5, points: 9 },
    { result: 11.9, points: 8 },
    { result: 12.1, points: 7 },
    { result: 12.3, points: 6 },
    { result: 12.5, points: 5 },
    { result: 12.7, points: 4 },
    { result: 13.0, points: 3 },
    { result: 13.3, points: 2 },
    { result: 13.8, points: 1 }
    ],
    'Бег 30 м': [
    { result: 6.0, points: 10 },
    { result: 6.1, points: 9 },
    { result: 6.3, points: 8 },
    { result: 6.4, points: 7 },
    { result: 6.6, points: 6 },
    { result: 6.7, points: 5 },
    { result: 6.8, points: 4 },
    { result: 7.0, points: 3 },
    { result: 7.2, points: 2 },
    { result: 7.5, points: 1 }
    ],
'Бег 1000 м': [
{ result: 5.13, points: 10 },
{ result: 5.14, points: 9 },
{ result: 5.34, points: 8 },
{ result: 5.47, points: 7 },
{ result: 5.58, points: 6 },
{ result: 6.09, points: 5 },
{ result: 6.14, points: 4 },
{ result: 6.26, points: 3 },
{ result: 6.39, points: 2 },
{ result: 7.09, points: 1 }
    ],
},
    '8 лет': {
      'Прыжок в длину с места': [
      { result: 109, points: 1 },
      { result: 110, points: 2 },
      { result: 118, points: 3 },
      { result: 123, points: 4 },
      { result: 130, points: 5 },
      { result: 134, points: 6 },
      { result: 140, points: 7 },
      { result: 144, points: 8 },
      { result: 150, points: 9 },
      { result: 155, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -8, points: 1 },
{ result: -7, points: 2 },
{ result: -4, points: 3 },
{ result: -3, points: 4 },
{ result: -2, points: 5 },
{ result: 0, points: 6 },
{ result: 2, points: 7 },
{ result: 4, points: 8 },
{ result: 6, points: 9 },
{ result: 8, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 2, points: 1 },
{ result: 3, points: 2 },
{ result: 6, points: 3 },
{ result: 9, points: 4 },
{ result: 10, points: 5 },
{ result: 12, points: 6 },
{ result: 15, points: 7 },
{ result: 17, points: 8 },
{ result: 20, points: 9 },
{ result: 24, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 0, points: 1 },
{ result: 1, points: 7 },
{ result: 2, points: 8 },
{ result: 3, points: 9 },
{ result: 4, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 13, points: 1 },
{ result: 14, points: 2 },
{ result: 17, points: 3 },
{ result: 18, points: 4 },
{ result: 20, points: 5 },
{ result: 21, points: 6 },
{ result: 22, points: 7 },
{ result: 23, points: 8 },
{ result: 24, points: 9 },
{ result: 26, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 11.0, points: 10 },
    { result: 11.1, points: 9 },
    { result: 11.5, points: 8 },
    { result: 11.7, points: 7 },
    { result: 12.0, points: 6 },
    { result: 12.2, points: 5 },
    { result: 12.4, points: 4 },
    { result: 12.7, points: 3 },
    { result: 13.0, points: 2 },
    { result: 13.5, points: 1 }
    ],
    'Бег 30 м': [
    { result: 5.7, points: 10 },
    { result: 5.8, points: 9 },
    { result: 6.0, points: 8 },
    { result: 6.2, points: 7 },
    { result: 6.3, points: 6 },
    { result: 6.4, points: 5 },
    { result: 6.5, points: 4 },
    { result: 6.7, points: 3 },
    { result: 6.9, points: 2 },
    { result: 7.2, points: 1 }
    ],
'Бег 1000 м': [
{ result: 5.08, points: 10 },
{ result: 5.09, points: 9 },
{ result: 5.28, points: 8 },
{ result: 5.39, points: 7 },
{ result: 5.50, points: 6 },
{ result: 6.04, points: 5 },
{ result: 6.09, points: 4 },
{ result: 6.19, points: 3 },
{ result: 6.29, points: 2 },
{ result: 6.49, points: 1 }
    ],
},
'9 лет': {
      'Прыжок в длину с места': [
      { result: 122, points: 1 },
      { result: 123, points: 2 },
      { result: 131, points: 3 },
      { result: 139, points: 4 },
      { result: 142, points: 5 },
      { result: 146, points: 6 },
      { result: 150, points: 7 },
      { result: 155, points: 8 },
      { result: 160, points: 9 },
      { result: 170, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -7, points: 1 },
{ result: -6, points: 2 },
{ result: -3, points: 3 },
{ result: -1, points: 4 },
{ result: 1, points: 5 },
{ result: 2, points: 6 },
{ result: 3, points: 7 },
{ result: 5, points: 8 },
{ result: 7, points: 9 },
{ result: 9, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 4, points: 1 },
{ result: 5, points: 2 },
{ result: 9, points: 3 },
{ result: 11, points: 4 },
{ result: 14, points: 5 },
{ result: 15, points: 6 },
{ result: 18, points: 7 },
{ result: 20, points: 8 },
{ result: 23, points: 9 },
{ result: 29, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 0, points: 1 },
{ result: 1, points: 6 },
{ result: 2, points: 7 },
{ result: 3, points: 8 },
{ result: 4, points: 9 },
{ result: 5, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 16, points: 1 },
{ result: 17, points: 2 },
{ result: 19, points: 3 },
{ result: 20, points: 4 },
{ result: 21, points: 5 },
{ result: 22, points: 6 },
{ result: 24, points: 7 },
{ result: 25, points: 8 },
{ result: 26, points: 9 },
{ result: 28, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 10.6, points: 10 },
    { result: 10.7, points: 9 },
    { result: 11.0, points: 8 },
    { result: 11.3, points: 7 },
    { result: 11.5, points: 6 },
    { result: 11.6, points: 5 },
    { result: 11.8, points: 4 },
    { result: 12.0, points: 3 },
    { result: 12.1, points: 2 },
    { result: 12.5, points: 1 }
    ],
    'Бег 30 м': [
    { result: 5.4, points: 10 },
    { result: 5.5, points: 9 },
    { result: 5.7, points: 8 },
    { result: 5.8, points: 7 },
    { result: 6.0, points: 6 },
    { result: 6.1, points: 5 },
    { result: 6.2, points: 4 },
    { result: 6.3, points: 3 },
    { result: 6.5, points: 2 },
    { result: 6.7, points: 1 }
    ],
'Бег 1000 м': [
{ result: 4.44, points: 10 },
{ result: 4.45, points: 9 },
{ result: 5.04, points: 8 },
{ result: 5.19, points: 7 },
{ result: 5.26, points: 6 },
{ result: 5.36, points: 5 },
{ result: 5.47, points: 4 },
{ result: 6.03, points: 3 },
{ result: 6.19, points: 2 },
{ result: 6.39, points: 1 }
    ],
},
'10 лет': {
      'Прыжок в длину с места': [
      { result: 126, points: 1 },
      { result: 127, points: 2 },
      { result: 136, points: 3 },
      { result: 144, points: 4 },
      { result: 149, points: 5 },
      { result: 155, points: 6 },
      { result: 159, points: 7 },
      { result: 164, points: 8 },
      { result: 170, points: 9 },
      { result: 176, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -6, points: 1 },
{ result: -5, points: 2 },
{ result: -2, points: 3 },
{ result: 0, points: 4 },
{ result: 2, points: 5 },
{ result: 3, points: 6 },
{ result: 4, points: 7 },
{ result: 6, points: 8 },
{ result: 8, points: 9 },
{ result: 10, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 5, points: 1 },
{ result: 6, points: 2 },
{ result: 10, points: 3 },
{ result: 14, points: 4 },
{ result: 16, points: 5 },
{ result: 19, points: 6 },
{ result: 20, points: 7 },
{ result: 22, points: 8 },
{ result: 27, points: 9 },
{ result: 31, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 0, points: 1 },
{ result: 1, points: 5 },
{ result: 2, points: 6 },
{ result: 3, points: 7 },
{ result: 4, points: 8 },
{ result: 5, points: 9 },
{ result: 6, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 17, points: 1 },
{ result: 18, points: 2 },
{ result: 20, points: 3 },
{ result: 22, points: 4 },
{ result: 23, points: 5 },
{ result: 24, points: 6 },
{ result: 25, points: 7 },
{ result: 26, points: 8 },
{ result: 28, points: 9 },
{ result: 30, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 10.2, points: 10 },
    { result: 10.3, points: 9 },
    { result: 10.6, points: 8 },
    { result: 10.8, points: 7 },
    { result: 10.9, points: 6 },
    { result: 11.1, points: 5 },
    { result: 11.3, points: 4 },
    { result: 11.4, points: 3 },
    { result: 11.7, points: 2 },
    { result: 12.1, points: 1 }
    ],
    'Бег 30 м': [
    { result: 5.2, points: 10 },
    { result: 5.3, points: 9 },
    { result: 5.5, points: 8 },
    { result: 5.6, points: 7 },
    { result: 5.7, points: 6 },
    { result: 5.8, points: 5 },
    { result: 6.0, points: 4 },
    { result: 6.1, points: 3 },
    { result: 6.2, points: 2 },
    { result: 6.4, points: 1 }
    ],
'Бег 1000 м': [
{ result: 4.28, points: 10 },
{ result: 4.29, points: 9 },
{ result: 4.43, points: 8 },
{ result: 4.57, points: 7 },
{ result: 5.08, points: 6 },
{ result: 5.16, points: 5 },
{ result: 5.30, points: 4 },
{ result: 5.49, points: 3 },
{ result: 6.09, points: 2 },
{ result: 6.34, points: 1 }
    ],
},
'11 лет': {
      'Прыжок в длину с места': [
      { result: 138, points: 1 },
      { result: 139, points: 2 },
      { result: 148, points: 3 },
      { result: 156, points: 4 },
      { result: 161, points: 5 },
      { result: 166, points: 6 },
      { result: 170, points: 7 },
      { result: 175, points: 8 },
      { result: 181, points: 9 },
      { result: 188, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -5, points: 1 },
{ result: -4, points: 2 },
{ result: -1, points: 3 },
{ result: 1, points: 4 },
{ result: 3, points: 5 },
{ result: 4, points: 6 },
{ result: 5, points: 7 },
{ result: 7, points: 8 },
{ result: 9, points: 9 },
{ result: 11, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 9, points: 1 },
{ result: 10, points: 2 },
{ result: 15, points: 3 },
{ result: 18, points: 4 },
{ result: 20, points: 5 },
{ result: 22, points: 6 },
{ result: 25, points: 7 },
{ result: 28, points: 8 },
{ result: 31, points: 9 },
{ result: 38, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 0, points: 1 },
{ result: 1, points: 4 },
{ result: 2, points: 5 },
{ result: 3, points: 6 },
{ result: 4, points: 7 },
{ result: 5, points: 8 },
{ result: 7, points: 9 },
{ result: 9, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 31, points: 1 },
{ result: 32, points: 2 },
{ result: 37, points: 3 },
{ result: 39, points: 4 },
{ result: 41, points: 5 },
{ result: 43, points: 6 },
{ result: 45, points: 7 },
{ result: 47, points: 8 },
{ result: 50, points: 9 },
{ result: 54, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 9.8, points: 10 },
    { result: 9.9, points: 9 },
    { result: 10.1, points: 8 },
    { result: 10.3, points: 7 },
    { result: 10.5, points: 6 },
    { result: 10.7, points: 5 },
    { result: 10.9, points: 4 },
    { result: 11.0, points: 3 },
    { result: 11.3, points: 2 },
    { result: 11.7, points: 1 }
    ],
    'Бег 30 м': [
    { result: 5.0, points: 10 },
    { result: 5.1, points: 9 },
    { result: 5.2, points: 8 },
    { result: 5.3, points: 7 },
    { result: 5.4, points: 6 },
    { result: 5.5, points: 5 },
    { result: 5.7, points: 4 },
    { result: 5.8, points: 3 },
    { result: 5.9, points: 2 },
    { result: 6.2, points: 1 }
    ],
'Бег 1000 м': [
{ result: 4.10, points: 10 },
{ result: 4.11, points: 9 },
{ result: 4.23, points: 8 },
{ result: 4.34, points: 7 },
{ result: 4.46, points: 6 },
{ result: 4.57, points: 5 },
{ result: 5.09, points: 4 },
{ result: 5.21, points: 3 },
{ result: 5.39, points: 2 },
{ result: 6.09, points: 1 }
    ],
},
'12 лет': {
      'Прыжок в длину с места': [
      { result: 147, points: 1 },
      { result: 148, points: 2 },
      { result: 159, points: 3 },
      { result: 166, points: 4 },
      { result: 170, points: 5 },
      { result: 176, points: 6 },
      { result: 180, points: 7 },
      { result: 186, points: 8 },
      { result: 191, points: 9 },
      { result: 201, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -4, points: 1 },
{ result: -3, points: 2 },
{ result: 0, points: 3 },
{ result: 2, points: 4 },
{ result: 4, points: 5 },
{ result: 5, points: 6 },
{ result: 6, points: 7 },
{ result: 8, points: 8 },
{ result: 10, points: 9 },
{ result: 12, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 11, points: 1 },
{ result: 12, points: 2 },
{ result: 16, points: 3 },
{ result: 20, points: 4 },
{ result: 22, points: 5 },
{ result: 25, points: 6 },
{ result: 29, points: 7 },
{ result: 31, points: 8 },
{ result: 35, points: 9 },
{ result: 40, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 0, points: 1 },
{ result: 1, points: 3 },
{ result: 2, points: 4 },
{ result: 3, points: 5 },
{ result: 4, points: 6 },
{ result: 5, points: 7 },
{ result: 6, points: 8 },
{ result: 8, points: 9 },
{ result: 10, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 34, points: 1 },
{ result: 35, points: 2 },
{ result: 39, points: 3 },
{ result: 42, points: 4 },
{ result: 44, points: 5 },
{ result: 45, points: 6 },
{ result: 47, points: 7 },
{ result: 50, points: 8 },
{ result: 52, points: 9 },
{ result: 55, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 9.5, points: 10 },
    { result: 9.6, points: 9 },
    { result: 9.8, points: 8 },
    { result: 9.9, points: 7 },
    { result: 10.0, points: 6 },
    { result: 10.2, points: 5 },
    { result: 10.3, points: 4 },
    { result: 10.5, points: 3 },
    { result: 11.0, points: 2 },
    { result: 11.3, points: 1 }
    ],
    'Бег 30 м': [
    { result: 4.8, points: 10 },
    { result: 4.9, points: 9 },
    { result: 5.0, points: 8 },
    { result: 5.1, points: 7 },
    { result: 5.2, points: 6 },
    { result: 5.3, points: 5 },
    { result: 5.4, points: 4 },
    { result: 5.5, points: 3 },
    { result: 5.7, points: 2 },
    { result: 5.9, points: 1 }
    ],
'Бег 1000 м': [
{ result: 3.57, points: 10 },
{ result: 3.58, points: 9 },
{ result: 4.08, points: 8 },
{ result: 4.17, points: 7 },
{ result: 4.26, points: 6 },
{ result: 4.37, points: 5 },
{ result: 4.49, points: 4 },
{ result: 5.05, points: 3 },
{ result: 5.22, points: 2 },
{ result: 5.52, points: 1 }
    ],
},
'13 лет': {
      'Прыжок в длину с места': [
      { result: 160, points: 1 },
      { result: 161, points: 2 },
      { result: 171, points: 3 },
      { result: 178, points: 4 },
      { result: 185, points: 5 },
      { result: 191, points: 6 },
      { result: 196, points: 7 },
      { result: 203, points: 8 },
      { result: 210, points: 9 },
      { result: 220, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -3, points: 1 },
{ result: -2, points: 2 },
{ result: 1, points: 3 },
{ result: 4, points: 4 },
{ result: 6, points: 5 },
{ result: 7, points: 6 },
{ result: 8, points: 7 },
{ result: 9, points: 8 },
{ result: 11, points: 9 },
{ result: 13, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 14, points: 1 },
{ result: 15, points: 2 },
{ result: 20, points: 3 },
{ result: 24, points: 4 },
{ result: 26, points: 5 },
{ result: 30, points: 6 },
{ result: 31, points: 7 },
{ result: 34, points: 8 },
{ result: 38, points: 9 },
{ result: 44, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 0, points: 1 },
{ result: 1, points: 2 },
{ result: 2, points: 3 },
{ result: 3, points: 4 },
{ result: 4, points: 5 },
{ result: 6, points: 6 },
{ result: 7, points: 7 },
{ result: 8, points: 8 },
{ result: 10, points: 9 },
{ result: 12, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 35, points: 1 },
{ result: 36, points: 2 },
{ result: 40, points: 3 },
{ result: 43, points: 4 },
{ result: 45, points: 5 },
{ result: 47, points: 6 },
{ result: 49, points: 7 },
{ result: 51, points: 8 },
{ result: 53, points: 9 },
{ result: 56, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 9.3, points: 10 },
    { result: 9.4, points: 9 },
    { result: 9.6, points: 8 },
    { result: 9.7, points: 7 },
    { result: 9.9, points: 6 },
    { result: 10.0, points: 5 },
    { result: 10.1, points: 4 },
    { result: 10.2, points: 3 },
    { result: 10.5, points: 2 },
    { result: 10.8, points: 1 }
    ],
    'Бег 30 м': [
    { result: 4.6, points: 10 },
    { result: 4.7, points: 9 },
    { result: 4.8, points: 8 },
    { result: 4.9, points: 7 },
    { result: 5.0, points: 6 },
    { result: 5.1, points: 5 },
    { result: 5.2, points: 4 },
    { result: 5.3, points: 3 },
    { result: 5.4, points: 2 },
    { result: 5.6, points: 1 }
    ],
'Бег 1000 м': [
{ result: 3.51, points: 10 },
{ result: 3.52, points: 9 },
{ result: 4.03, points: 8 },
{ result: 4.08, points: 7 },
{ result: 4.16, points: 6 },
{ result: 4.25, points: 5 },
{ result: 4.36, points: 4 },
{ result: 4.54, points: 3 },
{ result: 5.19, points: 2 },
{ result: 5.56, points: 1 }
    ],
},
'14 лет': {
      'Прыжок в длину с места': [
      { result: 176, points: 1 },
      { result: 177, points: 2 },
      { result: 187, points: 3 },
      { result: 197, points: 4 },
      { result: 202, points: 5 },
      { result: 208, points: 6 },
      { result: 214, points: 7 },
      { result: 218, points: 8 },
      { result: 227, points: 9 },
      { result: 235, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -2, points: 1 },
{ result: -1, points: 2 },
{ result: 2, points: 3 },
{ result: 5, points: 4 },
{ result: 6, points: 5 },
{ result: 8, points: 6 },
{ result: 9, points: 7 },
{ result: 11, points: 8 },
{ result: 12, points: 9 },
{ result: 14, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 18, points: 1 },
{ result: 19, points: 2 },
{ result: 24, points: 3 },
{ result: 27, points: 4 },
{ result: 30, points: 5 },
{ result: 33, points: 6 },
{ result: 35, points: 7 },
{ result: 38, points: 8 },
{ result: 41, points: 9 },
{ result: 47, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 1, points: 1 },
{ result: 2, points: 2 },
{ result: 3, points: 3 },
{ result: 5, points: 4 },
{ result: 7, points: 5 },
{ result: 8, points: 6 },
{ result: 10, points: 7 },
{ result: 11, points: 8 },
{ result: 12, points: 9 },
{ result: 15, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 38, points: 1 },
{ result: 39, points: 2 },
{ result: 43, points: 3 },
{ result: 45, points: 4 },
{ result: 47, points: 5 },
{ result: 49, points: 6 },
{ result: 51, points: 7 },
{ result: 53, points: 8 },
{ result: 55, points: 9 },
{ result: 58, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 9.0, points: 10 },
    { result: 9.1, points: 9 },
    { result: 9.3, points: 8 },
    { result: 9.5, points: 7 },
    { result: 9.6, points: 6 },
    { result: 9.8, points: 5 },
    { result: 9.9, points: 4 },
    { result: 10.0, points: 3 },
    { result: 10.2, points: 2 },
    { result: 10.5, points: 1 }
    ],
    'Бег 30 м': [
    { result: 4.5, points: 10 },
    { result: 4.6, points: 9 },
    { result: 4.7, points: 8 },
    { result: 4.8, points: 7 },
    { result: 4.9, points: 6 },
    { result: 5.0, points: 5 },
    { result: 5.1, points: 4 },
    { result: 5.2, points: 3 },
    { result: 5.3, points: 2 },
    { result: 5.4, points: 1 }
    ],
'Бег 1000 м': [
{ result: 3.45, points: 10 },
{ result: 3.46, points: 9 },
{ result: 3.56, points: 8 },
{ result: 4.05, points: 7 },
{ result: 4.14, points: 6 },
{ result: 4.21, points: 5 },
{ result: 4.26, points: 4 },
{ result: 4.48, points: 3 },
{ result: 5.14, points: 2 },
{ result: 5.50, points: 1 }
    ],
},
'15 лет': {
      'Прыжок в длину с места': [
      { result: 192, points: 1 },
      { result: 193, points: 2 },
      { result: 203, points: 3 },
      { result: 212, points: 4 },
      { result: 217, points: 5 },
      { result: 222, points: 6 },
      { result: 227, points: 7 },
      { result: 231, points: 8 },
      { result: 237, points: 9 },
      { result: 244, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -1, points: 1 },
{ result: 0, points: 2 },
{ result: 4, points: 3 },
{ result: 6, points: 4 },
{ result: 8, points: 5 },
{ result: 10, points: 6 },
{ result: 11, points: 7 },
{ result: 12, points: 8 },
{ result: 14, points: 9 },
{ result: 16, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 20, points: 1 },
{ result: 21, points: 2 },
{ result: 27, points: 3 },
{ result: 30, points: 4 },
{ result: 33, points: 5 },
{ result: 35, points: 6 },
{ result: 39, points: 7 },
{ result: 41, points: 8 },
{ result: 45, points: 9 },
{ result: 50, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 2, points: 1 },
{ result: 3, points: 2 },
{ result: 6, points: 3 },
{ result: 8, points: 4 },
{ result: 9, points: 5 },
{ result: 11, points: 6 },
{ result: 12, points: 7 },
{ result: 13, points: 8 },
{ result: 15, points: 9 },
{ result: 17, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 40, points: 1 },
{ result: 41, points: 2 },
{ result: 45, points: 3 },
{ result: 47, points: 4 },
{ result: 50, points: 5 },
{ result: 51, points: 6 },
{ result: 53, points: 7 },
{ result: 55, points: 8 },
{ result: 57, points: 9 },
{ result: 60, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 8.9, points: 10 },
    { result: 9.0, points: 9 },
    { result: 9.1, points: 8 },
    { result: 9.3, points: 7 },
    { result: 9.4, points: 6 },
    { result: 9.5, points: 5 },
    { result: 9.6, points: 4 },
    { result: 9.8, points: 3 },
    { result: 10.0, points: 2 },
    { result: 10.2, points: 1 }
    ],
    'Бег 30 м': [
    { result: 4.4, points: 10 },
    { result: 4.5, points: 9 },
    { result: 4.6, points: 8 },
    { result: 4.7, points: 7 },
    { result: 4.8, points: 6 },
    { result: 4.9, points: 5 },
    { result: 5.0, points: 4 },
    { result: 5.1, points: 3 },
    { result: 5.2, points: 2 },
    { result: 5.3, points: 1 }
    ],
'Бег 1500 м': [
{ result: 5.35, points: 10 },
{ result: 5.36, points: 9 },
{ result: 5.47, points: 8 },
{ result: 5.56, points: 7 },
{ result: 6.06, points: 6 },
{ result: 6.12, points: 5 },
{ result: 6.21, points: 4 },
{ result: 6.30, points: 3 },
{ result: 6.45, points: 2 },
{ result: 7.04, points: 1 }
    ],
},
'16 лет': {
      'Прыжок в длину с места': [
{ result: 200, points: 1 },
{ result: 201, points: 2 },
{ result: 212, points: 3 },
{ result: 217, points: 4 },
{ result: 224, points: 5 },
{ result: 229, points: 6 },
{ result: 234, points: 7 },
{ result: 238, points: 8 },
{ result: 244, points: 9 },
{ result: 252, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 0, points: 1 },
{ result: 1, points: 2 },
{ result: 5, points: 3 },
{ result: 7, points: 4 },
{ result: 9, points: 5 },
{ result: 11, points: 6 },
{ result: 12, points: 7 },
{ result: 14, points: 8 },
{ result: 16, points: 9 },
{ result: 18, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 22, points: 1 },
{ result: 23, points: 2 },
{ result: 28, points: 3 },
{ result: 32, points: 4 },
{ result: 35, points: 5 },
{ result: 39, points: 6 },
{ result: 41, points: 7 },
{ result: 43, points: 8 },
{ result: 48, points: 9 },
{ result: 53, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 3, points: 1 },
{ result: 4, points: 2 },
{ result: 7, points: 3 },
{ result: 9, points: 4 },
{ result: 10, points: 5 },
{ result: 12, points: 6 },
{ result: 13, points: 7 },
{ result: 14, points: 8 },
{ result: 16, points: 9 },
{ result: 18, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 41, points: 1 },
{ result: 42, points: 2 },
{ result: 46, points: 3 },
{ result: 48, points: 4 },
{ result: 51, points: 5 },
{ result: 52, points: 6 },
{ result: 54, points: 7 },
{ result: 56, points: 8 },
{ result: 58, points: 9 },
{ result: 61, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 8.7, points: 10 },
    { result: 8.8, points: 9 },
    { result: 8.9, points: 8 },
    { result: 9.0, points: 7 },
    { result: 9.1, points: 6 },
    { result: 9.2, points: 5 },
    { result: 9.3, points: 4 },
    { result: 9.4, points: 3 },
    { result: 9.9, points: 2 },
    { result: 10.1, points: 1 }
    ],
    'Бег 30 м': [
    { result: 4.3, points: 10 },
    { result: 4.4, points: 9 },
    { result: 4.5, points: 8 },
    { result: 4.6, points: 7 },
    { result: 4.7, points: 6 },
    { result: 4.8, points: 5 },
    { result: 4.9, points: 4 },
    { result: 5.0, points: 3 },
    { result: 5.1, points: 2 },
    { result: 5.2, points: 1 }
    ],
'Бег 1500 м': [
        { result: 5.03, points: 10 },
        { result: 5.04, points: 9 },
        { result: 5.19, points: 8 },
        { result: 5.34, points: 7 },
        { result: 5.41, points: 6 },
        { result: 5.50, points: 5 },
        { result: 6.01, points: 4 },
        { result: 6.11, points: 3 },
        { result: 6.24, points: 2 },
        { result: 6.47, points: 1 }
    ],
},
'17-18 лет': {
      'Прыжок в длину с места': [
      { result: 208, points: 1 },
      { result: 209, points: 2 },
      { result: 218, points: 3 },
      { result: 227, points: 4 },
      { result: 232, points: 5 },
      { result: 237, points: 6 },
      { result: 240, points: 7 },
      { result: 246, points: 8 },
      { result: 250, points: 9 },
      { result: 257, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 2, points: 1 },
{ result: 3, points: 2 },
{ result: 6, points: 3 },
{ result: 8, points: 4 },
{ result: 10, points: 5 },
{ result: 12, points: 6 },
{ result: 13, points: 7 },
{ result: 15, points: 8 },
{ result: 17, points: 9 },
{ result: 19, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 25, points: 1 },
{ result: 26, points: 2 },
{ result: 32, points: 3 },
{ result: 35, points: 4 },
{ result: 38, points: 5 },
{ result: 40, points: 6 },
{ result: 44, points: 7 },
{ result: 47, points: 8 },
{ result: 49, points: 9 },
{ result: 54, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 4, points: 1 },
{ result: 5, points: 2 },
{ result: 8, points: 3 },
{ result: 10, points: 4 },
{ result: 11, points: 5 },
{ result: 13, points: 6 },
{ result: 14, points: 7 },
{ result: 15, points: 8 },
{ result: 17, points: 9 },
{ result: 19, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 36, points: 1 },
{ result: 37, points: 2 },
{ result: 42, points: 3 },
{ result: 44, points: 4 },
{ result: 47, points: 5 },
{ result: 48, points: 6 },
{ result: 50, points: 7 },
{ result: 51, points: 8 },
{ result: 53, points: 9 },
{ result: 57, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 8.6, points: 10 },
    { result: 8.7, points: 9 },
    { result: 8.8, points: 8 },
    { result: 9.0, points: 7 },
    { result: 9.1, points: 6 },
    { result: 9.2, points: 5 },
    { result: 9.3, points: 4 },
    { result: 9.5, points: 3 },
    { result: 9.8, points: 2 },
    { result: 10.0, points: 1 }
    ],
    'Бег 30 м': [
    { result: 4.2, points: 10 },
    { result: 4.3, points: 9 },
    { result: 4.4, points: 8 },
    { result: 4.5, points: 7 },
    { result: 4.6, points: 6 },
    { result: 4.7, points: 5 },
    { result: 4.8, points: 4 },
    { result: 4.9, points: 3 },
    { result: 5.0, points: 2 },
    { result: 5.1, points: 1 }
    ],
'Бег 1500 м': [
{ result: 5.03, points: 10 },
{ result: 5.04, points: 9 },
{ result: 5.19, points: 8 },
{ result: 5.34, points: 7 },
{ result: 5.41, points: 6 },
{ result: 5.50, points: 5 },
{ result: 6.01, points: 4 },
{ result: 6.11, points: 3 },
{ result: 6.24, points: 2 },
{ result: 6.47, points: 1 }
    ],
},
'19-22 лет': {
      'Прыжок в длину с места': [
      { result: 211, points: 1},
      { result: 212, points: 2},
      { result: 220, points: 3},
      { result: 229, points: 4},
      { result: 234, points: 5},
      { result: 239, points: 6},
      { result: 242, points:  7},
      { result: 248, points: 8},
      { result: 252, points: 9},
      { result: 259, points: 10}
],
'Наклон вперед из положения сидя': [
{ result: 3, points: 1 },
{ result: 4, points: 2 },
{ result: 7, points: 3 },
{ result: 9, points: 4 },
{ result: 11, points: 5 },
{ result: 13, points: 6 },
{ result: 14, points: 7 },
{ result: 16, points: 8 },
{ result: 18, points: 9 },
{ result: 21, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 28, points: 1 },
{ result: 29, points: 2 },
{ result: 34, points: 3 },
{ result: 39, points: 4 },
{ result: 41, points: 5 },
{ result: 44, points: 6 },
{ result: 46, points: 7 },
{ result: 49, points: 8 },
{ result: 54, points: 9 },
{ result: 59, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 6, points: 1 },
{ result: 7, points: 2 },
{ result: 10, points: 3 },
{ result: 11, points: 4 },
{ result: 12, points: 5 },
{ result: 14, points: 6 },
{ result: 15, points: 7 },
{ result: 16, points: 8 },
{ result: 19, points: 9 },
{ result: 21, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 35, points: 1 },
{ result: 36, points: 2 },
{ result: 40, points: 3 },
{ result: 42, points: 4 },
{ result: 44, points: 5 },
{ result: 46, points: 6 },
{ result: 48, points: 7 },
{ result: 49, points: 8 },
{ result: 52, points: 9 },
{ result: 56, points:10 }
    ],
    'Челночный бег 4 х 9 м': [
        { result: 8.9, points: 10 },
        { result: 9.0, points: 9 },
        { result: 9.2, points: 8 },
        { result: 9.3, points: 7 },
        { result: 9.4, points: 6 },
        { result: 9.5, points: 5 },
        { result: 9.7, points: 4 },
        { result: 9.8, points: 3 },
        { result: 10.0, points: 2 },
        { result: 10.2, points: 1 }
    ],
    'Бег 30 м': [
        { result: 4.3, points: 10 },
        { result: 4.4, points: 9 },
        { result: 4.5, points: 8 },
        { result: 4.6, points: 7 },
        { result: 4.7, points: 6 },
        { result: 4.8, points: 5 },
        { result: 4.9, points: 4 },
        { result: 5.0, points: 3 },
        { result: 5.1, points: 2 },
        { result: 5.2, points: 1 }
    ],
'Бег 3000 м': [
        { result: 12.12, points: 10 },
        { result: 12.13, points: 9 },
        { result: 12.17, points: 8 },
        { result: 12.43, points: 7 },
        { result: 13.03, points: 6 },
        { result: 13.12, points: 5 },
        { result: 13.21, points: 4 },
        { result: 13.38, points: 3 },
        { result: 13.56, points: 2 },
        { result: 14.11, points: 1 }
    ],
},
'23-29 лет': {
      'Прыжок в длину с места': [
      { result: 201 , points: 1 },
      { result: 202 , points: 2 },
      { result: 212 , points: 3 },
      { result: 222 , points: 4 },
      { result: 226 , points: 5 },
      { result: 230 , points: 6 },
      { result: 234 , points: 7 },
      { result: 240 , points: 8 },
      { result: 246 , points: 9 },
      { result: 252 , points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 1, points: 1 },
{ result: 2, points: 2 },
{ result: 5, points: 3 },
{ result: 7, points: 4 },
{ result: 9, points: 5 },
{ result: 11, points: 6 },
{ result: 12, points: 7 },
{ result: 14, points: 8 },
{ result: 16, points: 9 },
{ result: 19, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
  { result: 28 , points: 1 },
  { result: 29 , points: 2 },
  { result: 32 , points: 3 },
  { result: 37 , points: 4 },
  { result: 39 , points: 5 },
  { result: 42 , points: 6 },
  { result: 45 , points: 7 },
  { result: 47 , points: 8 },
  { result: 53 , points: 9 },
  { result: 57 , points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 4, points: 1 },
{ result: 5, points: 2 },
{ result: 8, points: 3 },
{ result: 9, points: 4 },
{ result: 10, points: 5 },
{ result: 11, points: 6 },
{ result: 13, points: 7 },
{ result: 14, points: 8 },
{ result: 16, points: 9 },
{ result: 19, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 9.0 , points: 10 },
    { result: 9.1 , points: 9 },
    { result: 9.3 , points: 8 },
    { result: 9.4 , points: 7 },
    { result: 9.6 , points: 6 },
    { result: 9.8 , points: 5 },
    { result: 10.0, points: 4 },
    { result: 10.2, points: 3 },
    { result: 10.4, points: 2 },
    { result: 10.6, points: 1 }
    ],
    'Бег 30 м': [
    { result: 4.4 , points: 10 },
    { result: 4.5 , points: 9 },
    { result: 4.6 , points: 8 },
    { result: 4.7 , points: 7 },
    { result: 4.8 , points: 6 },
    { result: 4.9 , points: 5 },
    { result: 5.0 , points: 4 },
    { result: 5.1 , points: 3 },
    { result: 5.2 , points: 2 },
    { result: 5.3 , points: 1 }
    ],
'Бег 3000 м': [
        { result: 11.50, points: 10 },
        { result: 11.51, points: 9 },
        { result: 11.56, points: 8 },
        { result: 12.44, points: 7 },
        { result: 12.47, points: 6 },
        { result: 13.06, points: 5 },
        { result: 13.11, points: 4 },
        { result: 13.15, points: 3 },
        { result: 13.41, points: 2 },
        { result: 13.51, points: 1 }
    ],
'Бег 6 мин': [
{ result: 1140 , points: 1 },
{ result: 1150 , points: 2 },
{ result: 1220 , points: 3 },
{ result: 1270 , points: 4 },
{ result: 1310 , points: 5 },
{ result: 1350 , points: 6 },
{ result: 1400 , points: 7 },
{ result: 1450 , points: 8 },
{ result: 1510 , points: 9 },
{ result: 1620 , points: 10 }
    ],
},
'30-34 лет': {
      'Прыжок в длину с места': [
{ result: 195, points: 1 },
{ result: 196, points: 2 },
{ result: 203, points: 3 },
{ result: 210, points: 4 },
{ result: 216, points: 5 },
{ result: 222, points: 6 },
{ result: 227, points: 7 },
{ result: 232, points: 8 },
{ result: 242, points: 9 },
{ result: 247, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 0, points: 1 },
{ result: 1, points: 2 },
{ result: 4, points: 3 },
{ result: 6, points: 4 },
{ result: 8, points: 5 },
{ result: 10, points: 6 },
{ result: 11, points: 7 },
{ result: 12, points: 8 },
{ result: 15, points: 9 },
{ result: 18, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 14, points: 1 },
{ result: 15, points: 2 },
{ result: 17, points: 3 },
{ result: 20, points: 4 },
{ result: 22, points: 5 },
{ result: 30, points: 6 },
{ result: 31, points: 7 },
{ result: 35, points: 8 },
{ result: 42, points: 9 },
{ result: 46, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 3, points: 1 },
{ result: 4, points: 2 },
{ result: 5, points: 3 },
{ result: 7, points: 4 },
{ result: 8, points: 5 },
{ result: 10, points: 6 },
{ result: 12, points: 7 },
{ result: 13, points: 8 },
{ result: 15, points: 9 },
{ result: 18, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 9.2 , points: 10 },
    { result: 9.3 , points: 9 },
    { result: 9.6 , points: 8 },
    { result: 9.7 , points: 7 },
    { result: 9.9 , points: 6 },
    { result: 10.2, points: 5 },
    { result: 10.5, points: 4 },
    { result: 10.8, points: 3 },
    { result: 11.2, points: 2 },
    { result: 11.6, points: 1 }
    ],
    'Бег 30 м': [
    { result: 4.5 , points: 10 },
    { result: 4.6 , points: 9 },
    { result: 4.7 , points: 8 },
    { result: 4.8 , points: 7 },
    { result: 4.9 , points: 6 },
    { result: 5.0 , points: 5 },
    { result: 5.2 , points: 4 },
    { result: 5.3 , points: 3 },
    { result: 5.4 , points: 2 },
    { result: 5.6 , points: 1 }
    ],
'Бег 6 мин': [
{ result: 1090 , points:1},
{ result: 1100 , points:2},
{ result: 1140 , points:3},
{ result: 1160 , points:4},
{ result: 1200 , points:5},
{ result: 1240 , points:6},
{ result: 1300 , points:7},
{ result: 1400 , points:8},
{ result: 1490 , points:9},
{ result: 1590 , points:10}
    ],
},
'35-39 лет': {
    'Прыжок в длину с места': [
    { result: 191, points: 1 },
    { result: 192, points: 2 },
    { result: 198, points: 3 },
    { result: 206, points: 4 },
    { result: 212, points: 5 },
    { result: 216, points: 6 },
    { result: 222, points: 7 },
    { result: 231, points: 8 },
    { result: 237, points: 9 },
    { result: 246, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -1, points: 1 },
{ result: 0, points: 2 },
{ result: 3, points: 3 },
{ result: 5, points: 4 },
{ result: 7, points: 5 },
{ result: 9, points: 6 },
{ result: 10, points: 7 },
{ result: 11, points: 8 },
{ result: 14, points: 9 },
{ result: 17, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 11, points: 1 },
  { result: 12, points: 2 },
  { result: 16, points: 3 },
  { result: 19, points: 4 },
  { result: 21, points: 5 },
  { result: 28, points: 6 },
  { result: 30, points: 7 },
  { result: 33, points: 8 },
  { result: 41, points: 9 },
  { result: 43, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 2, points: 1 },
{ result: 3, points: 2 },
{ result: 4, points: 3 },
{ result: 6, points: 4 },
{ result: 7, points: 5 },
{ result: 8, points: 6 },
{ result: 10, points: 7 },
{ result: 12, points: 8 },
{ result: 14, points: 9 },
{ result: 17, points: 10 }
  ],
  'Челночный бег 4 х 9 м': [
  { result: 9.40, points: 10 },
  { result: 9.50, points: 9 },
  { result: 9.80, points: 8 },
  { result: 9.90, points: 7 },
  { result: 10.10, points: 6 },
  { result: 10.40, points: 5 },
  { result: 10.70, points: 4 },
  { result: 11.00, points: 3 },
  { result: 11.30, points: 2 },
  { result: 11.80, points: 1 }
  ],
  'Бег 30 м': [
  { result: 4.60, points: 10 },
  { result: 4.70, points: 9 },
  { result: 4.80, points: 8 },
  { result: 4.90, points: 7 },
  { result: 5.00, points: 6 },
  { result: 5.20, points: 5 },
  { result: 5.30, points: 4 },
  { result: 5.40, points: 3 },
  { result: 5.50, points: 2 },
  { result: 5.70, points: 1 }
  ],
'Бег 6 мин': [
{ result: 1070 , points:1},
{ result: 1080 , points:2},
{ result: 1120 , points:3},
{ result: 1140 , points:4},
{ result: 1170 , points:5},
{ result: 1200 , points:6},
{ result: 1260 , points:7},
{ result: 1360 , points:8},
{ result: 1470 , points:9},
{ result: 1530 , points:10}
  ],
},
'40-44 лет': {
      'Прыжок в длину с места': [
      { result: 171, points: 1 },
      { result: 172, points: 2 },
      { result: 182, points: 3 },
      { result: 192, points: 4 },
      { result: 200, points: 5 },
      { result: 205, points: 6 },
      { result: 212, points: 7 },
      { result: 219, points: 8 },
      { result: 227, points: 9 },
      { result: 236, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -2, points: 1 },
{ result: -1, points: 2 },
{ result: 2, points: 3 },
{ result: 4, points: 4 },
{ result: 6, points: 5 },
{ result: 8, points: 6 },
{ result: 9, points: 7 },
{ result: 10, points: 8 },
{ result: 13, points: 9 },
{ result: 16, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 10, points: 1 },
  { result: 11, points: 2 },
  { result: 13, points: 3 },
  { result: 17, points: 4 },
  { result: 21, points: 5 },
  { result: 26, points: 6 },
  { result: 29, points: 7 },
  { result: 31, points: 8 },
  { result: 37, points: 9 },
  { result: 42, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 1, points: 1 },
{ result: 2, points: 2 },
{ result: 3, points: 3 },
{ result: 4, points: 4 },
{ result: 5, points: 5 },
{ result: 6, points: 6 },
{ result: 8, points: 7 },
{ result: 10, points: 8 },
{ result: 13, points: 9 },
{ result: 16, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 9.7 , points: 10 },
    { result: 9.8 , points: 9 },
    { result: 10.2 , points: 8 },
    { result: 10.5 , points: 7 },
    { result: 10.9 , points: 6 },
    { result: 11.3 , points: 5 },
    { result: 11.7 , points: 4 },
    { result: 12.0, points: 3 },
    { result: 12.5, points: 2 },
    { result: 12.7, points: 1 }
    ],
    'Бег 30 м': [
        { result: 4.7, points: 10 },
        { result: 4.8, points: 9 },
        { result: 4.9, points: 8 },
        { result: 5.0, points: 7 },
        { result: 5.2, points: 6 },
        { result: 5.3, points: 5 },
        { result: 5.5, points: 4 },
        { result: 5.6, points: 3 },
        { result: 5.8, points: 2 },
        { result: 5.9, points: 1 }
    ],
'Бег 6 мин': [
{result : 990 , points :1},
{result : 1000 , points :2},
{result : 1020 , points :3},
{result : 1040 , points :4},
{result : 1070 , points :5},
{result : 1140 , points :6},
{result : 1190 , points :7},
{result : 1320 , points :8},
{result : 1380 , points :9},
{result : 1450 , points :10}
    ],
},
'45-49 лет': {
    'Прыжок в длину с места': [
    { result: 166, points: 1 },
    { result: 167, points: 2 },
    { result: 176, points: 3 },
    { result: 182, points: 4 },
    { result: 191, points: 5 },
    { result: 197, points: 6 },
    { result: 204, points: 7 },
    { result: 211, points: 8 },
    { result: 219, points: 9 },
    { result: 231, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -3, points: 1 },
{ result: -2, points: 2 },
{ result: 1, points: 3 },
{ result: 3, points: 4 },
{ result: 5, points: 5 },
{ result: 7, points: 6 },
{ result: 8, points: 7 },
{ result: 9, points: 8 },
{ result: 12, points: 9 },
{ result: 15, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
  { result: 9, points: 1 },
  { result: 10, points: 2 },
  { result: 11, points: 3 },
  { result: 16, points: 4 },
  { result: 19, points: 5 },
  { result: 25, points: 6 },
  { result: 27, points: 7 },
  { result: 30, points: 8 },
  { result: 33, points: 9 },
  { result: 34, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 0, points: 1 },
{ result: 1, points: 2 },
{ result: 2, points: 3 },
{ result: 3, points: 4 },
{ result: 4, points: 5 },
{ result: 5, points: 6 },
{ result: 6, points: 7 },
{ result: 8, points: 8 },
{ result: 10, points: 9 },
{ result: 13, points: 10 }
  ],
  'Челночный бег 4 х 9 м': [
      { result: 9.8, points: 10 },
      { result: 9.9, points: 9 },
      { result: 10.3, points: 8 },
      { result: 10.7, points: 7 },
      { result: 11.3, points: 6 },
      { result: 11.5, points: 5 },
      { result: 11.9, points: 4 },
      { result: 12.2, points: 3 },
      { result: 12.7, points: 2 },
      { result: 13.4, points: 1 }
  ],
  'Бег 30 м': [
      { result: 4.8, points: 10 },
      { result: 4.9, points: 9 },
      { result: 5.1, points: 8 },
      { result: 5.3, points: 7 },
      { result: 5.4, points: 6 },
      { result: 5.5, points: 5 },
      { result: 5.7, points: 4 },
      { result: 5.8, points: 3 },
      { result: 5.9, points: 2 },
      { result: 6.1, points: 1 }
  ],
'Бег 6 мин': [
{result: 940 , points: 1},
{result: 950 , points: 2},
{result: 1000 , points: 3},
{result: 1020 , points: 4},
{result: 1050 , points: 5},
{result: 1070 , points: 6},
{result: 1150 , points: 7},
{result: 1200 , points: 8},
{result: 1320 , points: 9},
{result: 1400 , points: 10}
  ],
},
'50-54 лет': {
      'Прыжок в длину с места': [
      { result: 141, points: 1 },
      { result: 142, points: 2 },
      { result: 151, points: 3 },
      { result: 156, points: 4 },
      { result: 163, points: 5 },
      { result: 172, points: 6 },
      { result: 182, points: 7 },
      { result: 195, points: 8 },
      { result: 203, points: 9 },
      { result: 222, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -4, points: 1 },
{ result: -3, points: 2 },
{ result: 0, points: 3 },
{ result: 2, points: 4 },
{ result: 4, points: 5 },
{ result: 6, points: 6 },
{ result: 7, points: 7 },
{ result: 8, points: 8 },
{ result: 11, points: 9 },
{ result: 14, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 3, points: 1 },
  { result: 4, points: 2 },
  { result: 6, points: 3 },
  { result: 9, points: 4 },
  { result: 12, points: 5 },
  { result: 15, points: 6 },
  { result: 20, points: 7 },
  { result: 24, points: 8 },
  { result: 27, points: 9 },
  { result: 29, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 0, points: 1 },
{ result: 1, points: 3 },
{ result: 2, points: 4 },
{ result: 3, points: 5 },
{ result: 4, points: 6 },
{ result: 5, points: 7 },
{ result: 6, points: 8 },
{ result: 8, points: 9 },
{ result: 11, points: 10 }
    ],
    'Бег 30 м': [
        { result: 5.0, points: 10 },
        { result: 5.3, points: 9 },
  { result: 5.6, points: 8 },
        { result: 5.8, points: 7 },
        { result: 6.0, points: 6 },
        { result: 6.2, points: 5 },
  { result: 6.3, points: 4 },
        { result: 6.6, points: 3 },
        { result: 6.9, points: 2 },
        { result: 7.3, points: 1 }
    ],
'Бег 6 мин': [
{result: 740 , points: 1},
{result: 750 , points: 2},
{result: 840 , points: 3},
{result: 870 , points: 4},
{result: 900 , points: 5},
{result: 940 , points: 6},
{result: 980 , points: 7},
{result: 1050 , points: 8},
{result: 1130 , points: 9},
{result: 1220 , points: 10}
    ],
// Добавьте данные для других возрастных категорий
  },
  '55-59 лет': {
    'Прыжок в длину с места': [
    { result: 138, points: 1 },
    { result: 139, points: 2 },
    { result: 149, points: 3 },
    { result: 154, points: 4 },
    { result: 161, points: 5 },
    { result: 170, points: 6 },
    { result: 179, points: 7 },
    { result: 192, points: 8 },
    { result: 202, points: 9 },
    { result: 214, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -5, points: 1 },
{ result: -4, points: 2 },
{ result: -1, points: 3 },
{ result: 1, points: 4 },
{ result: 3, points: 5 },
{ result: 5, points: 6 },
{ result: 6, points: 7 },
{ result: 7, points: 8 },
{ result: 10, points: 9 },
{ result: 13, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
  { result: 2, points: 1 },
  { result: 3, points: 2 },
  { result: 4, points: 3 },
  { result: 7, points: 4 },
  { result: 10, points: 5 },
  { result: 16, points: 6 },
  { result: 19, points: 7 },
  { result: 21, points: 8 },
  { result: 22, points: 9 },
  { result: 24, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 0, points: 1 },
{ result: 1, points: 4 },
{ result: 2, points: 5 },
{ result: 3, points: 6 },
{ result: 4, points: 7 },
{ result: 5, points: 8 },
{ result: 7, points: 9 },
{ result: 10, points: 10 }
  ],
     'Бег 30 м': [
      { result: 5.2, points: 10 },
      { result: 5.3, points: 9 },
      { result: 5.5, points: 8 },
      { result: 5.7, points: 7 },
      { result: 5.9, points: 6 },
      { result: 6.2, points: 5 },
      { result: 6.3, points: 4 },
      { result: 6.5, points: 3 },
      { result: 6.8, points: 2 },
      { result: 7.0, points: 1 }
  ],
'Бег 6 мин': [
{result :700 , points :1},
{result :710 , points :2},
{result :800 , points :3},
{result :850 , points :4},
{result :870 , points :5},
{result :910 , points :6},
{result :960 , points :7},
{result :1020 , points :8},
{result :1100 , points :9},
{ result: 1200, points: 10 }
  ],
},
'60 лет и старше': {
    'Прыжок в длину с места': [
    { result: 127, points: 1 },
    { result: 128, points: 2 },
    { result: 147, points: 3 },
    { result: 152, points: 4 },
    { result: 157, points: 5 },
    { result: 168, points: 6 },
    { result: 178, points: 7 },
    { result: 186, points: 8 },
    { result: 196, points: 9 },
    { result: 202, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -6, points: 1 },
{ result: -5, points: 2 },
{ result: -2, points: 3 },
{ result: 0, points: 4 },
{ result: 2, points: 5 },
{ result: 4, points: 6 },
{ result: 5, points: 7 },
{ result: 6, points: 8 },
{ result: 9, points: 9 },
{ result: 12, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
  { result: 1, points: 1 },
  { result: 2, points: 2 },
  { result: 3, points: 3 },
  { result: 4, points: 4 },
  { result: 8, points: 5 },
  { result: 12, points: 6 },
  { result: 15, points: 7 },
  { result: 17, points: 8 },
  { result: 19, points: 9 },
  { result: 21, points: 10 }
],
'Подтягивание на высокой перекладине': [
{ result: 0, points: 1 },
{ result: 1, points: 5 },
{ result: 2, points: 6 },
{ result: 3, points: 7 },
{ result: 4, points: 8 },
{ result: 6, points: 9 },
{ result: 9, points: 10 }
  ],
  'Бег 30 м': [
      { result: 5.3, points: 10 },
      { result: 5.4, points: 9 },
      { result: 5.6, points: 8 },
      { result: 5.8, points: 7 },
      { result: 6.0, points: 6 },
      { result: 6.3, points: 5 },
      { result: 6.4, points: 4 },
      { result: 6.6, points: 3 },
      { result: 6.9, points: 2 },
      { result: 7.1, points: 1 }
  ],
'Бег 6 мин': [
{result: 590 , points: 1},
{result: 600 , points: 2},
{result: 760 , points: 3},
{result: 830 , points: 4},
{result: 850 , points: 5},
{result: 900 , points: 6},
{result: 920 , points: 7},
{result: 1000 , points: 8},
{result: 1060 , points: 9},
{ result: 1100, points: 10}
  ],
},
    },
    female: {
     '6 лет': {
      'Прыжок в длину с места': [
      { result: 94, points: 1 },
      { result: 95, points: 2 },
      { result: 100, points: 3 },
      { result: 105, points: 4 },
      { result: 107, points: 5 },
      { result: 110, points: 6 },
      { result: 113, points: 7 },
      { result: 118, points: 8 },
      { result: 122, points: 9 },
      { result: 128, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -2, points: 1 },
{ result: -1, points: 2 },
{ result: 2, points: 3 },
{ result: 3, points: 4 },
{ result: 4, points: 5 },
{ result: 5, points: 6 },
{ result: 6, points: 7 },
{ result: 8, points: 8 },
{ result: 10, points: 9 },
{ result: 12, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 0, points: 1 },
{ result: 1, points: 3 },
{ result: 2, points: 4 },
{ result: 3, points: 5 },
{ result: 4, points: 6 },
{ result: 5, points: 7 },
{ result: 6, points: 8 },
{ result: 8, points: 9 },
{ result: 10, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 11, points: 1 },
{ result: 12, points: 2 },
{ result: 14, points: 3 },
{ result: 15, points: 4 },
{ result: 16, points: 5 },
{ result: 17, points: 6 },
{ result: 18, points: 7 },
{ result: 19, points: 8 },
{ result: 20, points: 9 },
{ result: 22, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 14.6, points: 10 },
    { result: 14.2, points: 9 },
    { result: 13.9, points: 8 },
    { result: 13.6, points: 7 },
    { result: 13.4, points: 6 },
    { result: 13.3, points: 5 },
    { result: 13.0, points: 4 },
    { result: 12.6, points: 3 },
    { result: 12.2, points: 2 },
    { result: 12.1, points: 1 }
    ],
    'Бег 30 м': [
    { result: 7.7, points: 10 },
    { result: 7.5, points: 9 },
    { result: 7.2, points: 8 },
    { result: 7.1, points: 7 },
    { result: 7.0, points: 6 },
    { result: 6.9, points: 5 },
    { result: 6.8, points: 4 },
    { result: 6.7, points: 3 },
    { result: 6.4, points: 2 },
    { result: 6.3, points: 1 }
    ],
'Бег 800 м': [
{ result: 7.21, points: 10 },
{ result: 6.51, points: 9 },
{ result: 6.29, points: 8 },
{ result: 6.11, points: 7 },
{ result: 5.52, points: 6 },
{ result: 5.32, points: 5 },
{ result: 5.21, points: 4 },
{ result: 5.04, points: 3 },
{ result: 4.46, points: 2 },
{ result: 4.45, points: 1 }
    ],
    },
    '7 лет': {
      'Прыжок в длину с места': [
      { result: 96, points: 1 },
      { result: 97, points: 2 },
      { result: 104, points: 3 },
      { result: 110, points: 4 },
      { result: 112, points: 5 },
      { result: 117, points: 6 },
      { result: 120, points: 7 },
      { result: 125, points: 8 },
      { result: 129, points: 9 },
      { result: 135, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: -1, points: 1 },
{ result: 0, points: 2 },
{ result: 3, points: 3 },
{ result: 4, points: 4 },
{ result: 5, points: 5 },
{ result: 6, points: 6 },
{ result: 7, points: 7 },
{ result: 9, points: 8 },
{ result: 11, points: 9 },
{ result: 14, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 0, points: 1 }, 
{ result: 1, points: 2 },
{ result: 2, points: 3 },
{ result: 3, points: 4 },
{ result: 4, points: 5 },
{ result: 5, points: 6 },
{ result: 6, points: 7 },
{ result: 7, points: 8 },
{ result: 9, points: 9 },
{ result: 12, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 12, points: 1 },
{ result: 13, points: 2 },
{ result: 15, points: 3 },
{ result: 16, points: 4 },
{ result: 17, points: 5 },
{ result: 18, points: 6 },
{ result: 19, points: 7 },
{ result: 20, points: 8 },
{ result: 21, points: 9 },
{ result: 23, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 14.3, points: 10 },
    { result: 13.8, points: 9 },
    { result: 13.5, points: 8 },
    { result: 13.3, points: 7 },
    { result: 13.1, points: 6 },
    { result: 12.9, points: 5 },
    { result: 12.7, points: 4 },
    { result: 12.5, points: 3 },
    { result: 12.1, points: 2 },
    { result: 12.0, points: 1 }
    ],
    'Бег 30 м': [
    { result: 7.5, points: 10 },
    { result: 7.3, points: 9 },
    { result: 7.1, points: 8 },
    { result: 7.0, points: 7 },
    { result: 6.8, points: 6 },
    { result: 6.7, points: 5 },
    { result: 6.6, points: 4 },
    { result: 6.5, points: 3 },
    { result: 6.3, points: 2 },
    { result: 6.2, points: 1 }
    ],
'Бег 800 м': [
{ result: 6.57, points: 10 },
{ result: 6.31, points: 9 },
{ result: 6.13, points: 8 },
{ result: 5.57, points: 7 },
{ result: 5.39, points: 6 },
{ result: 5.24, points: 5 },
{ result: 5.13, points: 4 },
{ result: 4.54, points: 3 },
{ result: 4.32, points: 2 },
{ result: 4.31, points: 1 }
    ],
    },
'8 лет': {
      'Прыжок в длину с места': [
      { result: 109, points: 1 },
      { result: 110, points: 2 },
      { result: 117, points: 3 },
      { result: 122, points: 4 },
      { result: 125, points: 5 },
      { result: 129, points: 6 },
      { result: 131, points: 7 },
      { result: 136, points: 8 },
      { result: 141, points: 9 },
      { result: 150, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 0, points: 1 },
{ result: 1, points: 2 },
{ result: 4, points: 3 },
{ result: 5, points: 4 },
{ result: 6, points: 5 },
{ result: 7, points: 6 },
{ result: 8, points: 7 },
{ result: 10, points: 8 },
{ result: 12, points: 9 },
{ result: 15, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 1, points: 1 },
{ result: 2, points: 2 },
{ result: 4, points: 3 },
{ result: 5, points: 4 },
{ result: 6, points: 5 },
{ result: 8, points: 6 },
{ result: 9, points: 7 },
{ result: 10, points: 8 },
{ result: 12, points: 9 },
{ result: 16, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 14, points: 1 },
{ result: 15, points: 2 },
{ result: 17, points: 3 },
{ result: 18, points: 4 },
{ result: 19, points: 5 },
{ result: 20, points: 6 },
{ result: 21, points: 7 },
{ result: 23, points: 8 },
{ result: 24, points: 9 },
{ result: 25, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 11.4, points: 10 },
    { result: 11.5, points: 9 },
    { result: 11.9, points: 8 },
    { result: 12.1, points: 7 },
    { result: 12.3, points: 6 },
    { result: 12.4, points: 5 },
    { result: 12.6, points: 4 },
    { result: 12.7, points: 3 },
    { result: 12.9, points: 2 },
    { result: 13.2, points: 1 }
    ],
    'Бег 30 м': [
    { result: 5.9, points: 10 },
    { result: 6.0, points: 9 },
    { result: 6.2, points: 8 },
    { result: 6.3, points: 7 },
    { result: 6.4, points: 6 },
    { result: 6.6, points: 5 },
    { result: 6.7, points: 4 },
    { result: 6.8, points: 3 },
    { result: 6.9, points: 2 },
    { result: 7.2, points: 1 }
    ],
'Бег 800 м': [
{ result: 4.21, points: 10 },
{ result: 4.22, points: 9 },
{ result: 4.46, points: 8 },
{ result: 5.01, points: 7 },
{ result: 5.11, points: 6 },
{ result: 5.20, points: 5 },
{ result: 5.31, points: 4 },
{ result: 5.44, points: 3 },
{ result: 6.01, points: 2 },
{ result: 6.23, points: 1 }
    ],
    },
'9 лет': {
      'Прыжок в длину с места': [
      { result: 116, points: 1 },
      { result: 117, points: 2 },
      { result: 125, points: 3 },
      { result: 130, points: 4 },
      { result: 135, points: 5 },
      { result: 138, points: 6 },
      { result: 141, points: 7 },
      { result: 146, points: 8 },
      { result: 151, points: 9 },
      { result: 160, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 1, points: 1 },
{ result: 2, points: 2 },
{ result: 5, points: 3 },
{ result: 6, points: 4 },
{ result: 7, points: 5 },
{ result: 8, points: 6 },
{ result: 9, points: 7 },
{ result: 11, points: 8 },
{ result: 13, points: 9 },
{ result: 16, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 2, points: 1 },
{ result: 3, points: 2 },
{ result: 5, points: 3 },
{ result: 7, points: 4 },
{ result: 8, points: 5 },
{ result: 9, points: 6 },
{ result: 10, points: 7 },
{ result: 12, points: 8 },
{ result: 15, points: 9 },
{ result: 19, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 16, points: 1 },
{ result: 17, points: 2 },
{ result: 19, points: 3 },
{ result: 20, points: 4 },
{ result: 21, points: 5 },
{ result: 22, points: 6 },
{ result: 23, points: 7 },
{ result: 24, points: 8 },
{ result: 25, points: 9 },
{ result: 27, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 11.0, points: 10 },
    { result: 11.1, points: 9 },
    { result: 11.4, points: 8 },
    { result: 11.6, points: 7 },
    { result: 11.8, points: 6 },
    { result: 11.9, points: 5 },
    { result: 12.0, points: 4 },
    { result: 12.2, points: 3 },
    { result: 12.5, points: 2 },
    { result: 12.8, points: 1 }
    ],
    'Бег 30 м': [
    { result: 5.6, points: 10 },
    { result: 5.7, points: 9 },
    { result: 5.9, points: 8 },
    { result: 6.0, points: 7 },
    { result: 6.1, points: 6 },
    { result: 6.2, points: 5 },
    { result: 6.3, points: 4 },
    { result: 6.4, points: 3 },
    { result: 6.6, points: 2 },
    { result: 6.8, points: 1 }
    ],
'Бег 800 м': [
{ result: 4.05, points: 10 },
{ result: 4.06, points: 9 },
{ result: 4.21, points: 8 },
{ result: 4.36, points: 7 },
{ result: 4.53, points: 6 },
{ result: 5.06, points: 5 },
{ result: 5.14, points: 4 },
{ result: 5.21, points: 3 },
{ result: 5.41, points: 2 },
{ result: 6.06, points: 1 }
    ],
    },
'10 лет': {
      'Прыжок в длину с места': [
      { result: 125, points: 1 },
      { result: 126, points: 2 },
      { result: 135, points: 3 },
      { result: 140, points: 4 },
      { result: 146, points: 5 },
      { result: 150, points: 6 },
      { result: 155, points: 7 },
      { result: 160, points: 8 },
      { result: 165, points: 9 },
      { result: 172, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 2, points: 1 },
{ result: 3, points: 2 },
{ result: 6, points: 3 },
{ result: 7, points: 4 },
{ result: 8, points: 5 },
{ result: 9, points: 6 },
{ result: 10, points: 7 },
{ result: 12, points: 8 },
{ result: 14, points: 9 },
{ result: 17, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 3, points: 1 },
{ result: 4, points: 2 },
{ result: 6, points: 3 },
{ result: 8, points: 4 },
{ result: 9, points: 5 },
{ result: 10, points: 6 },
{ result: 12, points: 7 },
{ result: 14, points: 8 },
{ result: 17, points: 9 },
{ result: 21, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 17, points: 1 },
{ result: 18, points: 2 },
{ result: 20, points: 3 },
{ result: 22, points: 4 },
{ result: 23, points: 5 },
{ result: 24, points: 6 },
{ result: 26, points: 7 },
{ result: 27, points: 8 },
{ result: 28, points: 9 },
{ result: 31, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { "result": 10.5, "points": 10 },
{ "result": 10.6, "points": 9 },
{ "result": 10.9, "points": 8 },
{ "result": 11.1, "points": 7 },
{ "result": 11.2, "points": 6 },
{ "result": 11.4, "points": 5 },
{ "result": 11.6, "points": 4 },
{ "result": 11.8, "points": 3 },
{ "result": 12.1, "points": 2 },
{ "result": 12.5, "points": 1 }
    ],
    'Бег 30 м': [
    { result: 5.4, points: 10 },
    { result: 5.5, points: 9 },
    { result: 5.7, points: 8 },
    { result: 5.8, points: 7 },
    { result: 5.9, points: 6 },
    { result: 6.0, points: 5 },
    { result: 6.1, points: 4 },
    { result: 6.2, points: 3 },
    { result: 6.3, points: 2 },
    { result: 6.5, points: 1 }
    ],
'Бег 800 м': [
{ result: 3.56, points: 10 },
{ result: 3.57, points: 9 },
{ result: 4.16, points: 8 },
{ result: 4.31, points: 7 },
{ result: 4.41, points: 6 },
{ result: 4.56, points: 5 },
{ result: 5.03, points: 4 },
{ result: 5.13, points: 3 },
{ result: 5.32, points: 2 },
{ result: 6.01, points: 1 }
    ],
    },
'11 лет': {
      'Прыжок в длину с места': [
      { result: 134, points: 1 },
      { result: 135, points: 2 },
      { result: 143, points: 3 },
      { result: 150, points: 4 },
      { result: 155, points: 5 },
      { result: 160, points: 6 },
      { result: 163, points: 7 },
      { result: 168, points: 8 },
      { result: 173, points: 9 },
      { result: 182, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 3, points: 1 },
{ result: 4, points: 2 },
{ result: 7, points: 3 },
{ result: 8, points: 4 },
{ result: 9, points: 5 },
{ result: 10, points: 6 },
{ result: 11, points: 7 },
{ result: 13, points: 8 },
{ result: 15, points: 9 },
{ result: 18, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 4, points: 1 },
{ result: 5, points: 2 },
{ result: 7, points: 3 },
{ result: 9, points: 4 },
{ result: 10, points: 5 },
{ result: 11, points: 6 },
{ result: 13, points: 7 },
{ result: 15, points: 8 },
{ result: 19, points: 9 },
{ result: 24, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 32, points: 1 },
{ result: 33, points: 2 },
{ result: 37, points: 3 },
{ result: 40, points: 4 },
{ result: 41, points: 5 },
{ result: 43, points: 6 },
{ result: 45, points: 7 },
{ result: 47, points: 8 },
{ result: 49, points: 9 },
{ result: 52, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 10.3, points: 10 },
{ result: 10.4, points: 9 },
{ result: 10.6, points: 8 },
{ result: 10.8, points: 7 },
{ result: 11.0, points: 6 },
{ result: 11.2, points: 5 },
{ result: 11.4, points: 4 },
{ result: 11.7, points: 3 },
{ result: 12.0, points: 2 },
{ result: 12.4, points: 1 }
    ],
    'Бег 30 м': [
    { result: 5.2, points: 10 },
{ result: 5.3, points: 9 },
{ result: 5.4, points: 8 },
{ result: 5.5, points: 7 },
{ result: 5.6, points: 6 },
{ result: 5.8, points: 5 },
{ result: 5.9, points: 4 },
{ result: 6.0, points: 3 },
{ result: 6.1, points: 2 },
{ result: 6.4, points: 1 }
    ],
'Бег 1000 м': [
{ result: 4.35, points: 10 },
{ result: 4.36, points: 9 },
{ result: 4.46, points: 8 },
{ result: 4.57, points: 7 },
{ result: 5.06, points: 6 },
{ result: 5.15, points: 5 },
{ result: 5.26, points: 4 },
{ result: 5.38, points: 3 },
{ result: 5.57, points: 2 },
{ result: 6.21, points: 1 }
    ],
    },
'12 лет': {
      'Прыжок в длину с места': [
      { result: 141, points: 1 },
      { result: 142, points: 2 },
      { result: 150, points: 3 },
      { result: 156, points: 4 },
      { result: 160, points: 5 },
      { result: 165, points: 6 },
      { result: 170, points: 7 },
      { result: 175, points: 8 },
      { result: 180, points: 9 },
      { result: 190, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 4, points: 1 },
{ result: 5, points: 2 },
{ result: 8, points: 3 },
{ result: 9, points: 4 },
{ result: 10, points: 5 },
{ result: 11, points: 6 },
{ result: 13, points: 7 },
{ result: 15, points: 8 },
{ result: 16, points: 9 },
{ result: 19, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 5, points: 1 },
{ result: 6, points: 2 },
{ result: 8, points: 3 },
{ result: 10, points: 4 },
{ result: 11, points: 5 },
{ result: 12, points: 6 },
{ result: 14, points: 7 },
{ result: 16, points: 8 },
{ result: 20, points: 9 },
{ result: 25, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 35, points: 1 },
{ result: 36, points: 2 },
{ result: 40, points: 3 },
{ result: 42, points: 4 },
{ result: 44, points: 5 },
{ result: 46, points: 6 },
{ result: 47, points: 7 },
{ result: 49, points: 8 },
{ result: 51, points: 9 },
{ result: 54, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 10.2, points: 10 },
{ result: 10.3, points: 9 },
{ result: 10.4, points: 8 },
{ result: 10.6, points: 7 },
{ result: 10.8, points: 6 },
{ result: 11.0, points: 5 },
{ result: 11.2, points: 4 },
{ result: 11.3, points: 3 },
{ result: 11.4, points: 2 },
{ result: 11.6, points: 1 }
    ],
    'Бег 30 м': [
    { result: 5.1, points: 10 },
{ result: 5.2, points: 9 },
{ result: 5.3, points: 8 },
{ result: 5.4, points: 7 },
{ result: 5.5, points: 6 },
{ result: 5.6, points: 5 },
{ result: 5.7, points: 4 },
{ result: 5.8, points: 3 },
{ result: 5.9, points: 2 },
{ result: 6.1, points: 1 }
    ],
'Бег 1000 м': [
{ result: 4.29, points: 10 },
{ result: 4.3, points: 9 },
{ result: 4.36, points: 8 },
{ result: 4.47, points: 7 },
{ result: 4.56, points: 6 },
{ result: 5.06, points: 5 },
{ result: 5.17, points: 4 },
{ result: 5.33, points: 3 },
{ result: 5.46, points: 2 },
{ result: 6.11, points: 1 }
    ],
    },
'13 лет': {
      'Прыжок в длину с места': [
      { result: 149, points: 1 },
      { result: 150, points: 2 },
      { result: 158, points: 3 },
      { result: 164, points: 4 },
      { result: 168, points: 5 },
      { result: 171, points: 6 },
      { result: 175, points: 7 },
      { result: 180, points: 8 },
      { result: 185, points: 9 },
      { result: 194, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 5, points: 1 },
{ result: 6, points: 2 },
{ result: 9, points: 3 },
{ result: 10, points: 4 },
{ result: 11, points: 5 },
{ result: 12, points: 6 },
{ result: 14, points: 7 },
{ result: 16, points: 8 },
{ result: 17, points: 9 },
{ result: 20, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 6, points: 1 },
{ result: 7, points: 2 },
{ result: 9, points: 3 },
{ result: 11, points: 4 },
{ result: 12, points: 5 },
{ result: 13, points: 6 },
{ result: 15, points: 7 },
{ result: 17, points: 8 },
{ result: 21, points: 9 },
{ result: 26, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 38, points: 1 },
{ result: 39, points: 2 },
{ result: 42, points: 3 },
{ result: 44, points: 4 },
{ result: 46, points: 5 },
{ result: 48, points: 6 },
{ result: 49, points: 7 },
{ result: 50, points: 8 },
{ result: 52, points: 9 },
{ result: 55, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 10.1, points: 10 },
{ result: 10.2, points: 9 },
{ result: 10.3, points: 8 },
{ result: 10.5, points: 7 },
{ result: 10.6, points: 6 },
{ result: 10.8, points: 5 },
{ result: 10.9, points: 4 },
{ result: 11.0, points: 3 },
{ result: 11.1, points: 2 },
{ result: 11.4, points: 1 }
    ],
    'Бег 30 м': [
    { result: 5.0, points: 10 },
{ result: 5.1, points: 9 },
{ result: 5.2, points: 8 },
{ result: 5.3, points: 7 },
{ result: 5.4, points: 6 },
{ result: 5.5, points: 5 },
{ result: 5.6, points: 4 },
{ result: 5.7, points: 3 },
{ result: 5.8, points: 2 },
{ result: 5.9, points: 1 }
    ],
'Бег 1000 м': [
{ result: 4.25, points: 10 },
{ result: 4.26, points: 9 },
{ result: 4.32, points: 8 },
{ result: 4.44, points: 7 },
{ result: 4.53, points: 6 },
{ result: 5.02, points: 5 },
{ result: 5.13, points: 4 },
{ result: 5.22, points: 3 },
{ result: 5.36, points: 2 },
{ result: 5.58, points: 1 }
    ],
    },
'14 лет': {
      'Прыжок в длину с места': [
      { result: 154, points: 1 },
      { result: 155, points: 2 },
      { result: 164, points: 3 },
      { result: 170, points: 4 },
      { result: 173, points: 5 },
      { result: 176, points: 6 },
      { result: 180, points: 7 },
      { result: 185, points: 8 },
      { result: 190, points: 9 },
      { result: 198, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 6, points: 1 },
{ result: 7, points: 2 },
{ result: 10, points: 3 },
{ result: 11, points: 4 },
{ result: 13, points: 5 },
{ result: 15, points: 6 },
{ result: 16, points: 7 },
{ result: 18, points: 8 },
{ result: 21, points: 9 },
{ result: 22, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 7, points: 1 },
{ result: 8, points: 2 },
{ result: 10, points: 3 },
{ result: 12, points: 4 },
{ result: 13, points: 5 },
{ result: 14, points: 6 },
{ result: 16, points: 7 },
{ result: 19, points: 8 },
{ result: 22, points: 9 },
{ result: 27, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 39, points: 1 },
{ result: 40, points: 2 },
{ result: 44, points: 3 },
{ result: 46, points: 4 },
{ result: 48, points: 5 },
{ result: 50, points: 6 },
{ result: 51, points: 7 },
{ result: 53, points: 8 },
{ result: 54, points: 9 },
{ result: 56, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 10.0, points: 10 },
{ result: 10.1, points: 9 },
{ result: 10.2, points: 8 },
{ result: 10.4, points: 7 },
{ result: 10.5, points: 6 },
{ result: 10.6, points: 5 },
{ result: 10.7, points: 4 },
{ result: 10.8, points: 3 },
{ result: 10.9, points: 2 },
{ result: 11.3, points: 1 }
    ],
    'Бег 30 м': [
    { result: 4.9, points: 10 },
{ result: 5.0, points: 9 },
{ result: 5.1, points: 8 },
{ result: 5.2, points: 7 },
{ result: 5.3, points: 6 },
{ result: 5.4, points: 5 },
{ result: 5.5, points: 4 },
{ result: 5.6, points: 3 },
{ result: 5.7, points: 2 },
{ result: 5.8, points: 1 }
    ],
'Бег 1000 м': [
{ result: 4.20, points: 10 },
{ result: 4.21, points: 9 },
{ result: 4.30, points: 8 },
{ result: 4.37, points: 7 },
{ result: 4.48, points: 6 },
{ result: 4.59, points: 5 },
{ result: 5.04, points: 4 },
{ result: 5.11, points: 3 },
{ result: 5.23, points: 2 },
{ result: 5.54, points: 1 }
    ],
    },
'15 лет': {
      'Прыжок в длину с места': [
      { result: 159, points: 1 },
      { result: 160, points: 2 },
      { result: 169, points: 3 },
      { result: 175, points: 4 },
      { result: 178, points: 5 },
      { result: 181, points: 6 },
      { result: 185, points: 7 },
      { result: 187, points: 8 },
      { result: 192, points: 9 },
      { result: 200, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 7, points: 1 },
{ result: 8, points: 2 },
{ result: 11, points: 3 },
{ result: 13, points: 4 },
{ result: 15, points: 5 },
{ result: 16, points: 6 },
{ result: 18, points: 7 },
{ result: 20, points: 8 },
{ result: 21, points: 9 },
{ result: 24, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 8, points: 1 },
{ result: 9, points: 2 },
{ result: 11, points: 3 },
{ result: 13, points: 4 },
{ result: 14, points: 5 },
{ result: 15, points: 6 },
{ result: 17, points: 7 },
{ result: 20, points: 8 },
{ result: 23, points: 9 },
{ result: 28, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 42, points: 1 },
{ result: 43, points: 2 },
{ result: 47, points: 3 },
{ result: 48, points: 4 },
{ result: 50, points: 5 },
{ result: 52, points: 6 },
{ result: 53, points: 7 },
{ result: 55, points: 8 },
{ result: 56, points: 9 },
{ result: 59, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 9.9, points: 10 },
{ result: 10.0, points: 9 },
{ result: 10.1, points: 8 },
{ result: 10.2, points: 7 },
{ result: 10.3, points: 6 },
{ result: 10.4, points: 5 },
{ result: 10.5, points: 4 },
{ result: 10.7, points: 3 },
{ result: 10.8, points: 2 },
{ result: 11.2, points: 1 }
    ],
    'Бег 30 м': [
    { result: 4.8, points: 10 },
{ result: 4.9, points: 9 },
{ result: 5.0, points: 8 },
{ result: 5.1, points: 7 },
{ result: 5.2, points: 6 },
{ result: 5.3, points: 5 },
{ result: 5.4, points: 4 },
{ result: 5.5, points: 3 },
{ result: 5.6, points: 2 },
{ result: 5.7, points: 1 }
    ],
'Бег 1000 м': [
{ result: 4.15, points: 10 },
{ result: 4.16, points: 9 },
{ result: 4.28, points: 8 },
{ result: 4.34, points: 7 },
{ result: 4.43, points: 6 },
{ result: 4.55, points: 5 },
{ result: 5.00, points: 4 },
{ result: 5.08, points: 3 },
{ result: 5.19, points: 2 },
{ result: 5.51, points: 1 }
    ],
    },
'16 лет': {
      'Прыжок в длину с места': [
      { result: 160, points: 1 },
      { result: 161, points: 2 },
      { result: 170, points: 3 },
      { result: 177, points: 4 },
      { result: 180, points: 5 },
      { result: 184, points: 6 },
      { result: 187, points: 7 },
      { result: 191, points: 8 },
      { result: 197, points: 9 },
      { result: 205, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 8, points: 1 },
{ result: 9, points: 2 },
{ result: 12, points: 3 },
{ result: 14, points: 4 },
{ result: 16, points: 5 },
{ result: 17, points: 6 },
{ result: 20, points: 7 },
{ result: 21, points: 8 },
{ result: 22, points: 9 },
{ result: 25, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 5, points: 1 },
{ result: 6, points: 2 },
{ result: 9, points: 3 },
{ result: 11, points: 4 },
{ result: 13, points: 5 },
{ result: 14, points: 6 },
{ result: 16, points: 7 },
{ result: 19, points: 8 },
{ result: 22, points: 9 },
{ result: 27, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 43, points: 1 },
{ result: 44, points: 2 },
{ result: 48, points: 3 },
{ result: 49, points: 4 },
{ result: 51, points: 5 },
{ result: 53, points: 6 },
{ result: 55, points: 7 },
{ result: 56, points: 8 },
{ result: 58, points: 9 },
{ result: 60, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 9.8, points: 10 },
{ result: 9.9, points: 9 },
{ result: 10.0, points: 8 },
{ result: 10.1, points: 7 },
{ result: 10.2, points: 6 },
{ result: 10.3, points: 5 },
{ result: 10.4, points: 4 },
{ result: 10.6, points: 3 },
{ result: 10.7, points: 2 },
{ result: 11.1, points: 1 }
    ],
    'Бег 30 м': [
    { result: 4.7, points: 10 },
{ result: 4.8, points: 9 },
{ result: 4.9, points: 8 },
{ result: 5.0, points: 7 },
{ result: 5.1, points: 6 },
{ result: 5.2, points: 5 },
{ result: 5.3, points: 4 },
{ result: 5.4, points: 3 },
{ result: 5.5, points: 2 },
{ result: 5.6, points: 1 }
    ],
'Бег 1000 м': [
{ result: 4.12, points: 10 },
{ result: 4.26, points: 9 },
{ result: 4.33, points: 8 },
{ result: 4.42, points: 7 },
{ result: 4.47, points: 6 },
{ result: 4.56, points: 5 },
{ result: 5.0, points: 4 },
{ result: 5.06, points: 3 },
{ result: 5.16, points: 2 },
{ result: 5.46, points: 1 }
    ],
    },
'17-18 лет': {
      'Прыжок в длину с места': [
      { result: 154, points: 1 },
      { result: 155, points: 2 },
      { result: 164, points: 3 },
      { result: 170, points: 4 },
      { result: 173, points: 5 },
      { result: 176, points: 6 },
      { result: 180, points: 7 },
      { result: 185, points: 8 },
      { result: 191, points: 9 },
      { result: 198, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 9, points: 1 },
{ result: 10, points: 2 },
{ result: 13, points: 3 },
{ result: 15, points: 4 },
{ result: 17, points: 5 },
{ result: 18, points: 6 },
{ result: 21, points: 7 },
{ result: 22, points: 8 },
{ result: 23, points: 9 },
{ result: 26, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 4, points: 1 },
{ result: 5, points: 2 },
{ result: 8, points: 3 },
{ result: 10, points: 4 },
{ result: 12, points: 5 },
{ result: 13, points: 6 },
{ result: 15, points: 7 },
{ result: 18, points: 8 },
{ result: 20, points: 9 },
{ result: 24, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 40, points: 1 },
{ result: 41, points: 2 },
{ result: 44, points: 3 },
{ result: 46, points: 4 },
{ result: 48, points: 5 },
{ result: 50, points: 6 },
{ result: 52, points: 7 },
{ result: 53, points: 8 },
{ result: 55, points: 9 },
{ result: 57, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 10.0, points: 10 },
{ result: 10.1, points: 9 },
{ result: 10.2, points: 8 },
{ result: 10.3, points: 7 },
{ result: 10.4, points: 6 },
{ result: 10.6, points: 5 },
{ result: 10.9, points: 4 },
{ result: 11.0, points: 3 },
{ result: 11.2, points: 2 },
{ result: 11.5, points: 1 }
    ],
    'Бег 30 м': [
    { result: 4.9, points: 10 },
{ result: 5.0, points: 9 },
{ result: 5.1, points: 8 },
{ result: 5.2, points: 7 },
{ result: 5.3, points: 6 },
{ result: 5.4, points: 5 },
{ result: 5.5, points: 4 },
{ result: 5.6, points: 3 },
{ result: 5.7, points: 2 },
{ result: 5.8, points: 1 }
    ],
'Бег 1000 м': [
{ result: 3.55, points: 10 },
{ result: 3.56, points: 9 },
{ result: 4.06, points: 8 },
{ result: 4.11, points: 7 },
{ result: 4.22, points: 6 },
{ result: 4.27, points: 5 },
{ result: 4.36, points: 4 },
{ result: 4.51, points: 3 },
{ result: 5.02, points: 2 },
{ result: 5.16, points: 1 }
    ],
    },
'19-22 лет': {
      'Прыжок в длину с места': [
      { result: 144, points: 1 },
      { result: 145, points: 2 },
      { result: 156, points: 3 },
      { result: 163, points: 4 },
      { result: 167, points: 5 },
      { result: 173, points: 6 },
      { result: 177, points: 7 },
      { result: 184, points: 8 },
      { result: 190, points: 9 },
      { result: 197, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 6, points: 1 },
{ result: 7, points: 2 },
{ result: 10, points: 3 },
{ result: 12, points: 4 },
{ result: 14, points: 5 },
{ result: 15, points: 6 },
{ result: 17, points: 7 },
{ result: 19, points: 8 },
{ result: 21, points: 9 },
{ result: 23, points: 10 }
],
'Сгибание и разгибание рук в упоре лежа': [
{ result: 3, points: 1 },
{ result: 4, points: 2 },
{ result: 7, points: 3 },
{ result: 9, points: 4 },
{ result: 11, points: 5 },
{ result: 12, points: 6 },
{ result: 14, points: 7 },
{ result: 17, points: 8 },
{ result: 19, points: 9 },
{ result: 23, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 32, points: 1 },
{ result: 33, points: 2 },
{ result: 38, points: 3 },
{ result: 40, points: 4 },
{ result: 43, points: 5 },
{ result: 45, points: 6 },
{ result: 47, points: 7 },
{ result: 49, points: 8 },
{ result: 53, points: 9 },
{ result: 56, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 10.1, points: 10 },
{ result: 10.2, points: 9 },
{ result: 10.3, points: 8 },
{ result: 10.6, points: 7 },
{ result: 10.8, points: 6 },
{ result: 11.0, points: 5 },
{ result: 11.2, points: 4 },
{ result: 11.4, points: 3 },
{ result: 11.6, points: 2 },
{ result: 12.1, points: 1 }
    ],
    'Бег 30 м': [
    { result: 5.1, points: 10 },
{ result: 5.2, points: 9 },
{ result: 5.3, points: 8 },
{ result: 5.4, points: 7 },
{ result: 5.5, points: 6 },
{ result: 5.6, points: 5 },
{ result: 5.7, points: 4 },
{ result: 5.8, points: 3 },
{ result: 6.0, points: 2 },
{ result: 6.3, points: 1 }
    ],
'Бег 1500 м': [
{ result: 6.29, points: 10 },
{ result: 6.3, points: 9 },
{ result: 6.56, points: 8 },
{ result: 7.17, points: 7 },
{ result: 7.24, points: 6 },
{ result: 7.34, points: 5 },
{ result: 7.36, points: 4 },
{ result: 7.47, points: 3 },
{ result: 7.56, points: 2 },
{ result: 8.06, points: 1 }
    ],
    },
'23-29 лет': {
      'Прыжок в длину с места': [
      { result: 143, points: 1 },
      { result: 144, points: 2 },
      { result: 155, points: 3 },
      { result: 162, points: 4 },
      { result: 166, points: 5 },
      { result: 170, points: 6 },
      { result: 175, points: 7 },
      { result: 180, points: 8 },
      { result: 189, points: 9 },
      { result: 198, points: 10 }
],
'Наклон вперед из положения сидя': [
{ result: 5, points: 1 },
{ result: 6, points: 2 },
{ result: 9, points: 3 },
{ result: 11, points: 4 },
{ result: 12, points: 5 },
{ result: 14, points: 6 },
{ result: 16, points: 7 },
{ result: 18, points: 8 },
{ result: 20, points: 9 },
{ result: 22, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 30, points: 1 },
{ result: 31, points: 2 },
{ result: 32, points: 3 },
{ result: 37, points: 4 },
{ result: 38, points: 5 },
{ result: 40, points: 6 },
{ result: 43, points: 7 },
{ result: 45, points: 8 },
{ result: 48, points: 9 },
{ result: 53, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
        { result: 10.2, points: 10 },
        { result: 10.3, points: 9 },
  { result: 10.4, points: 8 },
        { result: 10.8, points: 7 },
        { result: 11.1, points: 6 },
        { result: 11.4, points: 5 },
  { result: 11.6, points: 4 },
        { result: 11.8, points: 3 },
        { result: 11.9, points: 2 },
        { result: 12.2, points: 1 }
    ],
    'Бег 30 м': [
        { result: 5.2, points: 10 },
        { result: 5.3, points: 9 },
  { result: 5.4, points: 8 },
        { result: 5.6, points: 7 },
        { result: 5.7, points: 6 },
        { result: 5.9, points: 5 },
  { result: 6.0, points: 4 },
        { result: 6.1, points: 3 },
        { result: 6.2, points: 2 },
        { result: 6.5, points: 1 }
    ],
'Бег 1500 м': [
        { result: 7.02, points: 10 },
        { result: 7.03, points: 9 },
  { result: 7.18, points: 8 },
        { result: 7.21, points: 7 },
        { result: 7.22, points: 6 },
        { result: 7.23, points: 5 },
  { result: 7.25, points: 4 },
        { result: 7.26, points: 3 },
        { result: 7.30, points: 2 },
        { result: 7.35, points: 1 }
    ],
'Бег 6 мин': [
{ result: 990, points: 1 },
{ result: 1000, points: 2 },
{ result: 1050, points: 3 },
{ result: 1090, points: 4 },
{ result: 1100, points: 5 },
{ result: 1120, points: 6 },
{ result: 1150, points: 7 },
{ result: 1190, points: 8 },
{ result: 1210, points: 9 },
{ result: 1250, points: 10 }
    ],
    },
'30-34 лет': {
      'Прыжок в длину с места': [
      { result: 140, points: 1 },
      { result: 141, points: 2 },
      { result: 147, points: 3 },
      { result: 154, points: 4 },
      { result: 157, points: 5 },
      { result: 162, points: 6 },
      { result: 167, points: 7 },
      { result: 175, points: 8 },
      { result: 184, points: 9 },
      { result: 193, points: 10 }     
],
'Наклон вперед из положения сидя': [
{ result: 4, points: 1 },
{ result: 5, points: 2 },
{ result: 8, points: 3 },
{ result: 10, points: 4 },
{ result: 11, points: 5 },
{ result: 13, points: 6 },
{ result: 15, points: 7 },
{ result: 17, points: 8 },
{ result: 19, points: 9 },
{ result: 21, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 22, points: 1 },
{ result: 23, points: 2 },
{ result: 27, points: 3 },
{ result: 29, points: 4 },
{ result: 32, points: 5 },
{ result: 34, points: 6 },
{ result: 37, points: 7 },
{ result: 40, points: 8 },
{ result: 45, points: 9 },
{ result: 50, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 10.9, points: 10 },
{ result: 11.0, points: 9 },
{ result: 11.1, points: 8 },
{ result: 11.4, points: 7 },
{ result: 11.8, points: 6 },
{ result: 12.1, points: 5 },
{ result: 12.5, points: 4 },
{ result: 12.9, points: 3 },
{ result: 13.1, points: 2 },
{ result: 13.3, points: 1 }
  
    ],
    'Бег 30 м': [
    { result: 5.3, points: 10 },
{ result: 5.4, points: 9 },
{ result: 5.6, points: 8 },
{ result: 5.8, points: 7 },
{ result: 6.0, points: 6 },
{ result: 6.2, points: 5 },
{ result: 6.4, points: 4 },
{ result: 6.6, points: 3 },
{ result: 6.8, points: 2 },
{ result: 7, points: 1 }
  
    ],
'Бег 6 мин': [
{ result: 820, points: 1 },
{ result: 830, points: 2 },
{ result: 880, points: 3 },
{ result: 900, points: 4 },
{ result: 910, points: 5 },
{ result: 930, points: 6 },
{ result: 1000, points: 7 },
{ result: 1050, points: 8 },
{ result: 1110, points: 9 },
{ result: 1220, points: 10 }
    ],
    },
    '35-39 лет': {
          'Прыжок в длину с места': [
          { result: 136, points: 1 },
          { result: 137, points: 2 },
          { result: 145, points: 3 },
          { result: 150, points: 4 },
          { result: 155, points: 5 },
          { result: 158, points: 6 },
          { result: 165, points: 7 },
          { result: 170, points: 8 },
          { result: 180, points: 9 },
          { result: 188, points: 10 }          
  ],
  'Наклон вперед из положения сидя': [
  { result: 3, points: 1 },
{ result: 4, points: 2 },
{ result: 7, points: 3 },
{ result: 9, points: 4 },
{ result: 10, points: 5 },
{ result: 12, points: 6 },
{ result: 14, points: 7 },
{ result: 16, points: 8 },
{ result: 18, points: 9 },
{ result: 20, points: 10 }
  ],
  'Поднимание туловища из положения лежа на спине': [
  { result: 21, points: 1 },
{ result: 22, points: 2 },
{ result: 26, points: 3 },
{ result: 28, points: 4 },
{ result: 31, points: 5 },
{ result: 33, points: 6 },
{ result: 36, points: 7 },
{ result: 38, points: 8 },
{ result: 42, points: 9 },
{ result: 48, points: 10 }
  ],
            'Челночный бег 4 х 9 м': [
            { result: 11.0, points: 10 },
{ result: 11.1, points: 9 },
{ result: 11.2, points: 8 },
{ result: 11.6, points: 7 },
{ result: 12.0, points: 6 },
{ result: 12.4, points: 5 },
{ result: 12.7, points: 4 },
{ result: 13.0, points: 3 },
{ result: 13.4, points: 2 },
{ result: 13.5, points: 1 }

        ],
        'Бег 30 м': [
        { result: 5.4, points: 10 },
{ result: 5.5, points: 9 },
{ result: 5.7, points: 8 },
{ result: 5.9, points: 7 },
{ result: 6.1, points: 6 },
{ result: 6.4, points: 5 },
{ result: 6.5, points: 4 },
{ result: 6.7, points: 3 },
{ result: 6.9, points: 2 },
{ result: 7.1, points: 1 }        
        ],
  'Бег 6 мин': [
  { result: 800, points: 1 },
  { result: 810, points: 2 },
  { result: 850, points: 3 },
  { result: 880, points: 4 },
  { result: 900, points: 5 },
  { result: 920, points: 6 },
  { result: 950, points: 7 },
  { result: 1000, points: 8 },
  { result: 1070, points: 9 },
  { result: 1190, points: 10 }  
        ],
  },
'40-44 лет': {
      'Прыжок в длину с места': [
      { result: 124, points: 1 },
      { result: 125, points: 2 },
      { result: 135, points: 3 },
      { result: 138, points: 4 },
      { result: 144, points: 5 },
      { result: 147, points: 6 },
      { result: 153, points: 7 },
      { result: 160, points: 8 },
      { result: 170, points: 9 },
      { result: 184, points: 10 }      
],
'Наклон вперед из положения сидя': [
{ result: 2, points: 1 },
{ result: 3, points: 2 },
{ result: 6, points: 3 },
{ result: 8, points: 4 },
{ result: 9, points: 5 },
{ result: 11, points: 6 },
{ result: 13, points: 7 },
{ result: 15, points: 8 },
{ result: 17, points: 9 },
{ result: 19, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 11, points: 1 },
{ result: 12, points: 2 },
{ result: 15, points: 3 },
{ result: 18, points: 4 },
{ result: 21, points: 5 },
{ result: 26, points: 6 },
{ result: 30, points: 7 },
{ result: 34, points: 8 },
{ result: 39, points: 9 },
{ result: 46, points: 10 }
    ],
    'Челночный бег 4 х 9 м': [
    { result: 11.1, points: 10 },
{ result: 11.2, points: 9 },
{ result: 11.5, points: 8 },
{ result: 12, points: 7 },
{ result: 12.4, points: 6 },
{ result: 12.8, points: 5 },
{ result: 13.4, points: 4 },
{ result: 13.7, points: 3 },
{ result: 14.1, points: 2 },
{ result: 14.4, points: 1 }    
    ],
    'Бег 30 м': [
    { result: 5.6, points: 10 },
{ result: 5.7, points: 9 },
{ result: 6.1, points: 8 },
{ result: 6.3, points: 7 },
{ result: 6.6, points: 6 },
{ result: 6.9, points: 5 },
{ result: 7.1, points: 4 },
{ result: 7.2, points: 3 },
{ result: 7.4, points: 2 },
{ result: 7.5, points: 1 }    
    ],
'Бег 6 мин': [
{ result: 790, points: 1 },
{ result: 800, points: 2 },
{ result: 840, points: 3 },
{ result: 870, points: 4 },
{ result: 890, points: 5 },
{ result: 910, points: 6 },
{ result: 940, points: 7 },
{ result: 990, points: 8 },
{ result: 1060, points: 9 },
{ result: 1150, points: 10 }
    ],
    },
    '45-49 лет': {
          'Прыжок в длину с места': [
          { result: 121, points: 1 },
          { result: 122, points: 2 },
          { result: 130, points: 3 },
          { result: 137, points: 4 },
          { result: 143, points: 5 },
          { result: 147, points: 6 },
          { result: 150, points: 7 },
          { result: 156, points: 8 },
          { result: 164, points: 9 },
          { result: 174, points: 10 }          
  ],
  'Наклон вперед из положения сидя': [
  { result: 1, points: 1 },
{ result: 2, points: 2 },
{ result: 5, points: 3 },
{ result: 7, points: 4 },
{ result: 8, points: 5 },
{ result: 10, points: 6 },
{ result: 12, points: 7 },
{ result: 14, points: 8 },
{ result: 16, points: 9 },
{ result: 18, points: 10 }
  ],
  'Поднимание туловища из положения лежа на спине': [
  { result: 10, points: 1 },
{ result: 11, points: 2 },
{ result: 14, points: 3 },
{ result: 16, points: 4 },
{ result: 19, points: 5 },
{ result: 23, points: 6 },
{ result: 25, points: 7 },
{ result: 30, points: 8 },
{ result: 36, points: 9 },
{ result: 44, points: 10 }
  ],
        'Челночный бег 4 х 9 м': [
        { result: 11.3, points: 10 },
{ result: 11.4, points: 9 },
{ result: 11.8, points: 8 },
{ result: 12.3, points: 7 },
{ result: 13.0, points: 6 },
{ result: 13.3, points: 5 },
{ result: 13.6, points: 4 },
{ result: 13.8, points: 3 },
{ result: 14.2, points: 2 },
{ result: 14.9, points: 1 }
      
        ],
        'Бег 30 м': [
        { result: 5.8, points: 10 },
{ result: 5.9, points: 9 },
{ result: 6.2, points: 8 },
{ result: 6.6, points: 7 },
{ result: 6.8, points: 6 },
{ result: 7.1, points: 5 },
{ result: 7.2, points: 4 },
{ result: 7.3, points: 3 },
{ result: 7.5, points: 2 },
{ result: 7.8, points: 1 }        
        ],
  'Бег 6 мин': [
  { result: 780, points: 1 },
  { result: 790, points: 2 },
  { result: 830, points: 3 },
  { result: 850, points: 4 },
  { result: 880, points: 5 },
  { result: 900, points: 6 },
  { result: 910, points: 7 },
  { result: 920, points: 8 },
  { result: 1000, points: 9 },
  { result: 1050, points: 10 }  
        ],
  },
  '50-54 лет': {
    'Прыжок в длину с места': [
    { result: 88, points: 1 },
    { result: 89, points: 2 },
    { result: 94, points: 3 },
    { result: 102, points: 4 },
    { result: 107, points: 5 },
    { result: 112, points: 6 },
    { result: 122, points: 7 },
    { result: 132, points: 8 },
    { result: 142, points: 9 },
    { result: 154, points: 10 }    
],
'Наклон вперед из положения сидя': [
{ result: 0, points: 1 },
{ result: 1, points: 2 },
{ result: 3, points: 3 },
{ result: 4, points: 4 },
{ result: 5, points: 5 },
{ result: 6, points: 6 },
{ result: 8, points: 7 },
{ result: 12, points: 8 },
{ result: 14, points: 9 },
{ result: 17, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 6, points: 1 },
{ result: 7, points: 2 },
{ result: 9, points: 3 },
{ result: 12, points: 4 },
{ result: 13, points: 5 },
{ result: 15, points: 6 },
{ result: 18, points: 7 },
{ result: 21, points: 8 },
{ result: 26, points: 9 },
{ result: 34, points: 10 }
],
  'Бег 30 м': [
  { result: 6.5, points: 10 },
{ result: 6.6, points: 9 },
{ result: 7.1, points: 8 },
{ result: 7.7, points: 7 },
{ result: 8.0, points: 6 },
{ result: 8.4, points: 5 },
{ result: 8.5, points: 4 },
{ result: 8.6, points: 3 },
{ result: 8.7, points: 2 },
{ result: 9.1, points: 1 }  
  ],
'Бег 6 мин': [
{ result: 730, points: 1 },
{ result: 740, points: 2 },
{ result: 770, points: 3 },
{ result: 790, points: 4 },
{ result: 800, points: 5 },
{ result: 820, points: 6 },
{ result: 830, points: 7 },
{ result: 840, points: 8 },
{ result: 880, points: 9 },
{ result: 950, points: 10 }
  ],
},
'55-59 лет': {
    'Прыжок в длину с места': [
    { result: 86, points: 1 },
    { result: 87, points: 2 },
    { result: 92, points: 3 },
    { result: 100, points: 4 },
    { result: 102, points: 5 },
    { result: 109, points: 6 },
    { result: 117, points: 7 },
    { result: 127, points: 8 },
    { result: 137, points: 9 },
    { result: 152, points: 10 }    
],
'Наклон вперед из положения сидя': [
{ result: -1, points: 1 },
{ result: 0, points: 2 },
{ result: 2, points: 3 },
{ result: 3, points: 4 },
{ result: 4, points: 5 },
{ result: 5, points: 6 },
{ result: 7, points: 7 },
{ result: 11, points: 8 },
{ result: 13, points: 9 },
{ result: 16, points: 10 }
],
'Поднимание туловища из положения лежа на спине': [
{ result: 5, points: 1 },
{ result: 6, points: 2 },
{ result: 8, points: 3 },
{ result: 11, points: 4 },
{ result: 12, points: 5 },
{ result: 13, points: 6 },
{ result: 15, points: 7 },
{ result: 18, points: 8 },
{ result: 21, points: 9 },
{ result: 29, points: 10 }
],
  'Бег 30 м': [
  { result: 6.7, points: 10 },
{ result: 6.8, points: 9 },
{ result: 7.5, points: 8 },
{ result: 8.0, points: 7 },
{ result: 8.2, points: 6 },
{ result: 8.5, points: 5 },
{ result: 8.6, points: 4 },
{ result: 8.7, points: 3 },
{ result: 8.9, points: 2 },
{ result: 9.3, points: 1 }
  ],
'Бег 6 мин': [
{ result: 660, points: 1 },
{ result: 670, points: 2 },
{ result: 750, points: 3 },
{ result: 780, points: 4 },
{ result: 790, points: 5 },
{ result: 810, points: 6 },
{ result: 820, points: 7 },
{ result: 830, points: 8 },
{ result: 860, points: 9 },
{ result: 920, points: 10 }
  ],
},
'60 лет и старше': {
      'Прыжок в длину с места': [
      { result: 51, points: 1 },
      { result: 52, points: 2 },
      { result: 62, points: 3 },
      { result: 73, points: 4 },
      { result: 82, points: 5 },
      { result: 87, points: 6 },
      { result: 89, points: 7 },
      { result: 94, points: 8 },
      { result: 117, points: 9 },
      { result: 142, points: 10 }      
      ],
'Наклон вперед из положения сидя': [
{ result: -2, points: 1 },
{ result: -1, points: 2 },
{ result: 1, points: 3 },
{ result: 2, points: 4 },
{ result: 3, points: 5 },
{ result: 4, points: 6 },
{ result: 6, points: 7 },
{ result: 9, points: 8 },
{ result: 12, points: 9 },
{ result: 15, points: 10 }
      ],
'Поднимание туловища из положения лежа на спине': [
{ result: 4, points: 1 },
{ result: 5, points: 2 },
{ result: 7, points: 3 },
{ result: 8, points: 4 },
{ result: 10, points: 5 },
{ result: 11, points: 6 },
{ result: 13, points: 7 },
{ result: 16, points: 8 },
{ result: 18, points: 9 },
{ result: 23, points: 10 }
    ],
      'Бег 30 м': [
      { result: 7.8, points: 10 },
{ result: 7.9, points: 9 },
{ result: 8.2, points: 8 },
{ result: 9.1, points: 7 },
{ result: 10.1, points: 6 },
{ result: 11.5, points: 5 },
{ result: 13.2, points: 4 },
{ result: 14.3, points: 3 },
{ result: 15.4, points: 2 },
{ result: 17.5, points: 1 }      
    ],
'Бег 6 мин': [
{ result: 640, points: 1 },
{ result: 650, points: 2 },
{ result: 740, points: 3 },
{ result: 750, points: 4 },
{ result: 780, points: 5 },
{ result: 800, points: 6 },
{ result: 810, points: 7 },
{ result: 820, points: 8 },
{ result: 850, points: 9 },
{ result: 870, points: 10 }
    ],
    },
    }
  },
    positiveDirectionEvents: [
      'Прыжок в длину с места',
      'Наклон вперед из положения сидя',
      'Сгибание и разгибание рук в упоре лежа',
      'Подтягивание на высокой перекладине',
      'Поднимание туловища из положения лежа на спине',
      'Бег 6 мин'
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
  allEventsCompleted() {
    return this.filteredEvents.every(event => event.points > 0);
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
      for (let i = scores.length - 1; i >= 0; i--) {
        if (event.result >= scores[i].result) {
          entry = scores[i];
          break;
        }
      }
    } else {
      entry = scores.find(e => event.result <= e.result);
    }

    event.points = entry ? entry.points : 0;
  },
  allEventsHaveMinPoints(minPoints) {
    return this.filteredEvents.every(event => event.points >= minPoints);
  }
}
};
</script>

<style>
@media only screen (max-width: 768px) {
.competition {
  padding: 20px;
}
label {
  display: block;
  width: 100%;
  margin-bottom: 5px;
}
input[type="number"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 5px;
}
[style*="margin-bottom:"] {
  margin-bottom: 10px;
}
}
</style>