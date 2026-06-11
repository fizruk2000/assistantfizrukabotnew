<template>
<div class="competition">
  <h1>Функциональные пробы для оценки состояния организма учащихся</h1>
  <label for="probe-select">Выберите пробу:</label>
  <select id="probe-select" v-model="selectedProbe" class="select">
    <option value="">-- Выберите пробу --</option>
    <option value="martine">Проба Мартинэ-Кушелевского (сердечно-сосудистая система)</option>
    <option value="shtange">Проба Штанге (дыхательная система)</option>
    <option value="genchi">Проба Генчи (дыхательная система)</option>
    <option value="klinostat">Клиностатическая проба (парасимпатический отдел НС)</option>
    <option value="ortostat">Ортостатическая проба (симпатический отдел НС)</option>
  </select>

  <div class="probe-form" v-if="selectedProbe">
    <!-- Общее поле для возраста -->
    <div class="form-group">
      <label>Возраст (лет):</label>
      <input type="number" v-model.number="age" min="1" max="100" placeholder="Введите возраст от 6 до 18 лет" class="input">
    </div>

    <!-- Форма для пробы Мартинэ-Кушелевского -->
    <div v-if="selectedProbe === 'martine'">
      <h2>Проба Мартинэ-Кушелевского</h2>
      <button @click="toggleInstructions('martine')" class="toggle-btn">
        {{ showInstructions.martine ? 'Скрыть инструкции' : 'Показать инструкции' }}
      </button>
      <div class="instructions" v-show="showInstructions.martine">
        <h3>Инструкция выполнения:</h3>
        <p>1. Измерьте исходные показатели пульса и артериального давления в состоянии покоя (сидя).</p>
        <p>2. Выполните нагрузку: 20 приседаний за 30 секунд (темп 40 приседаний в минуту).</p>
        <p>3. Сразу после нагрузки измерьте пульс и АД (в течение 10-15 секунд).</p>
        <p>4. Замерьте время восстановления до исходных показателей.</p>
        <p><strong>Подсказки:</strong> Пульс измеряйте за 10 секунд и умножьте на 6. АД измеряйте тонометром. Время восстановления – в минутах с точностью до 0.1.</p>
      </div>
      <div class="form-section">
        <p>Введите исходные данные (до нагрузки):</p>
        <div class="form-group">
          <label>Частота пульса (уд/мин):</label>
          <input type="number" v-model.number="martine.baselinePulse" placeholder="Например, 80" class="input">
        </div>
        <div class="form-group">
          <label>Систолическое АД (мм рт. ст.):</label>
          <input type="number" v-model.number="martine.baselineSys" placeholder="Например, 120" class="input">
        </div>
        <div class="form-group">
          <label>Диастолическое АД (мм рт. ст.):</label>
          <input type="number" v-model.number="martine.baselineDia" placeholder="Например, 80" class="input">
        </div>
      </div>
      <div class="form-section">
        <p>Сразу после нагрузки (20 приседаний):</p>
        <div class="form-group">
          <label>Частота пульса (уд/мин):</label>
          <input type="number" v-model.number="martine.afterPulse" placeholder="Например, 120" class="input">
        </div>
        <div class="form-group">
          <label>Систолическое АД (мм рт. ст.):</label>
          <input type="number" v-model.number="martine.afterSys" placeholder="Например, 140" class="input">
        </div>
        <div class="form-group">
          <label>Диастолическое АД (мм рт. ст.):</label>
          <input type="number" v-model.number="martine.afterDia" placeholder="Например, 70" class="input">
        </div>
      </div>
      <div class="form-group">
        <label>Время восстановления (мин) до исходных показателей:</label>
        <input type="number" step="0.1" v-model.number="martine.recoveryTime" placeholder="Например, 1.5" class="input">
      </div>
      <div class="result">
        <h3>Результат:</h3>
        <p v-if="martineResult.error" class="error">{{ martineResult.error }}</p>
        <p v-else>Реакция: {{ martineResult.reaction }}</p>
      </div>
    </div>

    <!-- Аналогично для других проб -->
    <div v-if="selectedProbe === 'shtange'">
      <h2>Проба Штанге</h2>
      <button @click="toggleInstructions('shtange')" class="toggle-btn">
        {{ showInstructions.shtange ? 'Скрыть инструкции' : 'Показать инструкции' }}
      </button>
      <div class="instructions" v-show="showInstructions.shtange">
        <h3>Инструкция выполнения:</h3>
        <p>1. Сядьте удобно, сделайте глубокий вдох и задержите дыхание на максимальное время.</p>
        <p>2. Не дышите через нос (можно зажать ноздри).</p>
        <p>3. Время измеряйте секундомером до первого вдоха.</p>
        <p><strong>Подсказки:</strong> Выполняйте в спокойной обстановке. Нормы зависят от возраста (6-10 лет: 22-45 сек; 11-15: 40-55; 16-18: 40-60).</p>
      </div>
      <div class="form-group">
        <label>Время задержки дыхания после вдоха (сек):</label>
        <input type="number" v-model.number="shtange.time" placeholder="Например, 45" class="input">
      </div>
      <div class="result">
        <h3>Результат:</h3>
        <p v-if="shtangeResult.error" class="error">{{ shtangeResult.error }}</p>
        <p v-else>Оценка: {{ shtangeResult.evaluation }}</p>
      </div>
    </div>

    <div v-if="selectedProbe === 'genchi'">
      <h2>Проба Генчи</h2>
      <button @click="toggleInstructions('genchi')" class="toggle-btn">
        {{ showInstructions.genchi ? 'Скрыть инструкции' : 'Показать инструкции' }}
      </button>
      <div class="instructions" v-show="showInstructions.genchi">
        <h3>Инструкция выполнения:</h3>
        <p>1. Сделайте глубокий выдох и задержите дыхание на максимальное время.</p>
        <p>2. Не дышите через рот (можно зажать рот).</p>
        <p>3. Время измеряйте секундомером до первого вдоха.</p>
        <p><strong>Подсказки:</strong> Выполняйте после полного выдоха. Нормы: до 15 лет: 12-13 сек; 16-18: 20-30 сек.</p>
      </div>
      <div class="form-group">
        <label>Время задержки дыхания после выдоха (сек):</label>
        <input type="number" v-model.number="genchi.time" placeholder="Например, 25" class="input">
      </div>
      <div class="result">
        <h3>Результат:</h3>
        <p v-if="genchiResult.error" class="error">{{ genchiResult.error }}</p>
        <p v-else>Оценка: {{ genchiResult.evaluation }}</p>
      </div>
    </div>

    <div v-if="selectedProbe === 'klinostat'">
      <h2>Клиностатическая проба</h2>
      <button @click="toggleInstructions('klinostat')" class="toggle-btn">
        {{ showInstructions.klinostat ? 'Скрыть инструкции' : 'Показать инструкции' }}
      </button>
      <div class="instructions" v-show="showInstructions.klinostat">
        <h3>Инструкция выполнения:</h3>
        <p>1. Измерьте пульс стоя (после 1-2 минут стояния).</p>
        <p>2. Лягте и измерьте пульс через 5-10 минут лежания.</p>
        <p>3. Рассчитайте разницу: пульс стоя - пульс лежа.</p>
        <p><strong>Подсказки:</strong> Пульс измеряйте за 10 секунд. Норма: разница 4-12 уд/мин (повышенная активность парасимпатики).</p>
      </div>
      <div class="form-group">
        <label>Частота пульса стоя (уд/мин):</label>
        <input type="number" v-model.number="klinostat.standingPulse" placeholder="Например, 85" class="input">
      </div>
      <div class="form-group">
        <label>Частота пульса лежа (уд/мин):</label>
        <input type="number" v-model.number="klinostat.lyingPulse" placeholder="Например, 75" class="input">
      </div>
      <div class="result">
        <h3>Результат:</h3>
        <p v-if="klinostatResult.error" class="error">{{ klinostatResult.error }}</p>
        <p v-else>Активность парасимпатического отдела: {{ klinostatResult.activity }}</p>
      </div>
    </div>

    <div v-if="selectedProbe === 'ortostat'">
      <h2>Ортостатическая проба</h2>
      <button @click="toggleInstructions('ortostat')" class="toggle-btn">
        {{ showInstructions.ortostat ? 'Скрыть инструкции' : 'Показать инструкции' }}
      </button>
      <div class="instructions" v-show="showInstructions.ortostat">
        <h3>Инструкция выполнения:</h3>
        <p>1. Измерьте пульс лежа (после 5-10 минут лежания).</p>
        <p>2. Встаньте и измерьте пульс через 1-2 минуты стояния.</p>
        <p>3. Рассчитайте разницу: пульс стоя - пульс лежа.</p>
        <p><strong>Подсказки:</strong> Пульс измеряйте за 10 секунд. Норма: разница 6-18 уд/мин (повышенная активность симпатики).</p>
      </div>
      <div class="form-group">
        <label>Частота пульса лежа (уд/мин):</label>
        <input type="number" v-model.number="ortostat.lyingPulse" placeholder="Например, 70" class="input">
      </div>
      <div class="form-group">
        <label>Частота пульса стоя (уд/мин):</label>
        <input type="number" v-model.number="ortostat.standingPulse" placeholder="Например, 85" class="input">
      </div>
      <div class="result">
        <h3>Результат:</h3>
        <p v-if="ortostatResult.error" class="error">{{ ortostatResult.error }}</p>
        <p v-else>Активность симпатического отдела: {{ ortostatResult.activity }}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref, computed, reactive } from 'vue';

export default {
name: 'FunctionalProbesApp',
setup() {
  const selectedProbe = ref('');
  const age = ref(10);

  const showInstructions = reactive({
    martine: false,
    shtange: false,
    genchi: false,
    klinostat: false,
    ortostat: false
  });

  const toggleInstructions = (probe) => {
    showInstructions[probe] = !showInstructions[probe];
  };

  // Остальные данные и computed без изменений
  const martine = ref({
    baselinePulse: null,
    baselineSys: null,
    baselineDia: null,
    afterPulse: null,
    afterSys: null,
    afterDia: null,
    recoveryTime: null
  });

  const shtange = ref({ time: null });
  const genchi = ref({ time: null });
  const klinostat = ref({ standingPulse: null, lyingPulse: null });
  const ortostat = ref({ lyingPulse: null, standingPulse: null });

  const martineResult = computed(() => {
    if (!martine.value.baselinePulse || !martine.value.baselineSys || !martine.value.baselineDia ||
        !martine.value.afterPulse || !martine.value.afterSys || !martine.value.afterDia ||
        martine.value.recoveryTime === null) {
      return { error: 'Заполните все поля.' };
    }
    const pulseIncrease = ((martine.value.afterPulse - martine.value.baselinePulse) / martine.value.baselinePulse) * 100;
    const sysIncrease = martine.value.afterSys - martine.value.baselineSys;
    const diaDecrease = martine.value.baselineDia - martine.value.afterDia;
    if (pulseIncrease <= 50 && sysIncrease <= 20 && diaDecrease <= 10 && martine.value.recoveryTime <= 2) {
      return { reaction: 'Благоприятная реакция.' };
    } else {
      return { reaction: 'Неблагоприятная реакция.' };
    }
  });

  const shtangeResult = computed(() => {
    if (shtange.value.time === null) return { error: 'Введите время задержки.' };
    if (age.value >= 6 && age.value <= 10 && shtange.value.time >= 22 && shtange.value.time <= 45) return { evaluation: 'Норма.' };
    if (age.value >= 11 && age.value <= 15 && shtange.value.time >= 40 && shtange.value.time <= 55) return { evaluation: 'Норма.' };
    if (age.value >= 16 && age.value <= 18 && shtange.value.time >= 40 && shtange.value.time <= 60) return { evaluation: 'Норма.' };
    return { evaluation: 'Не соответствует норме.' };
  });

  const genchiResult = computed(() => {
    if (genchi.value.time === null) return { error: 'Введите время задержки.' };
    if (age.value <= 15 && genchi.value.time >= 12 && genchi.value.time <= 13) return { evaluation: 'Норма.' };
    if (age.value >= 16 && age.value <= 18 && genchi.value.time >= 20 && genchi.value.time <= 30) return { evaluation: 'Норма.' };
    return { evaluation: 'Не соответствует норме.' };
  });

  const klinostatResult = computed(() => {
    if (klinostat.value.standingPulse === null || klinostat.value.lyingPulse === null) return { error: 'Заполните все поля.' };
    const difference = klinostat.value.standingPulse - klinostat.value.lyingPulse;
    if (difference >= 4 && difference <= 12) return { activity: 'Нормальная активность.' };
    if (difference > 12) return { activity: 'Повышенная активность.' };
    return { activity: 'Не нормальная активность.' };
  });

  const ortostatResult = computed(() => {
    if (ortostat.value.lyingPulse === null || ortostat.value.standingPulse === null) return { error: 'Заполните все поля.' };
    const difference = ortostat.value.standingPulse - ortostat.value.lyingPulse;
    if (difference < 6) return { activity: 'Пониженная активность.' };
    if (difference >= 6 && difference <= 18) return { activity: 'Нормальная активность.' };
    if (difference > 18) return { activity: 'Повышенная активность.' };
    return { activity: 'Неизвестно.' };
  });

  return {
    selectedProbe,
    age,
    showInstructions,
    toggleInstructions,
    martine,
    shtange,
    genchi,
    klinostat,
    ortostat,
    martineResult,
    shtangeResult,
    genchiResult,
    klinostatResult,
    ortostatResult
  };
}
};
</script>

<style scoped>
.app {
font-family: Arial, sans-serif;
margin: 20px;
max-width: 100%;
box-sizing: border-box;
}

.probe-form {
margin-top: 20px;
}

.form-group {
margin-bottom: 15px;
}

.input, .select {
width: 100%;
padding: 8px;
box-sizing: border-box;
}

.toggle-btn {
background-color: #007bff;
color: white;
border: none;
padding: 10px;
cursor: pointer;
margin-bottom: 10px;
}

.toggle-btn:hover {
background-color: #0056b3;
}

.instructions {
background-color: #e7f3ff;
padding: 10px;
margin-bottom: 20px;
border-left: 5px solid #007bff;
}

.result {
margin-top: 20px;
padding: 10px;
border: 1px solid #ccc;
background-color: #f9f9f9;
}

.error {
color: red;
}

label {
display: block;
margin-bottom: 5px;
}

.form-section {
margin-bottom: 20px;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
.app {
  margin: 10px;
  font-size: 14px;
}

h1 {
  font-size: 18px;
}

h2 {
  font-size: 16px;
}

.input, .select {
  padding: 10px;
}

.toggle-btn {
  width: 100%;
  padding: 12px;
}

.form-group {
  margin-bottom: 20px;
}

.instructions {
  padding: 8px;
}

.result {
  padding: 8px;
}
}
</style>