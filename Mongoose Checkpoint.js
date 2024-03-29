// Import required modules
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for the Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create a Person model based on the schema
const Person = mongoose.model('Person', personSchema);

// Create and save a record of a model
const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Burgers']
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Create many records with model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.find() to search the database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.findOne() to return a single matching document
const findOnePersonByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.findById() to search the database by _id
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Perform classic updates by running find, edit, then save
const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push('Hamburger');
    person.save((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  });
};

// Perform new updates on a document using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, data) => {
      if (err) return console.error(err);
      done(null, data);
    }
  );
};

// Delete one document using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// MongoDB and Mongoose - Delete many documents with model.remove()
const removeManyPeople = (done) => {
  Person.remove({ name: 'Mary' }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Chain search query helpers to narrow search results
const queryChain = (done) => {
  Person.find({ favoriteFoods: 'Burritos' })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
};

// Export functions for testing
module.exports = {
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOnePersonByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain
};
