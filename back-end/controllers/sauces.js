const Sauce = require('../models/sauces');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const sauceBody = JSON.parse(req.body.sauce);
  delete sauceBody._id;
  const sauce = new Sauce({
    ...sauceBody,
    imageUrl: url + '/images/' + req.file.filename,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then((sauce) => {
      res.status(201).json({
        message: 'Sauce created successfully',
        sauce: sauce,
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

// Get all sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Get one Sauce

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Edit a sauce
exports.editSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split('/images/')[1];
    if (req.file)
      fs.unlink(`images/${filename}`, (error) => {
        if (error) res.status(400).json({ error });
      });
    const sauceBody = req.file
      ? {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    Sauce.updateOne({ _id: sauce.id }, { ...sauceBody, _id: sauce.id })
      .then(() => res.status(200).json({ message: 'Sauce updated!' }))
      .catch((error) => res.status(400).json({ error }));
  });
};

// Delete a sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json({ message: 'Sauce deleted!' });
      });
    });
  });
};

// Like a sauce and deslike operator
exports.likeSauce = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const sauceId = req.params.id;

  switch (like) {
    case 1:
      Sauce.updateOne(
        { _id: sauceId },
        { $push: { usersLiked: userId }, $inc: { likes: +1 } }
      )
        .then(() => res.status(200).json({ message: 'Sauce liked!' }))
        .catch((error) => res.status(400).json({ error }));

      break;
    case 0:
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
            )
              .then(() => res.status(200).json({ message: 'Sauce unliked!' }))
              .catch((error) => res.status(400).json({ error }));
            console.log(sauce.usersLiked);
          }
          if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
            )
              .then(() => res.status(200).json({ message: 'Sauce unliked!' }))
              .catch((error) => res.status(400).json({ error }));
            console.log(sauce.usersDisliked);
          }
        })
        .catch((error) => res.status(400).json({ error }));
      break;
    case -1:
      console.log('Dislike');
      console.log(userId);
      console.log(like);
      Sauce.updateOne(
        { _id: sauceId },
        { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
      )
        .then(() => res.status(200).json({ message: 'Sauce disliked!' }))

        .catch((error) => res.status(400).json({ error }));

      break;

    default:
      console.log('error');
  }
};
