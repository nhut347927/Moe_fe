import path from "path";
import react from '@vitejs/plugin-react-swc'; // Đảm bảo cài đúng plugin này
import { defineConfig } from "vite";
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "./private-key.key")),  // Đường dẫn tới private key
      cert: fs.readFileSync(path.resolve(__dirname, "./certificate.crt")),  // Đường dẫn tới chứng chỉ
    },
  },
});
