import axios from 'axios'
import { useQuery } from 'react-query'

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}`,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
})

type CustomResponse = {
  message: string
}

const useGetHelloWorld = () => {
  return useQuery<CustomResponse, Error>(['hello'], async () => {
    const response = await apiClient.get<CustomResponse>('/')
    return response.data
  })
}

const ApiService = {
  useGetHelloWorld,
}
export default ApiService
