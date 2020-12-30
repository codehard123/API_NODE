const mongoose = require("mongoose");
const participantsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  rsvp: String,
});
module.exports = mongoose.model("Participant", participantsSchema);
