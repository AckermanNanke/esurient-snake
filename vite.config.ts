import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    server: {
      port: 8998
    },
    base: command === "build" ? "/esurient-snake/" : "/",
  }
})
