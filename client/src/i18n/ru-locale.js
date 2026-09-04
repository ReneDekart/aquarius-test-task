export default {
  routes: {
    home: {
      title: 'Главная'
    },
    accessPointsPage: {
      title: 'Список точек доступа',
      sideMenuTitle: 'Точки доступа'
    },
    statistics: {
      title: 'Статистика использования',
      sideMenuTitle: 'Статистика'
    }
  },
  /** Наименования колонок таблицы */
  accessPointTableColumns: {
    name: 'Наименование',
    model: 'Модель',
    status: 'Статус',
    ip: 'IP-адрес',
    band: 'Диапазон',
    channel: 'Канал',
    clients: 'Клиенты',
    location: 'Локация',
    actions: 'Действия'
  },
  /** Текст кнопок действий */
  actions: {
    goToControl: 'Перейти к управлению',
    close: 'Закрыть',
    addAccessPoint: 'Добавить',
    addApToTable: 'Добавить точку',
    reset: 'Сброс',
    pause: 'Пауза',
    play: 'Воспроизвести',
    resume: 'Продолжить'
  },
  /** Заголовки */
  titles: {
    addAccessPointModal: 'Добавление точки доступа',
    accessPointsPageh1: 'Точки доступа',
    statisticsPageH1: 'Статистика использования'
  },
  paragraphs: {
    apListbyWLC: 'Список точек доступа WLC-контроллера'
  },
  /** Наименования различных инпутов */
  fieldNames: {
    name: 'Наименование',
    model: 'Модель',
    ipAddress: 'IP-адрес',
    band: 'Диапазон',
    channel: 'Канал',
    location: 'Локация'
  },
  /** Одиночные слова */
  singleWords: {
    version: 'версия',
    clients: 'Клиенты'
  }
}
