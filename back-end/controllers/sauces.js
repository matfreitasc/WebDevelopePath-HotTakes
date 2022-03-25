const sauces = require("../models/sauces");

exports.createSauce = (req, res, next) => {
  const sauce = new sauces({
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    imageUrl: req.body.imageUrl,
    mainPepper: req.body.mainPepper,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
    userId: req.body.userId,
  });
  sauce
    .save()
    .then((createdSauce) => {
      res.status(201).json({
        message: "Sauce added successfully",
        sauceId: createdSauce._id,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllSauces = (req, res, next) => {
  sauces
    .find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneSauce = (req, res, next) => {
  sauces
    .findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.modifySauce = (req, res, next) => {
  const sauce = new sauces({
    _id: req.body.id,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    imageUrl: req.body.imageUrl,
    mainPepper: req.body.mainPepper,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
    userId: req.body.userId,
  });
  sauces
    .updateOne({ _id: req.params.id }, sauce)
    .then((result) => {
      res.status(200).json({ message: "Update successful!" });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteSauce = (req, res, next) => {
  sauces
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: "Sauce deleted!" });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
