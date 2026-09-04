export default {
  version: '2.048.36P15',
  vendor: 'aquarius',
  workMode: 'mini',          // normal | lite | mini
  theme: 'default',
  idleTime: 10,              // минут бездействия до авто-выхода
  idleTimeout: 10 * 60 * 1000,
  mapRefreshInterval: 5,
  featureFlags: {
    assembly: false,
    mesh: true,
    portal20: true,
    lbsServer: false
  },
  api: {
    baseUrl: '/znm',
    portalUrl: '/zcloudwifi',
    iotUrl: '/znode'
  }
}
