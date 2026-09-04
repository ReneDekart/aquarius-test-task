export default [
  {
    id: 'sw-001',
    name: 'SW-Floor1',
    model: 'S5228-X',
    status: 'online',
    ip: '192.168.1.2',
    ports: 28,
    connectedAps: ['ap-001', 'ap-002']
  },
  {
    id: 'sw-002',
    name: 'SW-Floor3',
    model: 'S5328-X',
    status: 'online',
    ip: '192.168.1.3',
    ports: 28,
    connectedAps: ['ap-003']
  },
  {
    id: 'sw-003',
    name: 'SW-Warehouse',
    model: 'S5218-P-PWR',
    status: 'offline',
    ip: '192.168.2.3',
    ports: 20,
    connectedAps: ['ap-004', 'ap-005']
  },
  {
    id: 'sw-004',
    name: 'SW-Branch2',
    model: 'S5228-X',
    status: 'online',
    ip: '192.168.3.2',
    ports: 28,
    connectedAps: ['ap-006']
  }
]
