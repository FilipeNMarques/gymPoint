import Squelize from 'sequelize';

// Database
import databaseConfig from '../config/database';

// Models
import students from '../app/models/Students';
import user from '../app/models/User';
import plans from '../app/models/Plans';

const models = [students, user, plans];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Squelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
