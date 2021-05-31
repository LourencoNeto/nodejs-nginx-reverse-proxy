const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

getNames = function(){
    return new Promise(function(resolve, reject) {
        connection.query(
            'SELECT name FROM people',
            function(err, rows){
                if(rows === undefined){
                    reject(new Error("Error rows is undefined"));
                } else {
                    resolve(rows);
                }
            })
    })
}

const create_table_sql = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar (255), primary key (id))`
connection.query(create_table_sql)

const insert_sql = `INSERT INTO people(name) values('Lourenço')`
connection.query(insert_sql)

app.get('/', (req, res) => {
    getNames()
    .then(function(results){
        html = "<h1>Full Cycle Rocks!</h1>";
        html += "<h2>" + results.length + " names found</h2>";
        html += "<ul>";
        for (var i in results) html += "<li>" + results[i].name + "</li>";
        html += "</ul>";
        res.send(html);
    })
    .catch(function(err){
        console.log("Promise rejection error: "+err);
        res.send("<h1>Error</h1>");
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})