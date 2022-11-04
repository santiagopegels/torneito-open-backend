export default () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodb: process.env.MONGODB,
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_KEY || '',
  supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET || '',
});
