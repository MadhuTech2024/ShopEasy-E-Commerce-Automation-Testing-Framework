import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const validateProductionApiUrl = (apiUrl) => {
  if (!apiUrl) {
    throw new Error(
      'Set VITE_API_BASE_URL to the deployed HTTPS API base URL before building for production.',
    )
  }

  let parsedUrl

  try {
    parsedUrl = new URL(apiUrl)
  } catch {
    throw new Error('VITE_API_BASE_URL must be an absolute HTTPS URL.')
  }

  if (
    parsedUrl.protocol !== 'https:' ||
    parsedUrl.username ||
    parsedUrl.password ||
    ['localhost', '127.0.0.1', '[::1]'].includes(parsedUrl.hostname) ||
    parsedUrl.pathname.replace(/\/+$/, '') !== '/api' ||
    parsedUrl.search ||
    parsedUrl.hash
  ) {
    throw new Error(
      'VITE_API_BASE_URL must use HTTPS and end with exactly one /api path.',
    )
  }
}

export default defineConfig(({ mode }) => {
  if (mode === 'production') {
    const env = loadEnv(mode, process.cwd(), '')
    validateProductionApiUrl(
      process.env.VITE_API_BASE_URL || env.VITE_API_BASE_URL,
    )
  }

  return {
    plugins: [react()],
  }
})
