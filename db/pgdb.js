const {Client} = require('pg')


const postDb = ()=>{
    try{
        const client = new Client({
            user :'postgres',
            port :5432,
            host :'localhost',
            database :'postgres',
            password :'0083499970'
        })

         client.connect()

console.log('connect to pg')

    }catch(err){
           console.log(err)
    }
}





module.exports = postDb