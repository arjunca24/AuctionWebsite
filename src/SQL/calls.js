const getData = async (url) => {
    const newData = await fetch (url, {method: 'GET',
                                 headers: {
                                    'content-type': 'application/json',
                                    'Accept':'application/json'
                                 } 
                                }) 
                                .then(res => res.json())
                                console.log(newData)
}

//The configuration used to connect to the database which can be found 
//in dbConfig.js
const config = require('./dbConfig'),
      sql = require('mssql')

const selectFrom = async(values,table,conditions) => {
    try {
        let pool = await sql.connect(config)
        let users = await pool.request().query(`SELECT ${values} FROM ${table} WHERE ${conditions}`) 
        return users
    }
    catch (error){
        console.log(error)
    }
}       
const insertInto = async(table,values) => {
    try {
        let pool = await sql.connect(config)
        let users = await pool.request().query(`INSERT INTO ${table} VALUES(${values})`) 
        return users
    }
    catch (error){
        console.log(error)
    }
}   

const updateTable = async(table,values,conditions) => {
    try {
        let pool = await sql.connect(config)
        let data = await pool.request().query(`UPDATE ${table} SET ${values} WHERE ${conditions}`) 
        return data
    }
    catch (error){
        console.log(error)
    }
}  

//Export the selectFrom and insertInto functions
module.exports = {
    selectFrom,
    insertInto,
    updateTable,
}