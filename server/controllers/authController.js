const users  = require ("../models/users");
id = 0;


module.exports = {
    login: (req, res, next) => {
        const {session} = req;
        const {username, password} = req.body;

        const user = users.find(user => user.username === username && user.password === password)

        if(user){
            session.user.username = user.username;
            res.status(200).json(session.user)
        } else {
            res.status(200).send("Unauthorized")
        }

    },
    register: (req, res, next) => {
        const {session} = req;
        const {username, password} = req.body;

        users.push({id, username, password});
        id++;

        session.user.username = username;

        res.status(200).json(session.user)

    },
    signout: (req, res, next) => {
        req.session.destroy();
        res.status(200).json(req.session)
    },
    getUser: (req, res, next) => {
        const {session} = req;
        res.status(200).json(session.user)
    }
}