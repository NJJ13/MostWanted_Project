"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults = people;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
  while(true){
  searchResults = filterDetails(searchResults);
  let moreInfo = promptFor("Do you have anymore information? Enter 'yes' or 'no'", yesNo).toLowerCase();
  if(moreInfo === "no"){
    break;
  }
  }
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }

  if(searchResults.length < 1){
    prompt("This search resulted in " + searchResults.length + " results. Please try again.")
    let restart = promptFor("Search again? Enter 'yes' or 'no'", yesNo).toLowerCase();
    if(restart === "yes"){
      app(people);
    }
  }
  else if (searchResults.length > 1){
    prompt("This search resulted in " + searchResults.length + " results. Here are the people that match the criteria")
    displayPeople(searchResults);
    let restart = promptFor("Search again? Enter 'yes' or 'no'", yesNo).toLowerCase();
    if(restart === "yes"){
      let useSameResults = promptFor("Would you like to continue filtering the same results? Enter 'yes' or 'no'", yesNo).toLowerCase();
      if(useSameResults === "yes"){
        app(searchResults)
      }
      else if(useSameResults === "no"){
        app(people)
      }
    }
  }
  else{
    searchResults = searchResults[0];
    // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
    mainMenu(searchResults, people);
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    var family = []
    Family(person, people, family);
    DisplayFamilyMembers(family);
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
function Family(person, people, family){
  Siblings(person, people, family)
  Parents(person, people, family)
  Spouse(person, people, family)
  return family;
}
function Siblings(person, people, family){
  let siblings;
  if(person.parents != null){
    for(let i = 0; i < person.parents.length; i++ ){
      siblings = people.filter(function(el){
        if(el.parents.includes(person.parents[i]) && el.id !== person.id){
          return true;
        }
        else{
          return false;
        }
      })
    }
  }
  if(siblings != null){
    for(let i = 0; i < siblings.length; i++){
      siblings[i].relation = "Sibling";
      family.push(siblings[i]);
    }
  }
  return family;
}
function Parents(person, people, family){
  let parents = [];
  parents = people.filter(function(el){
    if(person.parents != null){
      if(person.parents.includes(el.id)){
        return true;
      }
      else{
        return false;
      }
    }
  })
  if(parents != null){
    for(let i = 0; i < parents.length; i++){
      parents[i].relation = "Parent";
      family.push(parents[i]);
    }
  }
  return family;
}
function Spouse(person, people, family){
  let spouse;
  spouse = people.filter(function(el){
    if(person.currentSpouse != null){
       if(person.currentSpouse == el.id){
         return true;
       }
       else{
         return false;
       }
    }
  })
  if(spouse != null){
    for(let i = 0; i < spouse.length; i++){
      spouse[i].relation = "Spouse";
      family.push(spouse[i]);
    }
  }
  return family;
}
function displayFamilyMembers(people){
  if(people.length != 0){
    alert(people.map(function(person){
      return person.firstName + " " + person.lastName + ", " + person.relation;
    }).join("\n"));
  }
  else{
    alert("This person doesn't have an immediate family.");
  }
}
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

function searchByGender(people){
  let gender = promptFor("What is the person's gender?", chars).toLowerCase();

  let filterByGender = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  return filterByGender;
}

function searchByDateOfBirth(people){
  let dateOfBirth = promptFor("What is the person's date of birth? (MM/DD/YYYY)", chars);

  let filterByDateOfBirth = people.filter(function(person){
    if(Date.parse(person.dob) === Date.parse(dateOfBirth)){ 
      return true;
    }
    else{
      return false;
    }
  })
  return filterByDateOfBirth;
}

function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", chars).toLowerCase();
  
  let filterByEyeColor = people.filter(function(person){
    if(person.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  return filterByEyeColor;
}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation?", chars).toLowerCase();
  
  let filterByOccupation = people.filter(function(person){
    if(person.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  return filterByOccupation;
}

function searchByHeight(people){
  let height = parseInt(promptFor("What is the person's height in inches?", chars))

  let filterByHeight = people.filter(function(person){
    if(person.height === height){
      return true;
    }
    else{
      return false;
    }
  })
  return filterByHeight;
}
function searchByWeight(people){
  let weight = parseInt(promptFor("What is the person's weight in pounds?", chars))

  let filterByWeight = people.filter(function(person){
    if(person.weight === weight){
      return true;
    }
    else{
      return false;
    }
  })
  return filterByWeight;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current Spouse: " + person.currentSpouse + "\n"; 
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function filterDetails(searchResults){
  let searchType = promptFor("What would you like to search by? Enter one : 'gender', 'date of birth', 'height', 'weight', 'eye color', 'occupation'", chars).toLowerCase();
    if(searchType === "gender"){
      searchResults = searchByGender(searchResults);
    }
    else if(searchType === "date of birth"){
      searchResults = searchByDateOfBirth(searchResults);
    }
    else if(searchType == "height"){
      searchResults = searchByHeight(searchResults);
    }
    else if(searchType == "weight"){
      searchResults = searchByWeight(searchResults);
    }
    else if(searchType == "eye color"){
      searchResults = searchByEyeColor(searchResults);
    }
    else if(searchType == "occupation"){
      searchResults = searchByOccupation(searchResults);
    }
    return searchResults;
}