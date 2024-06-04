import express from "express";
const app = express();
import mysql from 'mysql2/promise';
import { FIND_PEOPLE_NAMES, CREATE_PEOPLE_TABLE, CHECK_TABLE } from './queries.js'


const config = {
    host: 'mydb',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

app.get('/', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config);
        const INSERT_NAME = `INSERT INTO people(name) values('Gabriel-${new Date().getTime()}')`;

        const [result] = await connection.execute(CHECK_TABLE);
        const peopleTableDoesNotExist = !result[0].count

        if (peopleTableDoesNotExist) {
            await connection.execute(CREATE_PEOPLE_TABLE);
        }

        await connection.query(INSERT_NAME);

        const [people] = await connection.query(FIND_PEOPLE_NAMES);

        res.status(200).send(`
            <h1>Full Cycle Rocks!</h1>
            <ul>
                ${people.map(row => `<li>${row.name}</li>`).join('')}
            </ul>
        `);
    } catch (error) {
        console.log(error);
    }
});

app.listen(9000, () => {
    console.log(`Express listening on port ${9000}`);
});