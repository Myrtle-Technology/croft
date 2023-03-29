module.exports = {
  apps: [
    {
      name: 'croft',
      script: 'dist/main.js',
      instances: 1,
      max_memory_restart: '300M',
      exp_backoff_restart_delay: 100,
    },
  ],
};
