<template>
<div>
  <h1>Приложения и сервисы</h1>
  <table>
    <thead>
      <tr>
        <th>Название и описание</th>
        <th>Ссылка</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>
          <strong>{{ item.title }}</strong>
          <p>{{ item.description }}</p>
        </td>
        <td><a :href="item.link" target="_blank">Перейти</a></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
data() {
  return {
    items: [
      {
        id: 1,
        image: 'https://336118.selcdn.ru/Gutsy-Culebra/products/myQuiz-Logo.png',
        title: 'myQuiz - платформа для создания онлайн квизов и викторин',
        description: 'Создавайте и проводите викторины и квизы на онлайн и офлайн мероприятиях',
        link: 'https://myquiz.ru/',
      },
      {
        id: 2,
        image: 'https://adu.by/images/2024/08/20/knopka-olimpiada.png',
        title: 'Республиканская олимпиада по учебным предметам',
        description: 'Физическая культура',
        link: 'https://adu.by/ru/uchenikam/respublikanskaya-olimpiada-po-uchebnym-predmetam/fizicheskaya-kultura-i-zdorove.html',
      },
      {
        id: 3,
        image: 'https://kvestodel.ru/images/kvestodel.png',
        title: 'Конструктор квестов',
        description: 'Здесь можно легко сделать домашний квест для детей и взрослых',
        link: 'https://kvestodel.ru/',
      },
      {
        id: 4,
        image: 'https://secondscount.com/images/logo.png',
        title: 'Secondscount',
        description: 'Самое универсальное и всеобъемлющее мобильное приложение для хронометража и тренировок в мире. Очень функциональное, многофункциональное и простое в использовании. Записывайте, отслеживайте, сохраняйте, сравнивайте и анализируйте все ваши критические данные о времени и производительности.',
        link: 'https://secondscount.com/',
      },
      {
        id: 5,
        image: 'https://play-lh.googleusercontent.com/Dmo7qQ1nNkgshGKuLai4xVpp-ss1NKCW-LxPk7Y09ELxRdwJ_NT9ktg37VjKQnA12-Q=w2560-h1440-rw',
        title: '50 подтягиваний. Будь сильнее',
        description: 'Курс подтягиваний - это программа, благодаря которой вы сможете динамично развивать свою силу и мускулатуру. Это ваш личный тренер по подтягиваниям.',
        link: 'https://play.google.com/store/apps/details?id=com.shvagerfm.Pullupspro&pcampaignid=web_share',
      },
      {
        id: 6,
        image: 'https://play-lh.googleusercontent.com/Blz0wBtVpLw-zxrP_KFuxAEHhdE71Noaqu8hHBmV3yzHYq7HR-8UUIIJ49Zodtydfw=w2560-h1440-rw',
        title: '100 отжиманий курс тренировок',
        description: 'Курс тренировок 100 отжиманий Будь Сильнее - персональный фитнес тренер по отжиманиям. Чтобы накачать сильные руки и грудь достаточно уметь отжиматься 50-60 раз.',
        link: 'https://play.google.com/store/apps/details?id=com.shvagerfm.Pushups&pcampaignid=web_share',
      },
    ],
  };
},
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>
