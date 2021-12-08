const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET


require('./registration-route.js');

router.post( '/register',
    function(req, res) {

    
        const formData = {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'email': req.body.email,
            'password': req.body.password,
            'phone': req.body.phone
        }
       
        // Check if email is unique
        UserModel
        .findOne( { email: formData['email']} )
        .then(
            function (dbDocument) {
                // If email is unique...
                if(!dbDocument) {
           
                    // Generate a salt
                    bcryptjs.genSalt(

                        function(bcryptError, theSalt) {
                        // Use the (a) and (b) salt user's password 
                        // and produce hashed password
                            bcryptjs.hash( 
                                formData.password,                  // first ingredient
                                theSalt,                            // second ingredient
                                function(hashError, theHash) {      // the hash
                                    // Reassign the original password formData
                                    formData['password'] = theHash;

                                    // Create the user's account with hashed password
                                    UserModel
                                    .create(formData)
                                    // If successful...
                                    .then(
                                        function(createdDocument) {
                                            // Express sends this...
                                           res.json(createdDocument);
                                        }
                                    )
                                    // If problem occurs, the catch the problem...
                                    .catch(
                                        function(dbError) {
                                            // For the developer
                                            console.log('An error occured during .create()', dbError);

                                            // For the client (frontend app)
                                            res.status(503).json(
                                                {
                                                    "status": "not ok",
                                                    "message": "Something went wrong with db"
                                                }
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    )

                }
                // If email is NOT unique....
                else { 
                    // reject the request
                    res.status(403).json(
                        {
                            "status": "not ok",
                            "message": "Account already exists"
                        }
                    )
                }
            }
        )
        .catch(
            function(dbError) {

                // For the developer
                console.log(
                    'An error occured', dbError
                );

                // For the client (frontend app)
                res.status(503).json(
                    {
                        "status": "not ok",
                        "message": "Something went wrong with db"
                    }
                )

            }
        )
    }
);


// Login user
router.post('/login', 
    (req, res) => {
        // Capture form data
        const formData = {
            email: req.body.email,
            password: req.body.password,
        }

        // Check if email exists
        UserModel
        .findOne({ email: formData.email })
        .then(
            (dbDocument) => {
                // If email exists
                if(dbDocument) {
                    // Compare the password sent againt password in database
                    bcryptjs.compare(
                        formData.password,          // password user sent
                        dbDocument.password         // password in database
                    )
                    .then(
                        (isMatch) => {
                            // If passwords match...
                            if(isMatch) {
                                // Generate the Payload
                                const payload = {
                                    _id: dbDocument._id,
                                    email: dbDocument.email
                                }
                                // Generate the jsonwebtoken
                                jwt
                                .sign(
                                    payload,
                                    jwtSecret,
                                    (err, jsonwebtoken) => {
                                        if(err) {
                                            console.log(err);
                                            res.status(501).json(
                                                {
                                                    "message": "Something went wrong"
                                                }
                                            );
                                        }
                                        else {
                                            // Send the jsonwebtoken to the client
                                            res.json(
                                                {
                                                    "message": jsonwebtoken
                                                }
                                            );
                                        }
                                    }
                                )
                            }
                            // If passwords don't match, reject login
                            else {
                                res.status(401).json(
                                    {
                                        "message": "Wrong email or password"
                                    }
                                );
                            }
                        }
                    )
                    .catch(
                        (err) => {
                            console.log(err)
                        }
                    )
                }
                // If email does not exist
                else {
                    // reject the login
                    res.status(401).json(
                        {
                            "message": "Wrong email or password"
                        }
                    );
                }
            }
        )
        .catch(
            (err) => {
                console.log(err);

                res.status(503).json(
                    {
                        "status": "not ok",
                        "message": "Please try again later"
                    }
                );
            }
        )
    }
)

module.exports = router;