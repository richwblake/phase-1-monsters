// URL constant that is used in all requests
const BASE_URL = "http://localhost:3000/monsters";

// DOM element constants declared globally
const monsterContainer = document.getElementById("monster-container");
const formContainer = document.getElementById("create-monster");

/* This function fetches 50 monsters from the server. It then calls another
 * function that renders the monsters to the DOM. It takes a single
 * argument that allows the invoker to specify the page number. This is 
 * helpful for the page functionliaty later on
 */
const fetchMonstersFromPage = pageNumber => {
    /* String interpolation to incorperate the invoker's page number
     * in the request */
    fetch(BASE_URL + `/?_limit=50&_page=${pageNumber}`)
        .then(res => res.json())
        .then(json => displayMonsterPage(json))
};

/* This function iterates through an array of monsters, and creates a 
 * DOM representation for each monster. The DOM monster is then added to 
 * the DOM.
 */
const displayMonsterPage = monsters => {
    monsters.forEach(monster => {
        const monsterDiv = document.createElement("div");
        let monsterName = document.createElement("h2");
        let monsterAge = document.createElement("h4");
        let monsterDescription = document.createElement("p");

        monsterName.textContent = monster.name;
        monsterAge.textContent = monster.age;
        monsterDescription.textContent = monster.description;

        // Adding all monster DOM elements to a single monster container
        monsterDiv.append(monsterName, monsterAge, monsterDescription);

        /* Appending the single monster container to the main monster 
         * container */
        monsterContainer.append(monsterDiv);
    });
};

/* This function is responsible for creating the form to allow the user
 * to create a new monster. It takes no arguments, and is called on page
 * load in the init function. It creates all the necesary DOM elements for
 * the form, and then the new form is appended to the DOM.
 */
const createMonsterForm = () => {
    // Creates form and form header
    const monsterForm = document.createElement("form");
    const formTitle = document.createElement("h2");

    formTitle.textContent = "Create a new monster";

    /* These labels are optional. They're here just to illustrate that it's
     * possible to do so with Javascript, as forms should have at least
     * simple labels for their inputs
     */
    let nameLabel = document.createElement("label");
    let ageLabel = document.createElement("label");
    let descriptionLabel = document.createElement("label");

    nameLabel.textContent = "Name: ";
    ageLabel.textContent = "Age: ";
    descriptionLabel.textContent = "Description: ";

    // Creating form inputs for new monster
    let nameInput = document.createElement("input");
    let ageInput = document.createElement("input");
    let descriptionInput = document.createElement("input");

    // Submit button to create new monster
    let submitButton = document.createElement("button");

    submitButton.textContent = "Create Monster";

    /* Adding IDs for each input, as the 'for' attribute on the label 
    * element uses the ID to target a certain input
    */
    nameInput.id = "m-name";
    ageInput.id = "m-age";
    descriptionInput.id = "m-description";

    // Configuring 'for' attribute for each label
    nameLabel.htmlfor = nameInput.id;
    ageInput.htmlfor = ageInput.id;
    descriptionInput.htmlfor = descriptionInput.id;

    /* Append the form header, along with each pair of label and input. 
     * Also append the submit button to the form. 
     */
    monsterForm.append(formTitle);
    monsterForm.append(nameLabel, nameInput);
    monsterForm.append(ageLabel, ageInput);
    monsterForm.append(descriptionLabel, descriptionInput);
    monsterForm.append(submitButton);

    // Append the form to the form container global variable
    formContainer.append(monsterForm);
};


































/* Main entry point to program. Each of the function calls in the body of
* init happen on page load */
const init = () => {
    // Fetch first 50 monsters from server (page 1 of monsters)
    fetchMonstersFromPage(1);
    // Create and append the new monster form
    createMonsterForm();
};

// Calling this function executes the program
init();

