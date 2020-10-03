import path from 'path';

module.exports = {
    client: 'postgres',
    connection: {
        host: 'localhost',
        user: 'alex',
        password: 'dksecurity',
        database: 'nlw',
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
        extension: 'ts',
    }
}

