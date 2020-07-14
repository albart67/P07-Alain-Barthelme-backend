const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const sequelize = require("./database");

const User = require("./models/user");
const Message = require("./models/message");
const Comment = require("./models/comment");

const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());


app.use("/api", messageRoutes);
app.use("/api", userRoutes);
app.use("/api", commentRoutes);

//Association des models
Message.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Message);
Message.belongsTo(User);

module.exports = app;


//test();


async function test() {
    await sequelize.sync({ force: true });
    await User.create({
        name: "Alain2",
        password: "1234",
        isAdmin: true
    });
    await Message.create({

        text: 'bonjour',
        userId: 1
    })
    await Comment.create({
        text: 'comment1',
        userId: 5
    })

    const user = await User.findByPk(1);//test2
    await user.createMessage({
        title: 'test2',
        text: 'bonjour',
    })
    const messages = await Message.findAll({
        include: [{ model: User }]
    })
    messages.forEach(message => {
        console.log(`${message.text} écrit par ${message.user.name}`)

    });
    const messages2 = await Message.findAll();
    messages2.forEach(async message => {
        const user = await User.findByPk(message.userId);
        console.log(`${message.text} écrit par ${user.name}`)
    });
}



// Message.sync({ force: true }).then(() => {
//     // Now the `users` table in the database corresponds to the model definition
//     return Message.create({
//         userId: 2,
//         text: "le chef "
//     });
// });


/*
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
*/

/*
Post.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`listening on: http://localhost: ${PORT}`)
    });
});
*/





/*
User.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return User.create({
        name: "Roger",
        password: "456",
        isAdmin: true

    });
});



Message.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return Message.create({
        title: "rentre",
        text: "le chef "
    });
});

app.use("/api", messageRoutes);





/*
apiRoutes.get("/allMessage", (req, res) => {
    Message.findAll().then(post => res.send(post));
})
*/


/*
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
});

app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
});
*/

