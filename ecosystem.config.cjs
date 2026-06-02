// PM2 ecosystem config — Putar Roda (standalone, port 5281).
// nginx reverse-proxies telkomsel2.qlipmobile.com → 127.0.0.1:5281.

module.exports = {
  apps: [
    {
      name: 'tsel-spin',
      cwd: '/home/qlip/tsel-spin',
      script: 'server.mjs',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',

      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: '5281',
      },

      // Restart behavior
      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 2000,
      max_memory_restart: '500M',

      // Logs
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: '/home/qlip/tsel-spin/logs/tsel-spin.err.log',
      out_file: '/home/qlip/tsel-spin/logs/tsel-spin.out.log',
      merge_logs: true,
      time: true,
    },
  ],
}
