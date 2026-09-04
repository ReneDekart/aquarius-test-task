import apiService from '@/api/http'

export default {
  fetchAccessPoints () {
    return apiService.get('/aps')
  },
  createAccessPoint (payload) {
    return apiService.post('/aps', payload)
  },
  deleteAccessPoint (apId) {
    return apiService.delete(`/aps/${apId}`)
  }
}
