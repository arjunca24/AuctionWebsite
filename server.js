const express = require('express'),
      calls = require('./src/SQL/calls'),
      cors = require('cors')

const API_PORT = process.env.PORT || 999
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


//Single function to select any values from any table given any conditions
app.post('/api', async(req,res) => {
   const records = (await calls.selectFrom(req.body.values,req.body.table,req.body.conditions)).recordset
   res.send({record: records})
 })

//These next 3 functions are for bidding, creating auctions and registering accounts.
//Although they can be combined into one function since they all use the same insertInto
//function, I have decided to keep them seperate so I can handle the errors for them 
//separately
app.post('/bid', async(req,res) => {
  const bid = (await calls.insertInto('Bids',req.body.values)).recordset
  res.send({bids: bid})
})

app.post('/create', async(req,res) => {
  const auction = (await calls.insertInto('Auction',req.body.values)).recordset
  res.send({auction: auction})
})

app.post('/register', async(req,res) => {
  try{
  const user = (await calls.insertInto('Users',req.body.values)).recordset
  res.send({user: user,
            error: null})
  }
 catch{
  res.send({error: 'DuplicatePrimaryKey'})
 } 
})

app.post('/update', async(req,res) => {
  const endDate = (await calls.updateTable(req.body.table,req.body.values,req.body.conditions)).recordset
  res.send({endDate: endDate})
})
   
//Code for server
app.get('/apii',function(req,res) {
  console.log('Called Quit')
  res.send({result: 'Goodbye'})
})
app.get('/quit',function(req,res) {
    console.log('Called Quit')
    res.send({result: 'Goodbye'})
})

app.listen(API_PORT,'localhost', () => console.log(`Listening on port ${API_PORT}`))

  
