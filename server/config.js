const productionConfig = {
  //apiBase: 'http://api.storypalette.net/v1/',
  //socketBase: 'http://api.storypalette.net/',
  apiBase: 'http://server.storypalette.se/v1/',
  socketBase: 'http://server.storypalette.se/',
  environment: 'production',
  port: 8882,
};

const developmentConfig = {
  apiBase: 'http://localhost:8880/v1/',
  socketBase: 'http://localhost:8880/',
  environment: 'local',
  port: 8882,
}

const config = (process.env.NODE_ENV === 'development') ? developmentConfig : productionConfig;

module.exports = config;
