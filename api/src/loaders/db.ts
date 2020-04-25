import { sequelize } from '@/db';

const loader: AppInitializer = async ({ app }) => {
  // Initialize and Connect Database

  await sequelize
    .authenticate({ logging: false })
    // .then(() => sequelize.sync({ force: true }))
    .then(() => {
      console.log('Database connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
      throw err;
    });

  app.sequelize = sequelize;

  return { app };
};

export default loader;
