var generateBtn = document.querySelector("#generate");
// individual arrays of characters that share a certain type
var specialCharacters = [
  "@", "%", "+", "\\", "/", "'", "!", "#", "$", "^", "?", ":", ",", ")", "(", "}", "{", "]", "[", "~", "-", "_", "."
];
var numberCharacters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
var upperCasedCharacters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];
var lowerCasedCharacters = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];
// prompt that asks user the length of their desired password and makes it be between 8 and 128 characters
function passwordOptions() {
  var userInput = prompt("How many characters would you like in your password?");

  if (userInput === null) {
    // User canceled the prompt
    return null;
  }

  userInput = parseInt(userInput);

  if (isNaN(userInput) || userInput < 8 || userInput > 128) {
    alert("Please enter a valid number between 8 and 128.");
    return passwordOptions();
  }
//sends the user a ok, cancel box that asks what all they want inside their password
  var confirmSpecialCharacters = confirm("Do you want to include special characters?");
  var confirmNumberCharacters = confirm("Do you want to include numbers?");
  var confirmUppercaseCharacters = confirm("Do you want to include uppercase characters?");
  var confirmLowercaseCharacters = confirm("Do you want to include lowercase characters?");
// an if statement saying they must choose at least one option
  if (
    !confirmSpecialCharacters &&
    !confirmNumberCharacters &&
    !confirmUppercaseCharacters &&
    !confirmLowercaseCharacters
  ) {
    alert("You must select at least one character type.");
    return passwordOptions();
  }

  return [
    userInput,
    confirmLowercaseCharacters,
    confirmNumberCharacters,
    confirmSpecialCharacters,
    confirmUppercaseCharacters
  ];
}
//does the randomization of characters * the length of the password the user selects
function getRandomPassword(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function generate() {
  var options = passwordOptions();

  if (!options) {
    return null;
  }
  //makes the options match the order in which the user selects yes or no to the password criteria
  var length = options[0];
  var hasLowercaseCharacters = options[1];
  var hasNumberCharacters = options[2];
  var hasSpecialCharacters = options[3];
  var hasUppercaseCharacters = options[4];

  var possiblePassword = [];
// a concat function that will string one character after another once user selects criteria
  if (hasSpecialCharacters) {
    possiblePassword = possiblePassword.concat(specialCharacters);
  }
  if (hasNumberCharacters) {
    possiblePassword = possiblePassword.concat(numberCharacters);
  }
  if (hasUppercaseCharacters) {
    possiblePassword = possiblePassword.concat(upperCasedCharacters);
  }
  if (hasLowercaseCharacters) {
    possiblePassword = possiblePassword.concat(lowerCasedCharacters);
  }

  var passwordResults = [];

  for (let i = 0; i < length; i++) {
    var randomCharacter = getRandomPassword(possiblePassword);
    passwordResults.push(randomCharacter);
  }
//combine the arrays with the characters together and return the final result
  var finalPassword = passwordResults.join("");
  console.log(finalPassword);
  return finalPassword;
}
// display the final password to the user
function writePassword() {
  var password = generate();
  if (password !== null) {
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
  }
}
//a call of a function when the generate button is clicked
generateBtn.addEventListener("click", writePassword);

// GIVEN I need a new, secure password
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria

// WHEN prompted for password criteria
// THEN I select which criteria to include in the password

// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters

// WHEN asked for character types to include in the password
// THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters

// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
//minimum selection required is 1 input true

// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria

// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page
