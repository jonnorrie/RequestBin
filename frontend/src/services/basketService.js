import axios from 'axios'

const baseURL = '/api/web'

const generateEndpoint = () => {
  return axios.get(baseURL)
}

const create = (endpoint, masterToken) => {
  const headers = masterToken ? { 'master-token': masterToken } : {}
  return axios.post(`${baseURL}/bin/${endpoint}`, {}, { headers })
}

const getRequests = (endpoint) => {
  return axios.get(`${baseURL}/bin/${endpoint}`)
}

const deleteBasket = (endpoint) => {
  return axios.delete(`${baseURL}/bin/${endpoint}`)
}

const deleteRequest = (requestId) => {
  return axios.delete(`${baseURL}/bin/requests/${requestId}`)
}

export default {
  generateEndpoint,
  create,
  getRequests,
  deleteBasket,
  deleteRequest
}
