const express = require('express');
// We only need the routing methods from Express
const router = express.Router();
const BookingModel = require('../models/BookingModel.js');








// No need to include '/user' here in the document part of the URL
router.post( '/booking',
    function(req, res) {

        // Client (browser, postman) POSTs this...
        const formData = {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'email': req.body.email,
            'password': req.body.password,
            'phone': req.body.phone,
        }


        // Check if email is unique
        BookingModel
        .findOne( { email: formData['email']} )
        .then(
            async function (dbDocument) {

                
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
                                           res.json({
                                               status: "ok",
                                               createdDocument
                                            });
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


router.get(
    '/get',         // http://www.website.com/user/get
    function() {
        BookingModel
        .find()
        .then(
            function(dbDocument) {
                res.json(
                    {
                        message: dbDocument
                    }
                )
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
