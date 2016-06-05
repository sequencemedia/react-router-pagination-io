import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/'

// Exposing `axios` to all the actions
export request from 'axios'
