const db = require('../models');

exports.createMessage = async function(req, res, next) {
    try {
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id // api/users/:id/create
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message);
        await foundUser.save();
        let foundMessage = await db.Message.findById(message._id).populate('user', {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(foundMessage);
    } catch (error) {
        return next(error);
    }
}

exports.getMessage = async function(req, res, next) {
    try {
        let message = await db.Message.find(req.params.message_id);
        return res.status(200).json(message);
    } catch (error) {
        return next(error);
    }
}

exports.deleteMessage = async function(req, res, next) {
    try {
        let foundMessage = await db.Message.find(req.params.message_id);
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    } catch (error) {
        return next(err);
    }
}

exports.getAllMessages = async function(req, res, next) {
    try {
        let messages = await db.Message.find().sort({ createdAt: "desc" }).populate("user", {
            username: true,
            profileImageUrl: true
        })
        return res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
};
