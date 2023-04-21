const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const newRecipe = {
      title: "Cottage Pie",
      level: "Amateur Chef",
      ingredients: [
        "Minced_Beef",
        "Potatoes",
        "Onion",
        "Garlic",
        "Carrot",
        "Beef_Stock",
      ],
      cuisine: "British/Irish",
      dishType: "Main_Course",
      duration: 120,
      creator: "William",
    };
    return Recipe.create(newRecipe)
      .then((firstRecipe) => {
        console.log(firstRecipe.title);
      })
      .then(() => {
        return Recipe.insertMany(data).then((eachRecipe) => {
          console.log(eachRecipe);
        });
      })
      .then(() => {
        return Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        ).then(() => {
          console.log("Success!");
        });
      })
      .then(() => {
        return Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {
          console.log("Successful Deletion!");
          return mongoose.connection.close().then(() => {
            console.log("Connection closed");
          });
        });
      })
      .catch((error) => {
        console.error("Error connecting to the database", error);
      });
  });
