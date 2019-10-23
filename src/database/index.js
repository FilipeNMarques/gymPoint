import Squelize from 'sequelize';

// Database
import databaseConfig from '../config/database';

// Models
import students from '../app/models/Students';

const models = [students];

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
