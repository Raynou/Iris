const sqlite3 = require('sqlite3')

module.exports = {
    create: ()=>{
        new sqlite3.Database('./database/iris.db', (err)=>{
            if(err != null) {
                console.log(`Error: ${err}`)
            }
        })
    }
}