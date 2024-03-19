const Client = require("../models/Client")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const e = require("cors")
dotenv.config()

module.exports = {

    register:(req,res)=>{
        const {email,password}=req.body
        console.log(email,password);
         bcrypt.hash(password,12,(error,hash)=>{
            if(error)
              res.status(500).send({error:error.message})
              const newUser=new Client({
                email,
                password:hash
            })
            console.log(newUser);
         newUser.save()
       .then(()=>{res.status(200).send({newUser}) ,console.log("secc");}
        )
        .catch(()=>{res.status(500).send(false),console.log("ddfd");}) 
     } )
    },

    login: (req, res) => {

        const email = req.params.email
        const password = req.params.password

        Client.find({ email: { $eq: email } })
            .then((clients) => {
                if (clients.length == 0) {
                    return res.status(409).send({ message: 'Email and password are not matches!' })
                }

                const [client] = clients
                console.log(client);
      
                bcrypt.compare(password, client.password, (error, result) => {
                    if (error || !result) {
                        return res.status(500).send({ error: result });
                    }
                
                    const token = jwt.sign({ email, password: client.password }, process.env.SECRET, {
                        expiresIn: '1hr'
                    });
                
                    console.log("succ!!!");
                    return res.status(200).send({ message: `login successfuly!`, client, token });
                });
            }
            )
            .catch((err) => {
                return res.status(404).send({ error: err.message })
            })
    }

   
    
}