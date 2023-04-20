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
    Recipe.create(newRecipe)
      .then((firstRecipe) => {
        console.log(firstRecipe.title);
      })
      .then(() => {
        Recipe.insertMany(data).then((eachRecipe) => {
          console.log(eachRecipe);
        });
      })
      .then(() => {
        Recipe.findByIdAndUpdate(
          "644159186180317461043b34",
          { duration: 100 },
          { new: true }
        ).then(() => {
          console.log("Success!");
        });
      })
      .then(() => {
        Recipe.findByIdAndDelete("64416127427e4bd4617a2311").then(() => {
          console.log("Successful Deletion!");
          // Run your code here, after you have insured that the connection was made
        });
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
