const loader: AppInitializer = async ({ app }) => {
  // Initialize and Connect Database

  console.log('Connect DataBase');

  return { app };
};

export default loader;
