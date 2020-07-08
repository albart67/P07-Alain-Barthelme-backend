const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//Création d'un compte
router.post("/signup", (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                name: req.body.name,
                password: hash,
                isAdmin: req.body.isAdmin

            }).then(user => res.send("utilisateur crée"))
                .catch(
                    (error) => {
                        res.status(404).json({
                            error: error
                        });
                    }
                );
        })
});

// bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//         const user = new User({
//             email: req.body.email,
//             password: hash
//         });
//         user.save()
//             .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//             .catch(error => res.status(400).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));



//Connection au compte
router.post("/login", (req, res) => {
    console.log(req.body.password)
    User.findAll({
        where: {
            name: req.body.name
        }

    }).then((user => {
        console.log(req.body.name)
        // if (!user) {
        //     return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        // }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: user._id,

                });
            })
            .catch(error => res.status(500).json({ error }))
    })
    )
})









//Utilisateur avec messages
router.get("/allUser", (req, res) => {
    User.findAll({
        include: [{ model: Message }]
    }).then(user => res.send(user))
        .catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );;
})


module.exports = router;

