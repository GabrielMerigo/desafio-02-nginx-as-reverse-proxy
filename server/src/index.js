import express from "express";
const app = express();
import mysql from 'mysql';


const config = {
    host: 'mydb',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(config);

const FIND_PEOPLE_NAMES = `SELECT name from people`;

app.get('/', async (req, res) => {
    try {
        const INSERT_NAME = `INSERT INTO people(name) values('Gabriel-${new Date().getTime()}')`;
        connection.query(INSERT_NAME);
        connection.query(FIND_PEOPLE_NAMES, (err, rows) => {
            res.status(200).send(`
                <h1>Full Cycle Rocks!</h1>
                <ul>
                    ${rows.map(row => `<li>${row.name}</li>`).join('')}
                </ul>
            `);
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(9000, () => {
    console.log(`Express listening on port ${9000}`);
});