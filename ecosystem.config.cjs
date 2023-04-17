module.exports = {
  apps: [
    {
      name: 'vite-h5',
      script: 'vite-h5-server.js'
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: '123.249.120.69',
      ref: 'origin/master',
      repo: 'git@github.com:xiaopeng2918/record_cost_ui.git',
      path: '/project/cost_record/juejue-vite-h5',
      'post-deploy':
        'git reset --hard && git checkout master && git pull && npm i --force --production=false && npm run build:release && pm2 startOrReload ecosystem.config.js', // -production=false 下载全量包
      env: {
        NODE_ENV: 'production'
      }
    }
  }
}
