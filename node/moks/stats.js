const byIds = (...ids) => ids

export const apIds = byIds('ap-001', 'ap-002', 'ap-003', 'ap-004', 'ap-005', 'ap-006')

export const clientsPerHour = [
  { hour: '00:00', clients: 3, clientIds: byIds('sta-004', 'sta-008', 'sta-010'), apIds: byIds('ap-003', 'ap-006') },
  { hour: '02:00', clients: 3, clientIds: byIds('sta-004', 'sta-008', 'sta-010'), apIds: byIds('ap-003', 'ap-006') },
  { hour: '04:00', clients: 3, clientIds: byIds('sta-004', 'sta-008', 'sta-010'), apIds: byIds('ap-003', 'ap-006') },
  { hour: '06:00', clients: 3, clientIds: byIds('sta-004', 'sta-008', 'sta-010'), apIds: byIds('ap-003', 'ap-006') },
  { hour: '08:00', clients: 6, clientIds: byIds('sta-001', 'sta-004', 'sta-005', 'sta-007', 'sta-008', 'sta-010'), apIds: byIds('ap-001', 'ap-002', 'ap-003', 'ap-006') },
  { hour: '10:00', clients: 8, clientIds: byIds('sta-001', 'sta-002', 'sta-004', 'sta-005', 'sta-006', 'sta-007', 'sta-008', 'sta-010'), apIds: byIds('ap-001', 'ap-002', 'ap-003', 'ap-006') },
  { hour: '12:00', clients: 8, clientIds: byIds('sta-001', 'sta-002', 'sta-004', 'sta-005', 'sta-006', 'sta-007', 'sta-008', 'sta-010'), apIds: byIds('ap-001', 'ap-002', 'ap-003', 'ap-006') },
  { hour: '14:00', clients: 8, clientIds: byIds('sta-001', 'sta-002', 'sta-004', 'sta-005', 'sta-006', 'sta-007', 'sta-008', 'sta-010'), apIds: byIds('ap-001', 'ap-002', 'ap-003', 'ap-006') },
  { hour: '16:00', clients: 8, clientIds: byIds('sta-001', 'sta-002', 'sta-004', 'sta-005', 'sta-006', 'sta-007', 'sta-008', 'sta-010'), apIds: byIds('ap-001', 'ap-002', 'ap-003', 'ap-006') },
  { hour: '18:00', clients: 10, clientIds: byIds('sta-001', 'sta-002', 'sta-003', 'sta-004', 'sta-005', 'sta-006', 'sta-007', 'sta-008', 'sta-009', 'sta-010'), apIds: byIds('ap-001', 'ap-002', 'ap-003', 'ap-006') },
  { hour: '20:00', clients: 7, clientIds: byIds('sta-001', 'sta-003', 'sta-004', 'sta-006', 'sta-008', 'sta-009', 'sta-010'), apIds: byIds('ap-001', 'ap-002', 'ap-003', 'ap-006') },
  { hour: '22:00', clients: 3, clientIds: byIds('sta-004', 'sta-008', 'sta-010'), apIds: byIds('ap-003', 'ap-006') }
]

export const apStatusDistribution = [
  { apId: 'ap-001', status: 'online' },
  { apId: 'ap-002', status: 'online' },
  { apId: 'ap-003', status: 'online' },
  { apId: 'ap-004', status: 'offline' },
  { apId: 'ap-005', status: 'upgrade' },
  { apId: 'ap-006', status: 'online' }
]

export const apClients = {
  apId: 'ap-001',
  apName: 'AP-Office-1F',
  clients: [
    { clientId: 'sta-001', name: 'laptop-ivanov', band: '5G', signal: -45, ssidId: 'ssid-001' },
    { clientId: 'sta-003', name: 'android-guest-1', band: '2.4G', signal: -61, ssidId: 'ssid-002' },
    { clientId: 'sta-005', name: 'notebook-sidorov', band: '5G', signal: -48, ssidId: 'ssid-001' }
  ]
}

export default {
  apIds,
  clientsPerHour,
  apStatusDistribution,
  apClients
}
