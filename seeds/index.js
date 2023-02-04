const mongoose = require("mongoose");
const Spot = require("../models/spot");
const User = require("../models/user");
require("dotenv").config({ path: "../.env" });

const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const dbURL = process.env.dbURL;
const AUTHOR = process.env.AUTHOR_SEED;

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const rArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seed = async () => {
  await Spot.deleteMany({});
  const author = await User.findOne({ username: AUTHOR });

  for (let i = 0; i < 50; i++) {
    const rCity = Math.floor(Math.random() * 187);
    await new Spot({
      location: `${cities[rCity].city}, ${cities[rCity].admin_name}`,
      title: `${rArray(descriptors)}, ${rArray(places)}`,
      image: "https://source.unsplash.com/collection/3509764",
      author: author.id,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi laudantium cumque neque ut. Aut assumenda quis debitis dolorum rerum reprehenderit laudantium distinctio tempora, quas facilis eaque voluptate, doloremque? Velit, exercitationem.",
      price: (Math.random() * 100).toFixed(2),
    }).save();
  }
};
seed().then(() => {
  mongoose.connection.close();
});
