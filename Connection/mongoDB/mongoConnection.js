const {MongoClient} = require("mongodb")

let db;
const connected= false;

exports.connect= async function(url){
    try{
        const client= await MongoClient.connect(url,  function(err,_db){
            if(err){
                throw new Error("Could not connect to DB."+ err);
            }
            db= _db;
            connected= true;
            console.log("Connected to DB");
            return db;
        })
    }
    catch(err){
        console.log("error while connecting to the database")
    }
}

exports.collection= function(name){
    if(!connected){
        throw new Error("Must connect to Mongo before calling Connection")
    }
    // returning the specific collection from the database
    return db.collection(name);
}