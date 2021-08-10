var readline = require("readline")
var process = require("process");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let outputHashMap = {};

const handleInput = (input, outputHash) => {
  const command = input.split(" ")[0];
  const key = input.split(" ")[1];
  const values = input.split(" ").slice(2);
  switch (command) {
    case "ADD":
      if (outputHashMap[key] !== undefined) {
        values.forEach((value) => {
          const oldValues = outputHashMap[key];
          if (!oldValues.includes(value)) {
            outputHashMap[key] = oldValues.concat(values);
            console.log('Added')
            return "Added"
          } else {
            console.log("ERROR, member already exists for the key")
            return "ERROR, member already exists for the key"
          }
        })
      } else {
        outputHashMap[key] = values;
        console.log('Added')
        return "Added"
      }
      break;
    case "MEMBERS":
      if (outputHashMap[key] !== undefined) {
        console.log(outputHashMap[key]);
        return outputHashMap[key]
      } else {
        console.log("ERROR, key does not exist");
              return "ERROR, key does not exist"
      }
    case "KEYS":
      if (Object.keys(outputHashMap).length >= 1) {
        console.log(Object.keys(outputHashMap));
        return Object.keys(outputHashMap)
      } else {
        console.log("empty set");
        return "empty set"
      }
    case "REMOVE":
      if (outputHash[key] !== undefined) {
        if (outputHash[key].length < 2) {
          values.forEach((value) => {
            if (outputHash[key].includes(value)) {
              delete outputHash[key];
              console.log("Removed")
              return "Removed"
            } else {
              console.log("ERROR, member does not exist")
              return "ERROR, member does not exist"
            }
          })
        } else {
          const oldValues = outputHash[key];
          const newValues = oldValues.filter(
            (value) => !values.includes(value)
          );
          outputHash[key] = newValues;
          console.log('Removed')
        return "Removed"
        }
      } else {
        console.log("ERROR, key does not exist");
        return "ERROR, key does not exist"
      }
    case "REMOVEALL":
      if (outputHashMap[key] !== undefined) {
        delete outputHashMap[key];
        console.log("Removed")
        return "Removed"
      } else {
        console.log("ERROR, key does not exist");
        return "ERROR, key does not exist"
      }
    case "CLEAR":
      outputHash = {};
      console.log("cleared");
      return "Cleared";
    case "KEYEXISTS":
      if (outputHash[key] !== undefined) {
        console.log(true)
        return true
      } else {
        console.log(false);
        return false
      }
    case "MEMBEREXISTS":
      if (outputHashMap[key]) {
        let doesExist = false;
        values.forEach((value) => {
          outputHashMap[key].includes(value)
            ? (doesExist = true)
            : (doesExist = false);
        });
        console.log(doesExist);
        return doesExist
      } else {
        console.log("false");
        return "false"
      }
    case "ALLMEMBERS":
      if (Object.keys(outputHashMap).length >= 1) {
        console.log(Object.values(outputHashMap));
        return Object.values(outputHashMap)
      } else {
        console.log("empty set");
        return "empty set"
      }
    case "ITEMS":
      if (Object.keys(outputHashMap).length >= 1) {
        console.log(Object.entries(outputHashMap));
        return Object.entries(outputHashMap)
      } else {
        console.log("empty set");
        return "empty set"
      }
    default:
      return;
  }
};

const recursiveAsyncReadLine = function () {
  rl.question("node-cli >", function (answer) {
    if (answer == "exit")
      //we need some base case, for recursion
      return rl.close(); //closing RL and returning from function.
    handleInput(answer);
    recursiveAsyncReadLine(); //Calling this function again to ask new question
  });
};

recursiveAsyncReadLine();

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});

module.exports = handleInput