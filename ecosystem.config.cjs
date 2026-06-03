// PM2 ecosystem config — Gosok Kartu (Double) (standalone, port 5285).
// nginx reverse-proxies telkomsel2double.qlipmobile.com → 127.0.0.1:5285.

module.exports = {
  apps: [
    {
      name: 'tsel-spin-double',
      cwd: '/home/qlip/tsel-spin-double',
      script: 'server.mjs',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',

      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: '5285',
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
      error_file: '/home/qlip/tsel-spin-double/logs/tsel-spin-double.err.log',
      out_file: '/home/qlip/tsel-spin-double/logs/tsel-spin-double.out.log',
      merge_logs: true,
      time: true,
    },
  ],
}
