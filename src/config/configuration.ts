export default () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodb: process.env.MONGODB,
});
