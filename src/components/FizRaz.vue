<template>
  <div class="competition">
    <h1>Оценка физического развития учащихся</h1>
    
    <label for="index-select">Выберите индекс для расчета:</label>
    <select id="index-select" v-model="selectedIndex" class="select">
      <option value="">-- Выберите индекс --</option>
      <option value="imt">Индекс массы тела (ИМТ)</option>
      <option value="zhi">Жизненный индекс (ЖИ)</option>
      <option value="sik">Силовой индекс кисти (СИК)</option>
    </select>

    <div class="index-form" v-if="selectedIndex">
      <!-- Общие поля -->
      <div class="form-group">
        <label>Пол:</label>
        <select v-model="gender" class="select">
          <option value="male">Мальчик (юноша)</option>
          <option value="female">Девочка (девушка)</option>
        </select>
      </div>
      <div class="form-group">
        <label>Возраст (лет):</label>
        <input type="number" v-model.number="age" min="6" max="18" placeholder="Введите возраст от 6 до 18 лет" class="input">
      </div>
      <div class="form-group">
        <label>Масса тела (кг):</label>
        <input type="number" step="0.1" v-model.number="mass" placeholder="Например, 50.5" class="input">
      </div>

      <!-- Поля для ИМТ -->
      <div v-if="selectedIndex === 'imt'">
        <h2>Индекс массы тела (ИМТ)</h2>
        <div class="form-group">
          <label>Рост (м):</label>
          <input type="number" step="0.01" v-model.number="height" placeholder="Например, 1.60" class="input">
        </div>
        <div class="result">
          <h3>Результат:</h3>
          <p v-if="imtResult.error" class="error">{{ imtResult.error }}</p>
          <p v-else>ИМТ: {{ imtResult.imt.toFixed(2) }} кг/м² – {{ imtResult.evaluation }}</p>
        </div>
      </div>

      <!-- Поля для ЖИ -->
      <div v-if="selectedIndex === 'zhi'">
        <h2>Жизненный индекс (ЖИ)</h2>
        <div class="form-group">
          <label>Жизненная емкость легких (ЖЕЛ, мл):</label>
          <input type="number" v-model.number="zhel" placeholder="Например, 3000" class="input">
        </div>
        <div class="result">
          <h3>Результат:</h3>
          <p v-if="zhiResult.error" class="error">{{ zhiResult.error }}</p>
          <p v-else>ЖИ: {{ zhiResult.zhi.toFixed(1) }} мл/кг – {{ zhiResult.evaluation }}</p>
        </div>
      </div>

      <!-- Поля для СИК -->
      <div v-if="selectedIndex === 'sik'">
        <h2>Силовой индекс кисти (СИК)</h2>
        <div class="form-group">
          <label>Сила правой кисти (кг):</label>
          <input type="number" step="0.1" v-model.number="rightGrip" placeholder="Например, 30" class="input">
        </div>
        <div class="form-group">
          <label>Сила левой кисти (кг):</label>
          <input type="number" step="0.1" v-model.number="leftGrip" placeholder="Например, 28" class="input">
        </div>
        <div class="result">
          <h3>Результат:</h3>
          <p v-if="sikResult.error" class="error">{{ sikResult.error }}</p>
          <div v-else>
            <p>СИК правая: {{ sikResult.rightSik.toFixed(1) }}% – {{ sikResult.rightEvaluation }}</p>
            <p>СИК левая: {{ sikResult.leftSik.toFixed(1) }}% – {{ sikResult.leftEvaluation }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'PhysicalDevelopmentApp',
  setup() {
    const selectedIndex = ref('');
    const gender = ref('male');
    const age = ref(10);
    const mass = ref(null);
    const height = ref(null);
    const zhel = ref(null);
    const rightGrip = ref(null);
    const leftGrip = ref(null);

    const imtResult = computed(() => {
      if (!mass.value || !height.value) {
        return { error: 'Заполните массу и рост.' };
      }
      if (height.value <= 0) return { error: 'Рост должен быть положительным.' };
      const imt = mass.value / (height.value ** 2);
      let evaluation = '';
      if (imt < 18.5) evaluation = 'дефицит массы тела, низкий риск.';
      else if (imt >= 18.5 && imt < 25) evaluation = 'нормальная масса тела, обычный риск.';
      else if (imt >= 25 && imt < 30) evaluation = 'избыточная масса тела, повышенный риск.';
      else if (imt >= 30 && imt < 35) evaluation = 'ожирение I степени, высокий риск.';
      else if (imt >= 35 && imt < 40) evaluation = 'ожирение II степени, очень высокий риск.';
      else evaluation = 'ожирение III степени, чрезвычайно высокий риск.';
      return { imt, evaluation };
    });

    const zhiResult = computed(() => {
      if (!mass.value || !zhel.value) {
        return { error: 'Заполните массу и ЖЕЛ.' };
      }
      const zhi = zhel.value / mass.value;
      let evaluation = '';
      if (gender.value === 'male') {
        evaluation = (zhi >= 65 && zhi <= 70) ? 'норма.' : 'не соответствует норме.';
      } else {
        evaluation = (zhi >= 55 && zhi <= 60) ? 'норма.' : 'не соответствует норме.';
      }
      return { zhi, evaluation };
    });

    const sikResult = computed(() => {
      if (!mass.value || !rightGrip.value || !leftGrip.value) {
        return { error: 'Заполните массу и силу обеих кистей.' };
      }
      const rightSik = (rightGrip.value / mass.value) * 100;
      const leftSik = (leftGrip.value / mass.value) * 100;
      let rightEvaluation = '';
      let leftEvaluation = '';
      const min = gender.value === 'male' ? 70 : 50;
      const max = gender.value === 'male' ? 75 : 60;
      rightEvaluation = (rightSik >= min && rightSik <= max) ? 'норма.' : 'не соответствует норме.';
      leftEvaluation = (leftSik >= min && leftSik <= max) ? 'норма.' : 'не соответствует норме.';
      return { rightSik, leftSik, rightEvaluation, leftEvaluation };
    });

    return {
      selectedIndex,
      gender,
      age,
      mass,
      height,
      zhel,
      rightGrip,
      leftGrip,
      imtResult,
      zhiResult,
      sikResult
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

.index-form {
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

  .form-group {
    margin-bottom: 20px;
  }

  .result {
    padding: 8px;
  }
}
</style>
