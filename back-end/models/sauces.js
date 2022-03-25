const mongoose = require("mongoose");
const mongooseErrors = require("mongoose-errors");

const saucesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  imageUrl: { type: String, required: true },
  mainPepper: { type: String, required: true },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

saucesSchema.plugin(mongooseErrors);

mongoose
  .model("Sauces", saucesSchema)
  .create()
  .catch((error) => {
    res.status(400).json({
      error: error,
    });
    done();
  });

module.exports = mongoose.model("Sauce", saucesSchema);
