const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const User = require("../models/user");
const Comment = require("../models/comment");


//Requète afficher tout  les messages
router.get("/allMessage", (req, res) => {
    Message.findAll().then(post => res.send(post))
        .catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );;
})

router.get("/allMessageUser", (req, res) => {
    Message.findAll({
        include: [{ model: User },
        { model: Comment }]
    }).then(message => res.send(message))
        .catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );;
})

router.get("/allMessage1", (req, res) => {
    Message.findAll({
        include: [{ model: User }]
    }).then(messages =>
        messages.forEach((message) => res.send(`${message.text} écrit par ${message.user.name}`)
            // { console.log(`${message.text} écrit par ${message.user.name}`) }
        ))
        .catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );

})


// async function test() {

//     const messages = await Message.findAll({
//         include: [{ model: User }]
//     })
//     messages.forEach(message => {
//         console.log(`${message.text} écrit par ${message.user.name}`)

//     });

// messages.forEach(message => {
//     console.log(`${message.text} écrit par ${message.user.name}`)

// });


//Affichage message selon utilisateur
router.get("/message/:id", (req, res) => {
    Message.findAll({
        where: {
            id: req.params.id
        }
    }).then(message => res.send(message))
        .catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );
});

// //Création d'un nouveau message
// router.post("/newMessage", (req, res) => {
//     console.log(req.body)
//     Message.create({
//         text: req.body.text,
//         userId: req.body.userId

//     }).then(text => res.send(text))
//         .catch(
//             (error) => {
//                 res.status(404).json({
//                     error: error
//                 });
//             }
//         );;
// });

// router.post("/uploadFile", (req, res) => {
//     const image = (req.body)
//         .then(text => res.send(text))
//         .catch(
//             (error) => {
//                 res.status(404).json({
//                     error: error
//                 });
//             }
//         )
// );



//supprimer un message
router.delete("/delete/:id", (req, res) => {
    Message.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send("success"))
        .catch(
            (error) => {
                res.status(405).json({
                    error: error
                });
            }
        );;
})


//modifier un message
router.put("/edit", (req, res) => {
    Message.update(
        {
            title: req.body.title,
            text: req.body.text
        },
        {
            where: { id: req.body.id }
        }
    ).then(() => res.send("succes"))
        .catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );;
})

module.exports = router;