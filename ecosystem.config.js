module.exports = {
  apps : [{
    name   : "backend",
    script : "./dist/main.js",
    env_production: {
      NODE_ENV: "production"
    }
  }]
}
