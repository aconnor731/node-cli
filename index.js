var readline = require("readline")
var process = require("process");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let outputHashMap = {};
console.log(process.version);

const handleInput = (input) => {
  const command = input.split(" ")[0];
  const key = input.split(" ")[1];
  const values = input.split(" ").slice(2);
  switch (command) {
    case "ADD":
      if (outputHashMap[key] !== undefined) {
        const oldValues = outputHashMap[key];
        outputHashMap[key] = oldValues.concat(values);
      } else {
        outputHashMap[key] = values;
      }
      return outputHashMap;
    case "MEMBERS":
      if (outputHashMap[key] !== undefined) {
        console.log(outputHashMap[key]);
      } else {
        console.log("ERROR, key does not exist");
      }
      return outputHashMap;
    case "KEYS":
      if (Object.keys(outputHashMap).length >= 1) {
        console.log(Object.keys(outputHashMap));
      } else {
        console.log("No keys to output");
      }
      return outputHashMap;
    case "REMOVE":
      if (outputHashMap.hasOwnProperty(key)) {
        if (outputHashMap[key].length < 2) {
          delete outputHashMap[key];
        } else {
          const oldValues = outputHashMap[key];
          const newValues = oldValues.filter(
            (value) => !values.includes(value)
          );
          outputHashMap[key] = newValues;
        }
      } else {
        console.log("ERROR, key does not exist");
      }
      return outputHashMap;
    case "REMOVEALL":
      if (outputHashMap.hasOwnProperty(key)) {
        delete outputHashMap[key];
      } else {
        console.log("ERROR, key does not exist");
      }
      return outputHashMap;
    case "CLEAR":
      outputHashMap = {};
      console.log("cleared");
      return outputHashMap;
    case "KEYEXISTS":
      outputHashMap.hasOwnProperty(key)
        ? console.log(true)
        : console.log(false);
      return outputHashMap;
    case "MEMBEREXISTS":
      if (outputHashMap.hasOwnProperty(key)) {
        let doesExist = false;
        values.forEach((value) => {
          outputHashMap[key].includes(value)
            ? (doesExist = true)
            : (doesExist = false);
        });
        console.log(doesExist);
      } else {
        console.log("ERROR, key does not exist");
      }
      return outputHashMap;
    case "ALLMEMBERS":
      if (Object.keys(outputHashMap).length > 1) {
        console.log(Object.values(outputHashMap));
      } else {
        console.log("(empty set)");
      }
      return outputHashMap;
    case "ITEMS":
      if (Object.keys(outputHashMap).length > 1) {
        console.log(Object.entries(outputHashMap));
      } else {
        console.log("(empty set)");
      }
      return outputHashMap;
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