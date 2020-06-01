import { Sequelize } from 'sequelize';

import options from './config';

const sequelize = new Sequelize(options);
export { sequelize };
