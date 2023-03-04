const users = require("../public/users.json");
const fs = require("fs");

module.exports.getAllUsers = (req, res) => {
  const { limit } = req.query;

  const allUsers = users.slice(0, limit || users.length);
  res.send(allUsers);
};

module.exports.getARandomUser = (req, res) => {
  const randomId = Math.floor(Math.random() * users.length) + 1;
  const randomUser = users.find((user) => user.id === randomId);
  res.send(randomUser);
};

module.exports.saveAUser = (req, res) => {
  const data = req.body;

  // validation if all fields are given
  if (
    data.name &&
    data.id &&
    data.gender &&
    data.contact &&
    data.address &&
    data.photoUrl
  ) {
    const idExists = users.find((user) => user.id === Number(data.id));
    if (idExists) {
      // if id already exists
      res.send("This id already exists!");
    } else {
      // if all okay, save the data
      let jsonData = fs.readFileSync("public/users.json");
      let existingData = JSON.parse(jsonData);
      existingData.push(data);

      fs.writeFileSync("public/users.json", JSON.stringify(existingData));
      res.send("Data saved successfully");
    }
  } else {
    res.send(
      "id, name, gender, contact, address, photoUrl all fields are required"
    );
  }
};

module.exports.updateAUser = (req, res) => {
  const { id } = req.params;

  const idExists = users.find((user) => user.id === Number(id));

  if (idExists) {
    let jsonData = fs.readFileSync("public/users.json");
    let existingData = JSON.parse(jsonData);
    existingData.map((user) => {
      if (user.id === Number(id)) {
        user.name = req.body.name;
        user.gender = req.body.gender;
        user.contact = req.body.contact;
        user.address = req.body.address;
        user.photoUrl = req.body.photoUrl;
      }
    });

    fs.writeFileSync("public/users.json", JSON.stringify(existingData));
    res.send("Data Updated successfully");
  } else {
    res.send("No id exists of that id");
  }
};

module.exports.updateBulkUser = (req, res) => {
  const inputUsers = req.body;

  users.map((user) => {
    inputUsers.map((inputUser) => {
      if (user.id == inputUser.id) {
        user.name = inputUser.name;
        user.gender = inputUser.gender;
        user.contact = inputUser.contact;
        user.address = inputUser.address;
        user.photoUrl = inputUser.photoUrl;
      }
    });
  });
  fs.writeFileSync("public/users.json", JSON.stringify(users));
  res.send("Users updated successfully!");
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.params;

  const idExists = users.find((user) => user.id === Number(id));

  if (idExists) {
    let jsonData = fs.readFileSync("public/users.json");
    let existingData = JSON.parse(jsonData);
    let newData = existingData.filter((user) => user.id !== Number(id));

    fs.writeFileSync("public/users.json", JSON.stringify(newData));
    res.send("Data deleted successfully");
  } else {
    res.send("No id exists of that id");
  }
};
