const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const User = require("../models/user");


//Requète afficher tout  les messages
router.get("/allComment", (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        }
    }).then(comment => res.send(comment))
        .catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );
});





router.post("/newComment", (req, res) => {
    console.log(req.body.text)
    Comment.create({
        text: req.body.text,
        userId: req.body.userId,
        messageId: req.body.messageId

    }).then(text => res.send(text))
        .catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );;
});


//supprimer un message
router.delete("/delete/:id", (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send("success"))
        .catch(
            (error) => {
                res.status(404).json({
                    error: error
                });
            }
        );;
})


module.exports = router;