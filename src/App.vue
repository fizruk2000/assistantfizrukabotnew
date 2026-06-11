<template>
<div id="app">
  <header>
    <h1 class="title">Физрук | Бот - помощник</h1>
  </header>
  <main>
    <!-- Кнопки видны только если currentPage пустой -->
    <div class="button-container" v-if="currentPage === ''">
      <button class="button" @click="showPage('Gfok')">ГФОК Республики Беларусь</button>
      <button class="button" @click="showPage('Health')">Многоборье "Здоровье"</button>
      <button class="button" @click="showPage('Defender')">Многоборье "Защитник Отечества"</button>
      <button class="button" @click="showPage('Ufp')">Шкала оценки уровня физической подготовленности учащихся</button>
      <button class="button" @click="showPage('Ofp')">Шкала оценки уровня сформированности двигательных навыков учащихся</button>
      <button class="button" @click="showPage('Degrees')">Школиада</button>
      <button class="button" @click="showPage('Talant')">300 талантов для "Королевы"</button>
      <button class="button" @click="showPage('Proba')">Функциональные пробы для оценки состояния организма учащихся</button>
      <button class="button" @click="showPage('FizRaz')">Оценка физического развития учащихся</button>
      <button class="button" @click="showPage('Soft')">Полезные сервисы</button>
    </div>

    <div class="page-content">
      <component :is="currentComponent" v-if="currentPage" />
    </div>

    <!-- Кнопка для возврата на главную страницу -->
    <button v-if="currentPage" class="back-button" @click="goBack">Назад</button>
  </main>
</div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

// Ленивая загрузка компонентов
const Gfok = defineAsyncComponent(() => import('./components/Gfok.vue'));
const Health = defineAsyncComponent(() => import('./components/Health.vue'));
const Defender = defineAsyncComponent(() => import('./components/Defender.vue'));
const Ufp = defineAsyncComponent(() => import('./components/Ufp.vue'));
const Ofp = defineAsyncComponent(() => import('./components/Ofp.vue'));
const Degrees = defineAsyncComponent(() => import('./components/Degrees.vue'));
const Soft = defineAsyncComponent(() => import('./components/Soft.vue'));
const Talant = defineAsyncComponent(() => import('./components/Talant.vue'));
const Proba = defineAsyncComponent(() => import('./components/Proba.vue'));
const FizRaz = defineAsyncComponent(() => import('./components/FizRaz.vue'));

export default {
  name: 'App',
  components: {
    Gfok,
    Health,
    Defender,
    Ufp,
    Ofp,
    Degrees,
    Soft,
    Talant,
    Proba,
    FizRaz,
  },
  data() {
    return {
      currentPage: '',
      externalLinks: {
        Documents: 'https://drive.google.com/drive/folders/1Hiw1CrX4jnHOaT5kBUy7aQwCAMR_8eDs?usp=drive_link', 
        Planning: 'https://drive.google.com/drive/folders/1vOuVlJRnsO85ezSBrruYmTgSQ_NpGbjs?usp=drive_link' 
      }
    };
  },
  computed: {
    currentComponent() {
      return this.currentPage || null;
    }
  },
  methods: {
    showPage(page) {
      this.currentPage = page;
    },
    goBack() {
      this.currentPage = '';
    },
    openExternalLink(page) {
      const url = this.externalLinks[page];
      if (url) {
        window.open(url, '_blank');
      }
    }
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #2c3e50;
  background-color: #f8f9fa;
  min-height: 100vh;
}

header {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  padding: 20px;
  text-align: center;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  color: white;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 120px);
  padding: 20px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  gap: 12px;
}

.button {
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #008CBA 0%, #0077a3 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 140, 186, 0.3);
}

.button:hover {
  background: linear-gradient(135deg, #0077a3 0%, #005f7f 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 140, 186, 0.4);
}

.button:active {
  transform: translateY(0);
}

.back-button {
  margin-top: 30px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
}

.back-button:hover {
  background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.4);
}

.page-content {
  margin-top: 20px;
  text-align: center;
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .title {
    font-size: 1.5rem;
  }
  
  .button-container {
    max-width: 100%;
  }
  
  .button {
    font-size: 14px;
    padding: 14px 20px;
  }
  
  .page-content {
    padding: 16px;
    margin-top: 16px;
  }
}
</style>