import mongoose from 'mongoose';
import { env } from 'consts';

const loader: AppInitializer = async ({ app }) => {
  // Initialize and Connect Database

  const uri = `mongodb://${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`;
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.set('useCreateIndex', true);
  const db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', () => {
    console.log('Connected to mongoDB server.\n');
  });

  return { app };
};

export default loader;
