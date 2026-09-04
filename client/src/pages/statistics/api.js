import apiService from '@/api/http'

export default {
  fetchStatisticUsage () {
    return apiService.get('/stats')
  }
}
