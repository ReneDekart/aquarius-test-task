export default {
  routes: {
    home: {
      title: 'Home'
    },
    accessPointsPage: {
      title: 'Access point list',
      sideMenuTitle: 'Access points'
    },
    statistics: {
      title: 'Usage statistics',
      sideMenuTitle: 'Statistics'
    }
  },
  /** Наименования колонок таблицы */
  accessPointTableColumns: {
    name: 'Name',
    model: 'Model',
    status: 'Status',
    ip: 'IP-address',
    band: 'Band',
    channel: 'Channel',
    clients: 'Clients',
    location: 'Location',
    actions: 'Actions'
  },
  /** Текст кнопок действий */
  actions: {
    goToControl: 'Go to control',
    close: 'Close',
    addAccessPoint: 'Add AP',
    addApToTable: 'Add AP',
    reset: 'Reset',
    pause: 'Pause',
    play: 'Play',
    resume: 'Resume'
  },
  /** Заголовки */
  titles: {
    addAccessPointModal: 'Add asccess point',
    accessPointsPageh1: 'Access points',
    statisticsPageH1: 'Statistics usage'
  },
  paragraphs: {
    apListbyWLC: 'List of Access Points on the WLC'
  },
  /** Наименования различных инпутов */
  fieldNames: {
    name: 'Name',
    model: 'Model',
    ipAddress: 'IP-address',
    band: 'Band',
    channel: 'Channel',
    location: 'Локация'
  },
  /** Одиночные слова */
  singleWords: {
    version: 'version',
    clients: 'Clients'
  }
}
