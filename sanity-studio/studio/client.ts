import {createClient} from '@sanity/client'
// import dotenv from 'dotenv'

// dotenv.config()

export const client = createClient({
  projectId: '7tj31003',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
