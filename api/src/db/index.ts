import { Sequelize } from 'sequelize';

import * as models from './models';
import options from './config';

const sequelize = new Sequelize(options);

export { sequelize, models };
