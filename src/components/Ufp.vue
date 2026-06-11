<template>
<div>
  <h1>Шкала оценки уровня физической подготовленности учащихся</h1>
  
  <div class="selectors">
    <label for="gender">Пол:</label>
    <select v-model="selectedGender" id="gender">
      <option value="мальчики">Мальчики</option>
      <option value="девочки">Девочки</option>
    </select>

    <label for="class">Класс:</label>
    <select v-model="selectedClass" id="class">
      <option v-for="c in classes" :key="c" :value="c">{{ c }}</option>
    </select>
  </div>

  <form @submit.prevent="submitForm">
    <div class="form-group" v-for="(score, index) in scoreFields" :key="index">
      <label :for="score.id">{{ score.label }}:</label>
      <input 
        type="number" 
        v-model="scores[score.key]" 
        :id="score.id" 
        required 
        @input="updateScore(score.key)" 
      />
      <div>Баллы: {{ score.points }}</div>
    </div>
    <div class="average-score">
      <strong>Средний балл: {{ averageScore }}</strong>
    </div>
    <div class="level">
      <strong>Уровень: {{ level }}</strong>
    </div>
  </form>
</div>
</template>

<script>
export default {
data() {
  return {
    selectedGender: 'мальчики',
    selectedClass: '1 класс', // Значение по умолчанию
    classes: [
      '1 класс',
      '2 класс',
      '3 класс',
      '4 класс',
      '5 класс',
      '6 класс',
      '7 класс',
      '8 класс',
      '9 класс',
      '10 класс',
      '11 класс'
    ],
    scores: {
      running30m: null,
      shuttleRun: null,
      longJump: null,
      gymnastics: null,
      forwardBend: null,
      longRun: null
    },
    scoreFields: [
      { label: 'Бег 30м', key: 'running30m', id: 'running30m', points: 0 },
      { label: 'Челночный бег 4х9м', key: 'shuttleRun', id: 'shuttleRun', points: 0 },
      { label: 'Прыжок в длину', key: 'longJump', id: 'longJump', points: 0 },
      { label: 'Гимнастика', key: 'gymnastics', id: 'gymnastics', points: 0 },
      { label: 'Наклон вперед', key: 'forwardBend', id: 'forwardBend', points: 0 },
      { label: 'Длительный бег', key: 'longRun', id: 'longRun', points: 0 }
    ],
    scoringData: {
    running30m: {
      'мальчики': {
        '1 класс': [
          { result: 6.2, points: 10 },
          { result: 6.4, points: 9 },
          { result: 6.5, points: 8 },
          { result: 6.7, points: 7 },
          { result: 6.9, points: 6 },
          { result: 7.0, points: 5 },
          { result: 7.3, points: 4 },
          { result: 7.5, points: 3 },
          { result: 7.6, points: 2 },
          { result: 7.7, points: 1 }
        ],
        '2 класс': [
{ result: 5.8, points: 10 },
    { result: 6.0, points: 9 },
    { result: 6.1, points: 8 },
    { result: 6.3, points: 7 },
    { result: 6.4, points: 6 },
    { result: 6.6, points: 5 },
    { result: 6.7, points: 4 },
    { result: 6.9, points: 3 },
    { result: 7.0, points: 2 },
    { result: 7.2, points: 1 }
        ],
        '3 класс': [
{ result: 5.6, points: 10 },
    { result: 5.8, points: 9 },
    { result: 5.9, points: 8 },
    { result: 6.1, points: 7 },
    { result: 6.2, points: 6 },
    { result: 6.4, points: 5 },
    { result: 6.5, points: 4 },
    { result: 6.6, points: 3 },
    { result: 6.8, points: 2 },
    { result: 6.9, points: 1 }
        ],
        '4 класс': [
{ result: 5.7, points: 10 },
    { result: 5.8, points: 9 },
    { result: 6, points: 8 },
    { result: 6.1, points: 7 },
    { result: 6.2, points: 6 },
    { result: 6.3, points: 5 },
    { result: 6.4, points: 4 },
    { result: 6.7, points: 3 },
    { result: 6.8, points: 2 },
    { result: 6.9, points: 1 }
        ],
        '5 класс': [
{ result: 5.3, points: 10 },
    { result: 5.5, points: 9 },
    { result: 5.6, points: 8 },
    { result: 5.7, points: 7 },
    { result: 5.9, points: 6 },
    { result: 6.1, points: 5 },
    { result: 6.4, points: 4 },
    { result: 6.7, points: 3 },
    { result: 7.0, points: 2 },
    { result: 7.2, points: 1 }
        ],
        '6 класс': [
{ result: 5.2, points: 10 },
    { result: 5.3, points: 9 },
    { result: 5.4, points: 8 },
    { result: 5.5, points: 7 },
    { result: 5.6, points: 6 },
    { result: 5.8, points: 5 },
    { result: 6.0, points: 4 },
    { result: 6.2, points: 3 },
    { result: 6.4, points: 2 },
    { result: 6.6, points: 1 }
        ],
        '7 класс': [
{ result: 4.9, points: 10 },
    { result: 5.0, points: 9 },
    { result: 5.1, points: 8 },
    { result: 5.2, points: 7 },
    { result: 5.3, points: 6 },
    { result: 5.5, points: 5 },
    { result: 5.8, points: 4 },
    { result: 6.0, points: 3 },
    { result: 6.2, points: 2 },
    { result: 6.4, points: 1 }
        ],
        '8 класс': [
{ result: 4.7, points: 10 },
    { result: 4.8, points: 9 },
    { result: 4.9, points: 8 },
    { result: 5.0, points: 7 },
    { result: 5.1, points: 6 },
    { result: 5.3, points: 5 },
    { result: 5.5, points: 4 },
    { result: 5.7, points: 3 },
    { result: 5.9, points: 2 },
    { result: 6.0, points: 1 }
        ],
        '9 класс': [
{ result: 4.5, points: 10 },
    { result: 4.7, points: 9 },
    { result: 4.8, points: 8 },
    { result: 4.9, points: 7 },
    { result: 5.0, points: 6 },
    { result: 5.2, points: 5 },
    { result: 5.4, points: 4 },
    { result: 5.6, points: 3 },
    { result: 5.8, points: 2 },
    { result: 6.0, points: 1 }
        ],
        '10 класс': [
{ result: 4.3, points: 10 },
        { result: 4.4, points: 9 },
        { result: 4.5, points: 8 },
        { result: 4.6, points: 7 },
        { result: 4.7, points: 6 },
        { result: 4.9, points: 5 },
        { result: 5.1, points: 4 },
        { result: 5.3, points: 3 },
        { result: 5.5, points: 2 },
        { result: 5.7, points: 1 }
        ],
        '11 класс': [
{ result: 4.2, points: 10 },
        { result: 4.3, points: 9 },
        { result: 4.4, points: 8 },
        { result: 4.5, points: 7 },
        { result: 4.6, points: 6 },
        { result: 4.8, points: 5 },
        { result: 5.0, points: 4 },
        { result: 5.1, points: 3 },
        { result: 5.3, points: 2 },
        { result: 5.5, points: 1 }
        ],            
      },
      'девочки': {
        '1 класс': [
          { result: 6.2, points: 10 },
          { result: 6.4, points: 9 },
          { result: 6.5, points: 8 },
          { result: 6.6, points: 7 },
          { result: 6.8, points: 6 },
          { result: 6.9, points: 5 },
          { result: 7.2, points: 4 },
          { result: 7.4, points: 3 },
          { result: 7.7, points: 2 },
          { result: 7.8, points: 1 }
        ],
        '2 класс': [
{ result: 6.0, points: 10 },
    { result: 6.1, points: 9 },
    { result: 6.3, points: 8 },
    { result: 6.4, points: 7 },
    { result: 6.6, points: 6 },
    { result: 6.7, points: 5 },
    { result: 7.1, points: 4 },
    { result: 7.4, points: 3 },
    { result: 7.6, points: 2 },
    { result: 7.7, points: 1 }
        ],
        '3 класс': [
{ result: 5.8, points: 10 },
    { result: 5.9, points: 9 },
    { result: 6.1, points: 8 },
    { result: 6.2, points: 7 },
    { result: 6.5, points: 6 },
    { result: 6.6, points: 5 },
    { result: 6.9, points: 4 },
    { result: 7.2, points: 3 },
    { result: 7.3, points: 2 },
    { result: 7.4, points: 1 }
        ],
        '4 класс': [
{ result: 5.8, points: 10 },
    { result: 5.9, points: 9 },
    { result: 6, points: 8 },
    { result: 6.1, points: 7 },
    { result: 6.2, points: 6 },
    { result: 6.3, points: 5 },
    { result: 6.5, points: 4 },
    { result: 6.8, points: 3 },
    { result: 7.2, points: 2 },
    { result: 7.3, points: 1 }
        ],
        '5 класс': [
{ result: 5.6, points: 10 },
    { result: 5.7, points: 9 },
    { result: 5.8, points: 8 },
    { result: 5.9, points: 7 },
    { result: 6.0, points: 6 },
    { result: 6.2, points: 5 },
    { result: 6.4, points: 4 },
    { result: 6.7, points: 3 },
    { result: 6.9, points: 2 },
    { result: 7.1, points: 1 }
        ],
        '6 класс': [
{ result: 5.3, points: 10 },
    { result: 5.4, points: 9 },
    { result: 5.6, points: 8 },
    { result: 5.7, points: 7 },
    { result: 5.8, points: 6 },
    { result: 6.0, points: 5 },
    { result: 6.3, points: 4 },
    { result: 6.5, points: 3 },
    { result: 6.8, points: 2 },
    { result: 7.0, points: 1 }
        ],
        '7 класс': [
{ result: 5.2, points: 10 },
    { result: 5.3, points: 9 },
    { result: 5.4, points: 8 },
    { result: 5.5, points: 7 },
    { result: 5.6, points: 6 },
    { result: 5.8, points: 5 },
    { result: 6.0, points: 4 },
    { result: 6.2, points: 3 },
    { result: 6.4, points: 2 },
    { result: 6.6, points: 1 }
        ],
        '8 класс': [
{ result: 5.1, points: 10 },
    { result: 5.3, points: 9 },
    { result: 5.4, points: 8 },
    { result: 5.5, points: 7 },
    { result: 5.6, points: 6 },
    { result: 5.8, points: 5 },
    { result: 6.0, points: 4 },
    { result: 6.2, points: 3 },
    { result: 6.5, points: 2 },
    { result: 6.7, points: 1 }
        ],
        '9 класс': [
{ result: 5.1, points: 10 },
    { result: 5.2, points: 9 },
    { result: 5.3, points: 8 },
    { result: 5.4, points: 7 },
    { result: 5.5, points: 6 },
    { result: 5.7, points: 5 },
    { result: 5.9, points: 4 },
    { result: 6.1, points: 3 },
    { result: 6.3, points: 2 },
    { result: 6.5, points: 1 }
        ],
        '10 класс': [
    { result: 4.9, points: 10 },
    { result: 5.0, points: 9 },
    { result: 5.1, points: 8 },
    { result: 5.2, points: 7 },
    { result: 5.3, points: 6 },
    { result: 5.5, points: 5 },
    { result: 5.7, points: 4 },
    { result: 6.0, points: 3 },
    { result: 6.2, points: 2 },
    { result: 6.4, points: 1 }
        ],
        '11 класс': [
{ result: 5.0, points: 10 },
        { result: 5.1, points: 9 },
        { result: 5.2, points: 8 },
        { result: 5.3, points: 7 },
        { result: 5.4, points: 6 },
        { result: 5.5, points: 5 },
        { result: 5.7, points: 4 },
        { result: 5.9, points: 3 },
        { result: 6.1, points: 2 },
        { result: 6.3, points: 1 }
        ],
      }
    },
    shuttleRun: {
      'мальчики': {
        '1 класс': [
          { result: 11.5, points: 10 },
          { result: 11.8, points: 9 },
          { result: 12.1, points: 8 },
          { result: 12.3, points: 7 },
          { result: 12.5, points: 6 },
          { result: 12.8, points: 5 },
          { result: 13.1, points: 4 },
          { result: 13.4, points: 3 },
          { result: 13.9, points: 2 },
          { result: 14.0, points: 1 }
        ],
        '2 класс': [
{ result: 11.0, points: 10 },
    { result: 11.4, points: 9 },
    { result: 11.6, points: 8 },
    { result: 11.8, points: 7 },
    { result: 12.0, points: 6 },
    { result: 12.3, points: 5 },
    { result: 12.6, points: 4 },
    { result: 12.8, points: 3 },
    { result: 13.1, points: 2 },
    { result: 13.4, points: 1 }
        ],
        '3 класс': [
{ result: 10.7, points: 10 },
    { result: 10.9, points: 9 },
    { result: 11.2, points: 8 },
    { result: 11.4, points: 7 },
    { result: 11.7, points: 6 },
    { result: 11.9, points: 5 },
    { result: 12.2, points: 4 },
    { result: 12.5, points: 3 },
    { result: 12.7, points: 2 },
    { result: 12.8, points: 1 }
        ],
        '4 класс': [
{ result: 10.4, points: 10 },
    { result: 10.6, points: 9 },
    { result: 10.9, points: 8 },
    { result: 11.1, points: 7 },
    { result: 11.3, points: 6 },
    { result: 11.6, points: 5 },
    { result: 11.8, points: 4 },
    { result: 12.1, points: 3 },
    { result: 12.3, points: 2 },
    { result: 12.4, points: 1 }
        ],
        '5 класс': [
{ result: 10.1, points: 10 },
    { result: 10.3, points: 9 },
    { result: 10.5, points: 8 },
    { result: 10.7, points: 7 },
    { result: 10.9, points: 6 },
    { result: 11.3, points: 5 },
    { result: 11.7, points: 4 },
    { result: 12.1, points: 3 },
    { result: 12.5, points: 2 },
    { result: 12.9, points: 1 }
        ],
        '6 класс': [
{ result: 9.6, points: 10 },
    { result: 9.8, points: 9 },
    { result: 10.0, points: 8 },
    { result: 10.2, points: 7 },
    { result: 10.4, points: 6 },
    { result: 10.8, points: 5 },
    { result: 11.2, points: 4 },
    { result: 11.6, points: 3 },
    { result: 12.0, points: 2 },
    { result: 12.3, points: 1 }
        ],
        '7 класс': [
{ result: 9.4, points: 10 },
    { result: 9.6, points: 9 },
    { result: 9.8, points: 8 },
    { result: 9.9, points: 7 },
    { result: 10.1, points: 6 },
    { result: 10.4, points: 5 },
    { result: 10.7, points: 4 },
    { result: 11.0, points: 3 },
    { result: 11.3, points: 2 },
    { result: 11.7, points: 1 }
        ],
        '8 класс': [
{ result: 9.2, points: 10 },
    { result: 9.4, points: 9 },
    { result: 9.5, points: 8 },
    { result: 9.7, points: 7 },
    { result: 9.8, points: 6 },
    { result: 10.1, points: 5 },
    { result: 10.4, points: 4 },
    { result: 10.7, points: 3 },
    { result: 10.9, points: 2 },
    { result: 11.2, points: 1 }
        ],
        '9 класс': [
{ result: 9.0, points: 10 },
    { result: 9.1, points: 9 },
    { result: 9.3, points: 8 },
    { result: 9.4, points: 7 },
    { result: 9.6, points: 6 },
    { result: 9.9, points: 5 },
    { result: 10.1, points: 4 },
    { result: 10.4, points: 3 },
    { result: 10.7, points: 2 },
    { result: 11.0, points: 1 }
        ],
        '10 класс': [
{ result: 8.8, points: 10 },
        { result: 8.9, points: 9 },
        { result: 9.0, points: 8 },
        { result: 9.2, points: 7 },
        { result: 9.3, points: 6 },
        { result: 9.6, points: 5 },
        { result: 9.8, points: 4 },
        { result: 10.1, points: 3 },
        { result: 10.3, points: 2 },
        { result: 10.6, points: 1 }
        ],
        '11 класс': [
{ result: 8.6, points: 10 },
        { result: 8.8, points: 9 },
        { result: 8.9, points: 8 },
        { result: 9.0, points: 7 },
        { result: 9.1, points: 6 },
        { result: 9.3, points: 5 },
        { result: 9.5, points: 4 },
        { result: 9.7, points: 3 },
        { result: 9.9, points: 2 },
        { result: 10.1, points: 1 }
        ],
      },
      'девочки': {
        '1 класс': [
          { result: 12.0, points: 10 },
          { result: 12.2, points: 9 },
          { result: 12.5, points: 8 },
          { result: 12.9, points: 7 },
          { result: 13.2, points: 6 },
          { result: 13.4, points: 5 },
          { result: 13.7, points: 4 },
          { result: 14.0, points: 3 },
          { result: 14.6, points: 2 },
          { result: 14.7, points: 1 }
        ],
        '2 класс': [
{ result: 11.4, points: 10 },
    { result: 11.8, points: 9 },
    { result: 12.0, points: 8 },
    { result: 12.2, points: 7 },
    { result: 12.6, points: 6 },
    { result: 12.9, points: 5 },
    { result: 13.1, points: 4 },
    { result: 13.6, points: 3 },
    { result: 13.9, points: 2 },
    { result: 14.0, points: 1 }
        ],
        '3 класс': [
{ result: 11.1, points: 10 },
    { result: 11.4, points: 9 },
    { result: 11.6, points: 8 },
    { result: 11.9, points: 7 },
    { result: 12.0, points: 6 },
    { result: 12.2, points: 5 },
    { result: 12.4, points: 4 },
    { result: 12.7, points: 3 },
    { result: 13.2, points: 2 },
    { result: 13.3, points: 1 }
        ],
        '4 класс': [
{ result: 10.9, points: 10 },
    { result: 11.1, points: 9 },
    { result: 11.3, points: 8 },
    { result: 11.6, points: 7 },
    { result: 11.8, points: 6 },
    { result: 12, points: 5 },
    { result: 12.2, points: 4 },
    { result: 12.4, points: 3 },
    { result: 12.6, points: 2 },
    { result: 12.7, points: 1 }
        ],
        '5 класс': [
{ result: 10.4, points: 10 },
    { result: 10.7, points: 9 },
    { result: 10.9, points: 8 },
    { result: 11.1, points: 7 },
    { result: 11.3, points: 6 },
    { result: 11.8, points: 5 },
    { result: 12.3, points: 4 },
    { result: 12.7, points: 3 },
    { result: 13.2, points: 2 },
    { result: 13.6, points: 1 }
        ],
        '6 класс': [
{ result: 10.3, points: 10 },
    { result: 10.5, points: 9 },
    { result: 10.7, points: 8 },
    { result: 10.9, points: 7 },
    { result: 11.1, points: 6 },
    { result: 11.5, points: 5 },
    { result: 11.9, points: 4 },
    { result: 12.3, points: 3 },
    { result: 12.7, points: 2 },
    { result: 13.1, points: 1 }
        ],
        '7 класс': [
{ result: 10.2, points: 10 },
    { result: 10.3, points: 9 },
    { result: 10.5, points: 8 },
    { result: 10.6, points: 7 },
    { result: 10.8, points: 6 },
    { result: 11.1, points: 5 },
    { result: 11.4, points: 4 },
    { result: 11.7, points: 3 },
    { result: 12.0, points: 2 },
    { result: 12.3, points: 1 }
        ],
        '8 класс': [
{ result: 10.1, points: 10 },
    { result: 10.3, points: 9 },
    { result: 10.4, points: 8 },
    { result: 10.6, points: 7 },
    { result: 10.8, points: 6 },
    { result: 11.1, points: 5 },
    { result: 11.4, points: 4 },
    { result: 11.8, points: 3 },
    { result: 12.1, points: 2 },
    { result: 12.4, points: 1 }
        ],
        '9 класс': [
{ result: 10.0, points: 10 },
    { result: 10.1, points: 9 },
    { result: 10.3, points: 8 },
    { result: 10.5, points: 7 },
    { result: 10.7, points: 6 },
    { result: 11.1, points: 5 },
    { result: 11.4, points: 4 },
    { result: 11.8, points: 3 },
    { result: 12.1, points: 2 },
    { result: 12.5, points: 1 }
        ],
        '10 класс': [
{ result: 9.8, points: 10 },
        { result: 10.0, points: 9 },
        { result: 10.1, points: 8 },
        { result: 10.3, points: 7 },
        { result: 10.5, points: 6 },
        { result: 10.8, points: 5 },
        { result: 11.2, points: 4 },
        { result: 11.5, points: 3 },
        { result: 11.9, points: 2 },
        { result: 12.2, points: 1 }
        ],
        '11 класс': [
{ result: 9.8, points: 10 },
        { result: 9.9, points: 9 },
        { result: 10.1, points: 8 },
        { result: 10.2, points: 7 },
        { result: 10.4, points: 6 },
        { result: 10.7, points: 5 },
        { result: 11.0, points: 4 },
        { result: 11.2, points: 3 },
        { result: 11.5, points: 2 },
        { result: 11.8, points: 1 }
        ],
      }
    },
    longJump: {
      'мальчики': {
        '1 класс': [
          { result: 140, points: 10 },
          { result: 134, points: 9 },
          { result: 130, points: 8 },
          { result: 126, points: 7 },
          { result: 122, points: 6 },
          { result: 119, points: 5 },
          { result: 115, points: 4 },
          { result: 110, points: 3 },
          { result: 104, points: 2 },
          { result: 103, points: 1 }
        ],
        '2 класс': [
{ result: 146, points: 10 },
    { result: 142, points: 9 },
    { result: 137, points: 8 },
    { result: 132, points: 7 },
    { result: 128, points: 6 },
    { result: 123, points: 5 },
    { result: 118, points: 4 },
    { result: 114, points: 3 },
    { result: 109, points: 2 },
    { result: 104, points: 1 }
        ],
        '3 класс': [
{ result: 159, points: 10 },
    { result: 154, points: 9 },
    { result: 149, points: 8 },
    { result: 144, points: 7 },
    { result: 139, points: 6 },
    { result: 134, points: 5 },
    { result: 129, points: 4 },
    { result: 124, points: 3 },
    { result: 120, points: 2 },
    { result: 119, points: 1 }
        ],
        '4 класс': [
{ result: 171, points: 10 },
    { result: 166, points: 9 },
    { result: 161, points: 8 },
    { result: 156, points: 7 },
    { result: 151, points: 6 },
    { result: 148, points: 5 },
    { result: 141, points: 4 },
    { result: 135, points: 3 },
    { result: 130, points: 2 },
    { result: 129, points: 1 }
        ],
        '5 класс': [
{ result: 179, points: 10 },
    { result: 174, points: 9 },
    { result: 170, points: 8 },
    { result: 165, points: 7 },
    { result: 160, points: 6 },
    { result: 151, points: 5 },
    { result: 143, points: 4 },
    { result: 133, points: 3 },
    { result: 123, points: 2 },
    { result: 114, points: 1 }
        ],
        '6 класс': [
{ result: 189, points: 10 },
    { result: 184, points: 9 },
    { result: 179, points: 8 },
    { result: 174, points: 7 },
    { result: 169, points: 6 },
    { result: 160, points: 5 },
    { result: 150, points: 4 },
    { result: 140, points: 3 },
    { result: 130, points: 2 },
    { result: 120, points: 1 }
        ],
        '7 класс': [
{ result: 206, points: 10 },
    { result: 201, points: 9 },
    { result: 195, points: 8 },
    { result: 190, points: 7 },
    { result: 185, points: 6 },
    { result: 174, points: 5 },
    { result: 164, points: 4 },
    { result: 153, points: 3 },
    { result: 143, points: 2 },
    { result: 132, points: 1 }
        ],
        '8 класс': [
{ result: 217, points: 10 },
    { result: 212, points: 9 },
    { result: 208, points: 8 },
    { result: 203, points: 7 },
    { result: 198, points: 6 },
    { result: 189, points: 5 },
    { result: 179, points: 4 },
    { result: 170, points: 3 },
    { result: 160, points: 2 },
    { result: 151, points: 1 }
        ],
        '9 класс': [
{ result: 233, points: 10 },
    { result: 228, points: 9 },
    { result: 223, points: 8 },
    { result: 218, points: 7 },
    { result: 212, points: 6 },
    { result: 202, points: 5 },
    { result: 192, points: 4 },
    { result: 181, points: 3 },
    { result: 171, points: 2 },
    { result: 160, points: 1 }
        ],
        '10 класс': [
{ result: 247, points: 10 },
        { result: 242, points: 9 },
        { result: 236, points: 8 },
        { result: 231, points: 7 },
        { result: 225, points: 6 },
        { result: 215, points: 5 },
        { result: 204, points: 4 },
        { result: 193, points: 3 },
        { result: 182, points: 2 },
        { result: 171, points: 1 }
        ],
        '11 класс': [
{ result: 252, points: 10 },
        { result: 247, points: 9 },
        { result: 242, points: 8 },
        { result: 237, points: 7 },
        { result: 231, points: 6 },
        { result: 220, points: 5 },
        { result: 212, points: 4 },
        { result: 203, points: 3 },
        { result: 192, points: 2 },
        { result: 182, points: 1 }
        ],
      },
      'девочки': {
        '1 класс': [
          { result: 130, points: 10 },
          { result: 122, points: 9 },
          { result: 119, points: 8 },
          { result: 115, points: 7 },
          { result: 112, points: 6 },
          { result: 110, points: 5 },
          { result: 105, points: 4 },
          { result: 100, points: 3 },
          { result: 95, points: 2 },
          { result: 94, points: 1 }
        ],
        '2 класс': [
{ result: 142, points: 10 },
    { result: 137, points: 9 },
    { result: 132, points: 8 },
    { result: 130, points: 7 },
    { result: 125, points: 6 },
    { result: 123, points: 5 },
    { result: 119, points: 4 },
    { result: 114, points: 3 },
    { result: 105, points: 2 },
    { result: 104, points: 1 }
        ],
        '3 класс': [
{ result: 152, points: 10 },
    { result: 147, points: 9 },
    { result: 141, points: 8 },
    { result: 138, points: 7 },
    { result: 134, points: 6 },
    { result: 129, points: 5 },
    { result: 125, points: 4 },
    { result: 120, points: 3 },
    { result: 115, points: 2 },
    { result: 114, points: 1 }
        ],
        '4 класс': [
{ result: 159, points: 10 },
    { result: 154, points: 9 },
    { result: 149, points: 8 },
    { result: 145, points: 7 },
    { result: 140, points: 6 },
    { result: 135, points: 5 },
    { result: 130, points: 4 },
    { result: 126, points: 3 },
    { result: 121, points: 2 },
    { result: 120, points: 1 }
        ],
        '5 класс': [
{ result: 160, points: 10 },
    { result: 155, points: 9 },
    { result: 150, points: 8 },
    { result: 145, points: 7 },
    { result: 140, points: 6 },
    { result: 135, points: 5 },
    { result: 129, points: 4 },
    { result: 120, points: 3 },
    { result: 110, points: 2 },
    { result: 100, points: 1 }
        ],
        '6 класс': [
{ result: 164, points: 10 },
    { result: 159, points: 9 },
    { result: 155, points: 8 },
    { result: 150, points: 7 },
    { result: 146, points: 6 },
    { result: 138, points: 5 },
    { result: 132, points: 4 },
    { result: 128, points: 3 },
    { result: 119, points: 2 },
    { result: 110, points: 1 }
        ],
        '7 класс': [
{ result: 170, points: 10 },
    { result: 165, points: 9 },
    { result: 160, points: 8 },
    { result: 155, points: 7 },
    { result: 150, points: 6 },
    { result: 146, points: 5 },
    { result: 140, points: 4 },
    { result: 137, points: 3 },
    { result: 128, points: 2 },
    { result: 119, points: 1 }
        ],
        '8 класс': [
{ result: 175, points: 10 },
    { result: 170, points: 9 },
    { result: 165, points: 8 },
    { result: 160, points: 7 },
    { result: 155, points: 6 },
    { result: 150, points: 5 },
    { result: 146, points: 4 },
    { result: 136, points: 3 },
    { result: 126, points: 2 },
    { result: 117, points: 1 }
        ],
        '9 класс': [
{ result: 179, points: 10 },
    { result: 174, points: 9 },
    { result: 170, points: 8 },
    { result: 165, points: 7 },
    { result: 160, points: 6 },
    { result: 155, points: 5 },
    { result: 150, points: 4 },
    { result: 145, points: 3 },
    { result: 136, points: 2 },
    { result: 128, points: 1 }
        ],
        '10 класс': [
{ result: 190, points: 10 },
        { result: 185, points: 9 },
        { result: 179, points: 8 },
        { result: 172, points: 7 },
        { result: 167, points: 6 },
        { result: 163, points: 5 },
        { result: 159, points: 4 },
        { result: 149, points: 3 },
        { result: 140, points: 2 },
        { result: 131, points: 1 }
        ],
        '11 класс': [
{ result: 194, points: 10 },
        { result: 189, points: 9 },
        { result: 184, points: 8 },
        { result: 179, points: 7 },
        { result: 168, points: 6 },
        { result: 158, points: 5 },
        { result: 147, points: 4 },
        { result: 137, points: 3 },
        { result: 130, points: 2 },
        { result: 126, points: 1 }
        ],
      }
    },
    gymnastics: {
      'мальчики': {
        '1 класс': [
          { result: 23, points: 10 },
          { result: 17, points: 9 },
          { result: 14, points: 8 },
          { result: 12, points: 7 },
          { result: 10, points: 6 },
          { result: 7, points: 5 },
          { result: 5, points: 4 },
          { result: 4, points: 3 },
          { result: 3, points: 2 },
          { result: 2, points: 1 }
        ],
        '2 класс': [
{ result: 23, points: 10 },
    { result: 21, points: 9 },
    { result: 18, points: 8 },
    { result: 16, points: 7 },
    { result: 13, points: 6 },
    { result: 11, points: 5 },
    { result: 8, points: 4 },
    { result: 6, points: 3 },
    { result: 3, points: 2 },
    { result: 1, points: 1 }
        ],
        '3 класс': [
{ result: 26, points: 10 },
    { result: 23, points: 9 },
    { result: 21, points: 8 },
    { result: 20, points: 7 },
    { result: 15, points: 6 },
    { result: 13, points: 5 },
    { result: 10, points: 4 },
    { result: 7, points: 3 },
    { result: 5, points: 2 },
    { result: 2, points: 1 }
        ],
        '4 класс': [
{ result: 29, points: 10 },
    { result: 26, points: 9 },
    { result: 23, points: 8 },
    { result: 20, points: 7 },
    { result: 17, points: 6 },
    { result: 15, points: 5 },
    { result: 12, points: 4 },
    { result: 9, points: 3 },
    { result: 6, points: 2 },
    { result: 5, points: 1 }
        ],
        '5 класс': [
{ result: 5, points: 10 },
    { result: 4, points: 9 },
    { result: 3, points: 8 },
    { result: 2, points: 7 },
    { result: 1, points: 6 },
    { result: 0, points: 5 },
    { result: 0, points: 4 },
    { result: 0, points: 3 },
    { result: 0, points: 2 },
    { result: 0, points: 1 }
        ],
        '6 класс': [
{ result: 6, points: 10 },
    { result: 5, points: 9 },
    { result: 4, points: 8 },
    { result: 3, points: 7 },
    { result: 2, points: 6 },
    { result: 1, points: 5 },
    { result: 0, points: 4 },
    { result: 0, points: 3 },
    { result: 0, points: 2 },
    { result: 0, points: 1 }
        ],
        '7 класс': [
{ result: 7, points: 10 },
    { result: 6, points: 9 },
    { result: 5, points: 8 },
    { result: 4, points: 7 },
    { result: 3, points: 6 },
    { result: 2, points: 5 },
    { result: 1, points: 4 },
    { result: 0, points: 3 },
    { result: 0, points: 2 },
    { result: 0, points: 1 }
        ],
        '8 класс': [
{ result: 9, points: 10 },
    { result: 8, points: 9 },
    { result: 7, points: 8 },
    { result: 6, points: 7 },
    { result: 5, points: 6 },
    { result: 4, points: 5 },
    { result: 3, points: 4 },
    { result: 2, points: 3 },
    { result: 1, points: 2 },
    { result: 0, points: 1 }
        ],
        '9 класс': [
{ result: 12, points: 10 },
    { result: 11, points: 9 },
    { result: 10, points: 8 },
    { result: 9, points: 7 },
    { result: 8, points: 6 },
    { result: 6, points: 5 },
    { result: 5, points: 4 },
    { result: 4, points: 3 },
    { result: 3, points: 2 },
    { result: 2, points: 1 }
        ],
        '10 класс': [
{ result: 13, points: 10 },
        { result: 12, points: 9 },
        { result: 11, points: 8 },
        { result: 10, points: 7 },
        { result: 9, points: 6 },
        { result: 7, points: 5 },
        { result: 4, points: 4 },
        { result: 2, points: 3 },
        { result: 1, points: 2 },
        { result: 0, points: 1 }
        ],
        '11 класс': [
{ result: 16, points: 10 },
        { result: 15, points: 9 },
        { result: 13, points: 8 },
        { result: 12, points: 7 },
        { result: 11, points: 6 },
        { result: 8, points: 5 },
        { result: 6, points: 4 },
        { result: 3, points: 3 },
        { result: 2, points: 2 },
        { result: 1, points: 1 }
        ],
      },
      'девочки': {
        '1 класс': [
          { result: 20, points: 10 },
          { result: 18, points: 9 },
          { result: 17, points: 8 },
          { result: 15, points: 7 },
          { result: 14, points: 6 },
          { result: 12, points: 5 },
          { result: 11, points: 4 },
          { result: 10, points: 3 },
          { result: 8, points: 2 },
          { result: 7, points: 1 }
        ],
        '2 класс': [
{ result: 24, points: 10 },
    { result: 21, points: 9 },
    { result: 20, points: 8 },
    { result: 19, points: 7 },
    { result: 18, points: 6 },
    { result: 17, points: 5 },
    { result: 16, points: 4 },
    { result: 14, points: 3 },
    { result: 13, points: 2 },
    { result: 10, points: 1 }
        ],
        '3 класс': [
{ result: 24, points: 10 },
    { result: 22, points: 9 },
    { result: 21, points: 8 },
    { result: 20, points: 7 },
    { result: 19, points: 6 },
    { result: 18, points: 5 },
    { result: 17, points: 4 },
    { result: 16, points: 3 },
    { result: 14, points: 2 },
    { result: 13, points: 1 },
        ],
        '4 класс': [
{ result: 25, points: 10 },
    { result: 19, points: 9 },
    { result: 17, points: 8 },
    { result: 15, points: 7 },
    { result: 14, points: 6 },
    { result: 13, points: 5 },
    { result: 11, points: 4 },
    { result: 9, points: 3 },
    { result: 2, points: 2 },
    { result: 1, points: 1 }
        ],
        '5 класс': [
{ result: 47, points: 10 },
    { result: 45, points: 9 },
    { result: 43, points: 8 },
    { result: 41, points: 7 },
    { result: 39, points: 6 },
    { result: 35, points: 5 },
    { result: 31, points: 4 },
    { result: 27, points: 3 },
    { result: 23, points: 2 },
    { result: 19, points: 1 }
        ],
        '6 класс': [
{ result: 50, points: 10 },
    { result: 48, points: 9 },
    { result: 46, points: 8 },
    { result: 43, points: 7 },
    { result: 41, points: 6 },
    { result: 37, points: 5 },
    { result: 32, points: 4 },
    { result: 28, points: 3 },
    { result: 23, points: 2 },
    { result: 19, points: 1 }
        ],
        '7 класс': [
{ result: 51, points: 10 },
    { result: 49, points: 9 },
    { result: 47, points: 8 },
    { result: 45, points: 7 },
    { result: 43, points: 6 },
    { result: 40, points: 5 },
    { result: 36, points: 4 },
    { result: 32, points: 3 },
    { result: 29, points: 2 },
    { result: 25, points: 1 }
        ],
        '8 класс': [
{ result: 52, points: 10 },
    { result: 50, points: 9 },
    { result: 48, points: 8 },
    { result: 46, points: 7 },
    { result: 44, points: 6 },
    { result: 41, points: 5 },
    { result: 37, points: 4 },
    { result: 33, points: 3 },
    { result: 30, points: 2 },
    { result: 26, points: 1 }
        ],
        '9 класс': [
{ result: 55, points: 10 },
    { result: 53, points: 9 },
    { result: 51, points: 8 },
    { result: 49, points: 7 },
    { result: 47, points: 6 },
    { result: 43, points: 5 },
    { result: 39, points: 4 },
    { result: 35, points: 3 },
    { result: 31, points: 2 },
    { result: 28, points: 1 }
        ],
        '10 класс': [
        { result: 58, points: 10 },
        { result: 56, points: 9 },
        { result: 54, points: 8 },
        { result: 52, points: 7 },
        { result: 50, points: 6 },
        { result: 46, points: 5 },
        { result: 42, points: 4 },
        { result: 38, points: 3 },
        { result: 34, points: 2 },
        { result: 30, points: 1 }
        ],
        '11 класс': [
{ result: 57, points: 10 },
        { result: 55, points: 9 },
        { result: 53, points: 8 },
        { result: 52, points: 7 },
        { result: 50, points: 6 },
        { result: 47, points: 5 },
        { result: 44, points: 4 },
        { result: 41, points: 3 },
        { result: 38, points: 2 },
        { result: 35, points: 1 }
        ],
      }
    },
    forwardBend: {
      'мальчики': {
        '1 класс': [
          { result: 10, points: 10 },
          { result: 7, points: 9 },
          { result: 5, points: 8 },
          { result: 3, points: 7 },
          { result: 1, points: 6 },
          { result: 0, points: 5 },
          { result: -2, points: 4 },
          { result: -4, points: 3 },
          { result: -6, points: 2 },
          { result: -9, points: 1 }
        ],
        '2 класс': [
{ result: 10, points: 10 },
    { result: 8, points: 9 },
    { result: 6, points: 8 },
    { result: 3, points: 7 },
    { result: 1, points: 6 },
    { result: -1, points: 5 },
    { result: -3, points: 4 },
    { result: -5, points: 3 },
    { result: -8, points: 2 },
    { result: -10, points: 1 }
        ],
        '3 класс': [
{ result: 10, points: 10 },
    { result: 8, points: 9 },
    { result: 5, points: 8 },
    { result: 4, points: 7 },
    { result: 2, points: 6 },
    { result: 0, points: 5 },
    { result: -2, points: 4 },
    { result: -4, points: 3 },
    { result: -7, points: 2 },
    { result: -9, points: 1 }
        ],
        '4 класс': [
{ result: 11, points: 10 },
    { result: 9, points: 9 },
    { result: 7, points: 8 },
    { result: 5, points: 7 },
    { result: 3, points: 6 },
    { result: 1, points: 5 },
    { result: -1, points: 4 },
    { result: -3, points: 3 },
    { result: -6, points: 2 },
    { result: -7, points: 1 }
        ],
        '5 класс': [
{ result: 8, points: 10 },
    { result: 6, points: 9 },
    { result: 5, points: 8 },
    { result: 3, points: 7 },
    { result: 1, points: 6 },
    { result: -3, points: 5 },
    { result: -7, points: 4 },
    { result: -11, points: 3 },
    { result: -14, points: 2 },
    { result: -18, points: 1 },
        ],
        '6 класс': [
{ result: 9, points: 10 },
    { result: 7, points: 9 },
    { result: 5, points: 8 },
    { result: 3, points: 7 },
    { result: 2, points: 6 },
    { result: -2, points: 5 },
    { result: -5, points: 4 },
    { result: -9, points: 3 },
    { result: -12, points: 2 },
    { result: -16, points: 1 }
        ],
        '7 класс': [
{ result: 11, points: 10 },
    { result: 9, points: 9 },
    { result: 8, points: 8 },
    { result: 6, points: 7 },
    { result: 5, points: 6 },
    { result: 1, points: 5 },
    { result: -2, points: 4 },
    { result: -5, points: 3 },
    { result: -8, points: 2 },
    { result: -11, points: 1 }
        ],
        '8 класс': [
{ result: 13, points: 10 },
    { result: 11, points: 9 },
    { result: 9, points: 8 },
    { result: 8, points: 7 },
    { result: 6, points: 6 },
    { result: 2, points: 5 },
    { result: -1, points: 4 },
    { result: -5, points: 3 },
    { result: -8, points: 2 },
    { result: -12, points: 1 }
        ],
        '9 класс': [
{ result: 14, points: 10 },
    { result: 12, points: 9 },
    { result: 11, points: 8 },
    { result: 10, points: 7 },
    { result: 9, points: 6 },
    { result: 6, points: 5 },
    { result: 4, points: 4 },
    { result: 1, points: 3 },
    { result: -1, points: 2 },
    { result: -3, points: 1 }
        ],
        '10 класс': [
{ result: 17, points: 10 },
        { result: 16, points: 9 },
        { result: 14, points: 8 },
        { result: 12, points: 7 },
        { result: 10, points: 6 },
        { result: 6, points: 5 },
        { result: 3, points: 4 },
        { result: -1, points: 3 },
        { result: -5, points: 2 },
        { result: -8, points: 1 }
        ],
        '11 класс': [
{ result: 19, points: 10 },
        { result: 16, points: 9 },
        { result: 14, points: 8 },
        { result: 12, points: 7 },
        { result: 10, points: 6 },
        { result: 6, points: 5 },
        { result: 3, points: 4 },
        { result: -1, points: 3 },
        { result: -5, points: 2 },
        { result: -8, points: 1 }
        ],
      },
      'девочки': {
        '1 класс': [
          { result: 6, points: 10 },
          { result: 5, points: 9 },
          { result: 4, points: 8 },
          { result: 3, points: 7 },
          { result: 2, points: 6 },
          { result: 1, points: 5 },
          { result: 0, points: 4 },
          { result: -2, points: 3 },
          { result: -4, points: 2 },
          { result: -5, points: 1 }
        ],
        '2 класс': [
{ result: 12, points: 10 },
    { result: 11, points: 9 },
    { result: 9, points: 8 },
    { result: 7, points: 7 },
    { result: 5, points: 6 },
    { result: 4, points: 5 },
    { result: 2, points: 4 },
    { result: 0, points: 3 },
    { result: -3, points: 2 },
    { result: -5, points: 1 }
        ],
        '3 класс': [
{ result: 12, points: 10 },
    { result: 10, points: 9 },
    { result: 8, points: 8 },
    { result: 6, points: 7 },
    { result: 5, points: 6 },
    { result: 3, points: 5 },
    { result: 2, points: 4 },
    { result: 0, points: 3 },
    { result: -3, points: 2 },
    { result: -4, points: 1 }
        ],
        '4 класс': [
{ result: 12, points: 10 },
    { result: 10, points: 9 },
    { result: 7, points: 8 },
    { result: 5, points: 7 },
    { result: 4, points: 6 },
    { result: 3, points: 5 },
    { result: 1, points: 4 },
    { result: -1, points: 3 },
    { result: -4, points: 2 },
    { result: -5, points: 1 }
        ],
        '5 класс': [
{ result: 12, points: 10 },
    { result: 11, points: 9 },
    { result: 9, points: 8 },
    { result: 8, points: 7 },
    { result: 6, points: 6 },
    { result: 3, points: 5 },
    { result: 0, points: 4 },
    { result: -4, points: 3 },
    { result: -7, points: 2 },
    { result: -10, points: 1 }
        ],
        '6 класс': [
{ result: 15, points: 10 },
    { result: 13, points: 9 },
    { result: 11, points: 8 },
    { result: 10, points: 7 },
    { result: 8, points: 6 },
    { result: 4, points: 5 },
    { result: 1, points: 4 },
    { result: -3, points: 3 },
    { result: -6, points: 2 },
    { result: -10, points: 1 }
        ],
        '7 класс': [
{ result: 15, points: 10 },
    { result: 14, points: 9 },
    { result: 12, points: 8 },
    { result: 11, points: 7 },
    { result: 10, points: 6 },
    { result: 7, points: 5 },
    { result: 4, points: 4 },
    { result: 2, points: 3 },
    { result: -1, points: 2 },
    { result: -4, points: 1 }
        ],
        '8 класс': [
{ result: 16, points: 10 },
    { result: 15, points: 9 },
    { result: 13, points: 8 },
    { result: 12, points: 7 },
    { result: 10, points: 6 },
    { result: 7, points: 5 },
    { result: 4, points: 4 },
    { result: 1, points: 3 },
    { result: -2, points: 2 },
    { result: -5, points: 1 }
        ],
        '9 класс': [
{ result: 19, points: 10 },
    { result: 17, points: 9 },
    { result: 15, points: 8 },
    { result: 14, points: 7 },
    { result: 12, points: 6 },
    { result: 9, points: 5 },
    { result: 6, points: 4 },
    { result: 2, points: 3 },
    { result: -1, points: 2 },
    { result: -4, points: 1 }
        ],
        '10 класс': [
{ result: 21, points: 10 },
        { result: 20, points: 9 },
        { result: 18, points: 8 },
        { result: 16, points: 7 },
        { result: 15, points: 6 },
        { result: 12, points: 5 },
        { result: 8, points: 4 },
        { result: 5, points: 3 },
        { result: 2, points: 2 },
        { result: -2, points: 1 }
        ],
        '11 класс': [
{ result: 22, points: 10 },
        { result: 21, points: 9 },
        { result: 19, points: 8 },
        { result: 17, points: 7 },
        { result: 16, points: 6 },
        { result: 12, points: 5 },
        { result: 9, points: 4 },
        { result: 5, points: 3 },
        { result: 2, points: 2 },
        { result: -2, points: 1 }
        ],
      }
    },
    longRun: {
      'мальчики': {
        '1 класс': [
          { result: 4.25, points: 10 },
          { result: 4.40, points: 9 },
          { result: 4.54, points: 8 },
          { result: 5.08, points: 7 },
          { result: 5.13, points: 6 },
          { result: 5.35, points: 5 },
          { result: 6.00, points: 4 },
          { result: 6.20, points: 3 },
          { result: 6.45, points: 2 },
          { result: 6.56, points: 1 }
        ],
        '2 класс': [
{ result: 4.34, points: 10 },
    { result: 4.48, points: 9 },
    { result: 5.01, points: 8 },
    { result: 5.15, points: 7 },
    { result: 5.28, points: 6 },
    { result: 5.40, points: 5 },
    { result: 5.55, points: 4 },
    { result: 6.09, points: 3 },
    { result: 6.40, points: 2 },
    { result: 6.41, points: 1 }
        ],
        '3 класс': [
{ result: 4.51, points: 10 },
    { result: 5.06, points: 9 },
    { result: 5.22, points: 8 },
    { result: 5.37, points: 7 },
    { result: 5.52, points: 6 },
    { result: 6.07, points: 5 },
    { result: 6.22, points: 4 },
    { result: 6.38, points: 3 },
    { result: 6.53, points: 2 },
    { result: 6.54, points: 1 }
        ],
        '4 класс': [
{ result: 4.37, points: 10 },
    { result: 4.51, points: 9 },
    { result: 5.06, points: 8 },
    { result: 5.22, points: 7 },
    { result: 5.34, points: 6 },
    { result: 5.48, points: 5 },
    { result: 6.02, points: 4 },
    { result: 6.16, points: 3 },
    { result: 6.31, points: 2 },
    { result: 6.45, points: 1 },
        ],
        '5 класс': [
{ result: 4.16, points: 10 },
    { result: 4.28, points: 9 },
    { result: 4.41, points: 8 },
    { result: 4.53, points: 7 },
    { result: 5.06, points: 6 },
    { result: 5.31, points: 5 },
    { result: 5.56, points: 4 },
    { result: 6.21, points: 3 },
    { result: 6.46, points: 2 },
    { result: 7.11, points: 1 }
        ],
        '6 класс': [
{ result: 4.10, points: 10 },
    { result: 4.20, points: 9 },
    { result: 4.32, points: 8 },
    { result: 4.45, points: 7 },
    { result: 4.57, points: 6 },
    { result: 5.22, points: 5 },
    { result: 5.46, points: 4 },
    { result: 6.11, points: 3 },
    { result: 6.36, points: 2 },
    { result: 7.00, points: 1 }
        ],
        '7 класс': [
{ result: 3.57, points: 10 },
    { result: 4.09, points: 9 },
    { result: 4.20, points: 8 },
    { result: 4.32, points: 7 },
    { result: 4.43, points: 6 },
    { result: 5.06, points: 5 },
    { result: 5.28, points: 4 },
    { result: 5.51, points: 3 },
    { result: 6.14, points: 2 },
    { result: 6.37, points: 1 }
        ],
        '8 класс': [
{ result: 3.48, points: 10 },
    { result: 3.59, points: 9 },
    { result: 4.10, points: 8 },
    { result: 4.20, points: 7 },
    { result: 4.31, points: 6 },
    { result: 4.53, points: 5 },
    { result: 5.14, points: 4 },
    { result: 5.35, points: 3 },
    { result: 5.57, points: 2 },
    { result: 6.18, points: 1 }
        ],
        '9 класс': [
{ result: 5.49, points: 10 },
    { result: 5.58, points: 9 },
    { result: 6.10, points: 8 },
    { result: 6.17, points: 7 },
    { result: 6.28, points: 6 },
    { result: 6.46, points: 5 },
    { result: 7.07, points: 4 },
    { result: 7.29, points: 3 },
    { result: 7.48, points: 2 },
    { result: 8.06, points: 1 }
        ],
        '10 класс': [
{ result: 5.40, points: 10 },
        { result: 5.50, points: 9 },
        { result: 6.10, points: 8 },
        { result: 6.25, points: 7 },
        { result: 6.36, points: 6 },
        { result: 6.50, points: 5 },
        { result: 7.13, points: 4 },
        { result: 7.40, points: 3 },
        { result: 8.07, points: 2 },
        { result: 8.34, points: 1 }
        ],
        '11 класс': [
{ result: 5.35, points: 10 },
        { result: 5.45, points: 9 },
        { result: 6.00, points: 8 },
        { result: 6.15, points: 7 },
        { result: 6.25, points: 6 },
        { result: 6.45, points: 5 },
        { result: 7.00, points: 4 },
        { result: 7.25, points: 3 },
        { result: 7.45, points: 2 },
        { result: 8.05, points: 1 }
        ],
      },
      'девочки': {
        '1 класс': [
          { result: 2.40, points: 10 },
          { result: 2.50, points: 9 },
          { result: 3.05, points: 8 },
          { result: 3.10, points: 7 },
          { result: 3.23, points: 6 },
          { result: 3.35, points: 5 },
          { result: 3.54, points: 4 },
          { result: 4.00, points: 3 },
          { result: 4.15, points: 2 },
          { result: 4.20, points: 1 }
        ],
        '2 класс': [
{ result: 4.34, points: 10 },
    { result: 4.48, points: 9 },
    { result: 5.01, points: 8 },
    { result: 5.15, points: 7 },
    { result: 5.28, points: 6 },
    { result: 5.40, points: 5 },
    { result: 5.55, points: 4 },
    { result: 6.09, points: 3 },
    { result: 6.40, points: 2 },
    { result: 6.41, points: 1 }
        ],
        '3 класс': [
{ result: 4.17, points: 10 },
    { result: 4.30, points: 9 },
    { result: 4.34, points: 8 },
    { result: 4.55, points: 7 },
    { result: 5.08, points: 6 },
    { result: 5.20, points: 5 },
    { result: 5.33, points: 4 },
    { result: 5.46, points: 3 },
    { result: 6.10, points: 2 },
    { result: 6.11, points: 1 }
        ],
        '4 класс': [
{ result: 4.10, points: 10 },
    { result: 4.12, points: 9 },
    { result: 4.24, points: 8 },
    { result: 4.36, points: 7 },
    { result: 4.47, points: 6 },
    { result: 4.59, points: 5 },
    { result: 5.11, points: 4 },
    { result: 5.22, points: 3 },
    { result: 5.40, points: 2 },
    { result: 5.41, points: 1 }
        ],
        '5 класс': [
{ result: 5.20, points: 10 },
    { result: 5.30, points: 9 },
    { result: 5.35, points: 8 },
    { result: 5.45, points: 7 },
    { result: 5.55, points: 6 },
    { result: 6.12, points: 5 },
    { result: 6.39, points: 4 },
    { result: 7.05, points: 3 },
    { result: 7.31, points: 2 },
    { result: 7.58, points: 1 }
        ],
        '6 класс': [
{ result: 5.05, points: 10 },
    { result: 5.14, points: 9 },
    { result: 5.27, points: 8 },
    { result: 5.40, points: 7 },
    { result: 6.00, points: 6 },
    { result: 6.25, points: 5 },
    { result: 6.40, points: 4 },
    { result: 7.00, points: 3 },
    { result: 7.28, points: 2 },
    { result: 7.55, points: 1 }
        ],
        '7 класс': [
{ result: 5.00, points: 10 },
    { result: 5.10, points: 9 },
    { result: 5.20, points: 8 },
    { result: 5.30, points: 7 },
    { result: 5.45, points: 6 },
    { result: 6.10, points: 5 },
    { result: 6.25, points: 4 },
    { result: 6.40, points: 3 },
    { result: 7.00, points: 2 },
    { result: 7.30, points: 1 }
        ],
        '8 класс': [
{ result: 4.41, points: 10 },
    { result: 4.52, points: 9 },
    { result: 5.04, points: 8 },
    { result: 5.15, points: 7 },
    { result: 5.27, points: 6 },
    { result: 5.30, points: 5 },
    { result: 6.13, points: 4 },
    { result: 6.36, points: 3 },
    { result: 6.59, points: 2 },
    { result: 7.21, points: 1 }
        ],
        '9 класс': [
{ result: 4.51, points: 10 },
    { result: 5.00, points: 9 },
    { result: 5.12, points: 8 },
    { result: 5.21, points: 7 },
    { result: 5.35, points: 6 },
    { result: 5.43, points: 5 },
    { result: 6.02, points: 4 },
    { result: 6.23, points: 3 },
    { result: 6.40, points: 2 },
    { result: 7.04, points: 1 }
        ],
        '10 класс': [
{ result: 4.48, points: 10 },
        { result: 4.58, points: 9 },
        { result: 5.13, points: 8 },
        { result: 5.25, points: 7 },
        { result: 5.37, points: 6 },
        { result: 5.52, points: 5 },
        { result: 6.16, points: 4 },
        { result: 6.41, points: 3 },
        { result: 7.07, points: 2 },
        { result: 7.30, points: 1 }
        ],
        '11 класс': [
{ result: 4.36, points: 10 },
        { result: 4.45, points: 9 },
        { result: 4.55, points: 8 },
        { result: 5.06, points: 7 },
        { result: 5.15, points: 6 },
        { result: 5.34, points: 5 },
        { result: 5.54, points: 4 },
        { result: 6.13, points: 3 },
        { result: 6.33, points: 2 },
        { result: 6.52, points: 1 }
        ],
      }
    },
  }
};
},
computed: {
  averageScore() {
    // Средний балл по заполненным нормативам
    const filledFields = this.scoreFields.filter(field => {
      const val = this.scores[field.key];
      return val !== null && val !== '' && !isNaN(parseFloat(val));
    });
    const totalPoints = filledFields.reduce((total, field) => total + field.points, 0);
    const count = filledFields.length;
    return count > 0 ? (totalPoints / count).toFixed(1) : 0;
  },
  level() {
    const avgScore = parseFloat(this.averageScore);
    if (avgScore >= 8.5) {
      return 'Высокий';
    } else if (avgScore >= 6.5) {
      return 'Выше среднего';
    } else if (avgScore >= 4.5) {
      return 'Средний';
    } else if (avgScore >= 2.5) {
      return 'Ниже среднего';
    } else {
      return 'Низкий';
    }
  }
},
watch: {
  selectedGender() {
    this.recalculateAllScores();
  },
  selectedClass() {
    this.recalculateAllScores();
  }
},
methods: {
  recalculateAllScores() {
    this.scoreFields.forEach(field => {
      const val = this.scores[field.key];
      if (val !== null && val !== '' && !isNaN(parseFloat(val))) {
        this.updateScore(field.key);
      } else {
        this.setPoints(field.key, 0);
      }
    });
  },
  updateScore(key) {
    const value = this.scores[key];
    if (value === null || value === '' || isNaN(parseFloat(value))) {
      const field = this.scoreFields.find(field => field.key === key);
      if (field) field.points = 0;
      return;
    }
    switch (key) {
      case 'running30m':
        this.calculateScoreRunning30m();
        break;
      case 'shuttleRun':
        this.calculateScoreShuttleRun();
        break;
      case 'longJump':
        this.calculateScoreLongJump();
        break;
      case 'gymnastics':
        this.calculateScoreGymnastics();
        break;
      case 'forwardBend':
        this.calculateScoreForwardBend();
        break;
      case 'longRun':
        this.calculateScoreLongRun();
        break;
    }
  },
  calculateScoreRunning30m() {
    const scoreValue = parseFloat(this.scores.running30m);
    if (isNaN(scoreValue)) return;
    const genderData = this.scoringData.running30m[this.selectedGender];
    if (!genderData) return;
    const classData = genderData[this.selectedClass];
    if (!classData) return;

    // Для бега 30м — чем меньше результат, тем выше баллы
    const entry = classData.find(e => e.result >= scoreValue) || classData[classData.length - 1];
    this.setPoints('running30m', entry.points);
  },
  calculateScoreShuttleRun() {
    const scoreValue = parseFloat(this.scores.shuttleRun);
    if (isNaN(scoreValue)) return;
    const genderData = this.scoringData.shuttleRun[this.selectedGender];
    if (!genderData) return;
    const classData = genderData[this.selectedClass];
    if (!classData) return;

    const entry = classData.find(e => e.result >= scoreValue) || classData[classData.length - 1];
    this.setPoints('shuttleRun', entry.points);
  },
  calculateScoreLongJump() {
    const scoreValue = parseFloat(this.scores.longJump);
    if (isNaN(scoreValue)) return;
    const genderData = this.scoringData.longJump[this.selectedGender];
    if (!genderData) return;
    const classData = genderData[this.selectedClass];
    if (!classData) return;

    // Чем больше результат, тем выше баллы
    const entry = classData.find(e => e.result <= scoreValue) || classData[classData.length - 1];
    this.setPoints('longJump', entry.points);
  },
  calculateScoreGymnastics() {
    const scoreValue = parseFloat(this.scores.gymnastics);
    if (isNaN(scoreValue)) return;
    const genderData = this.scoringData.gymnastics[this.selectedGender];
    if (!genderData) return;
    const classData = genderData[this.selectedClass];
    if (!classData) return;

    const entry = classData.find(e => e.result <= scoreValue) || classData[classData.length - 1];
    this.setPoints('gymnastics', entry.points);
  },
  calculateScoreForwardBend() {
    const scoreValue = parseFloat(this.scores.forwardBend);
    if (isNaN(scoreValue)) return;
    const genderData = this.scoringData.forwardBend[this.selectedGender];
    if (!genderData) return;
    const classData = genderData[this.selectedClass];
    if (!classData) return;

    const entry = classData.find(e => e.result <= scoreValue) || classData[classData.length - 1];
    this.setPoints('forwardBend', entry.points);
  },
  calculateScoreLongRun() {
    const scoreValue = parseFloat(this.scores.longRun);
    if (isNaN(scoreValue)) return;
    const genderData = this.scoringData.longRun[this.selectedGender];
    if (!genderData) return;
    const classData = genderData[this.selectedClass];
    if (!classData) return;

    // Чем больше результат, тем выше баллы
    const entry = classData.find(e => e.result >= scoreValue) || classData[classData.length - 1];
    this.setPoints('longRun', entry.points);
  },
  setPoints(key, points) {
    const field = this.scoreFields.find(field => field.key === key);
    if (field) field.points = points;
  },
  submitForm() {
    console.log('Пол:', this.selectedGender);
    console.log('Класс:', this.selectedClass);
    console.log('Результаты:', this.scores);
    this.resetForm();
  },
  resetForm() {
    this.scores = {
      running30m: null,
      shuttleRun: null,
      longJump: null,
      gymnastics: null,
      forwardBend: null,
      longRun: null
    };
    this.scoreFields.forEach(field => (field.points = 0));
    this.selectedGender = 'мальчики';
    this.selectedClass = '1 класс';
  }
}
};
</script>