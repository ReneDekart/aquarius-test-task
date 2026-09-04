export default [
  {
    id: 'ssid-001',
    name: 'Corporate',
    security: 'wpa3',      // open | wpa2 | wpa3
    band: '2.4G;5G',
    enabled: true,
    maxClients: 128,
    vlan: 10,
    password: 'Corp#2026!',
    apId: 'ap-001'
  },
  {
    id: 'ssid-002',
    name: 'Guest',
    security: 'open',
    band: '2.4G',
    enabled: true,
    maxClients: 32,
    vlan: 20,
    password: '',
    apId: 'ap-002'
  },
  {
    id: 'ssid-003',
    name: 'IoT',
    security: 'wpa2',
    band: '2.4G',
    enabled: false,
    maxClients: 64,
    vlan: 30,
    password: 'Iot0nly!',
    apId: 'ap-003'
  }
]
