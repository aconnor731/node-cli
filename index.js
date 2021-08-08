const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let outputHashMap = {}

// const recursiveFunction = (input) => {
//   // console.log(`I a citizen of ${country}`);
//   const arrInput = input.split(" ")
//   const command = arrInput[0]
//   const key = arrInput[1]
//   const values = arrInput.slice(2)
//   if (outputHashMap[key] !== undefined) {
//     const oldValues = outputHashMap[key]
//     outputHashMap[key] = oldValues.concat(values)
//   } else {
//     outputHashMap[key] = values
//   }
//   console.log(`Command: ${command}`)
//   console.log(`Key: ${key}`)
//   console.log(`Values: ${values}`)
//   console.log(outputHashMap)
//   // rl.close();
//   recursiveFunction(input)
// }

const handleInput = (input) => {
  const command = input.split(" ")[0]
  const key = input.split(" ")[1]
  const values = input.split(" ").slice(2)
  switch (command) {
    case "ADD":
      if (outputHashMap[key] !== undefined) {
        const oldValues = outputHashMap[key]
        outputHashMap[key] = oldValues.concat(values)
      } else {
        outputHashMap[key] = values
      }
      break;
    case "MEMBERS":
      if (outputHashMap[key] !== undefined) {
        console.log(outputHashMap[key])
      } else {
        console.log("ERROR, key does not exist")
      }
      break;
    case "KEYS":
      if (Object.keys(outputHashMap).length > 1) {
        console.log(Object.keys(outputHashMap))
      } else {
        console.log("No keys to output")
      }
      break;
    case "REMOVE":
      if (outputHashMap.hasOwnProperty(key)) {
        if (outputHashMap[key].length < 2) {
          delete outputHashMap[key]
        } else {
          const oldValues = outputHashMap[key]
          const newValues = oldValues.filter((value) => !values.includes(value))
          outputHashMap[key] = newValues
        }
      } else {
        console.log("ERROR, key does not exist")
      }
      break;
    case "REMOVEALL":
      if (outputHashMap.hasOwnProperty(key)) {
        delete outputHashMap[key]
      } else {
        console.log("ERROR, key does not exist")
      }
      break;
    case "CLEAR":
      outputHashMap = {}
      console.log("cleared")
      break;
    case "KEYEXISTS":
      outputHashMap.hasOwnProperty(key) ? console.log(true) : console.log(false)
      break;
    case "MEMBEREXISTS":
      if (outputHashMap.hasOwnProperty(key)) {
        let doesExist = false
        values.forEach((value) => {
          outputHashMap[key].includes(value) ? doesExist = true : doesExist = false
        })
        console.log(doesExist)
      } else {
        console.log("ERROR, key does not exist")
      }
      break;
    case "ALLMEMBERS":
      if (Object.keys(outputHashMap).length > 1) {
        console.log(Object.values(outputHashMap))
      } else {
        console.log("(empty set)")
      }
      break;
    case "ITEMS":
      if (Object.keys(outputHashMap).length > 1) {
        console.log(Object.entries(outputHashMap))
      } else {
        console.log("(empty set)")
      }
      break;
    default:
      return
  }
}

const recursiveAsyncReadLine = function () {
  rl.question('node-cli >', function (answer) {
    if (answer == 'exit') //we need some base case, for recursion
      return rl.close(); //closing RL and returning from function.
    // console.log(`Got it! Your answer was: ${answer}`);
    handleInput(answer)
    recursiveAsyncReadLine(); //Calling this function again to ask new question
  });
};

recursiveAsyncReadLine()

// const nodeCliQuestion = rl.question("node-cli >")
// const nodeCliQuestion = rl.question("node-cli >", (input) => recursiveFunction(input));

// rl.question("node-cli >", (input) => recursiveFunction(input));

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});
