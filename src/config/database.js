module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5434',
  username: 'postgres',
  password: 'docker',
  database: 'students',
  define: {
    timestamps: true,
    underscored: true,
    unsderscoredAll: true,
  },
};
