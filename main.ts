import express from 'express'
import Mysql, { ConnectionOptions } from 'mysql2'
import { faker } from '@faker-js/faker'

type Users = {
    id: number
    name: string
}

const app = express()

const db_config: ConnectionOptions = {
    host: 'database',
    user: 'root',
    password: 'root',
    database: 'challenge'
}

const generateHtmlFrom = (users: Users[] = []) => {
    let listString = ''
    users.forEach(user => listString += `<li>${user.name}</li><br/>`)
    return `
        <h1>Full Cycle Rocks!</h1>
        <ul>
            ${listString}
        </ul>
    `
}

app.get('/', (_, res) => {
    const connection = Mysql.createConnection(db_config)

    const sqlCreateTable = `
        CREATE TABLE IF NOT EXISTS users (
            id int(11) NOT NULL auto_increment,   
            name varchar(250) NOT NULL default "", 
            PRIMARY KEY (id)
        );
    `
    connection.query(sqlCreateTable)
    
    const name = faker.person.fullName()
    const sqlInsert = `INSERT INTO users (name) VALUES ("${name}");`
    connection.query(sqlInsert)


    const sqlGet = `SELECT * from users`
    connection.query(sqlGet, function (_, results) {
        res.status(201).send(generateHtmlFrom(results as Users[]))
    })
    connection.end()
})

app.listen(3000, () => {
    console.log('App start on port 3000')
})