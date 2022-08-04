// URL constant that is used in all requests
const BASE_URL = "http://localhost:3000/monsters";
let currentPage = 1;

// DOM element constants declared globally
const monsterContainer = document.getElementById("monster-container");
const formContainer = document.getElementById("create-monster");
let backButton = document.getElementById("back");
let forwardButton = document.getElementById("forward");

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
 * DOM representation for each monster. The monster div is then added to 
 * the DOM.
 */
const displayMonsterPage = monsters => {
    // Clear monster container before adding new monsters
    monsterContainer.textContent = null;

    // Iterate through each monster
    monsters.forEach(monster => {
        // Create each monster related element
        const monsterDiv = document.createElement("div");
        let monsterName = document.createElement("h2");
        let monsterAge = document.createElement("h4");
        let monsterDescription = document.createElement("p");

        /* Configure the elements based on the current monster 
         * during forEachiteration
         */
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

    // Adding name attributes to make event lookup easier
    nameInput.name = "mName";
    ageInput.name = "mAge";
    descriptionInput.name = "mDesc";

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

    // Add submit type event listener to the form
    monsterForm.addEventListener("submit", handleCreateNewMonster);

    // Append the form to the form container global variable
    formContainer.append(monsterForm);
};

/* Handles the form input values from the event and creates a JSON
 * representation of the monster */
const handleCreateNewMonster = e => {

    // No refresh on form submission
    e.preventDefault();

    /* Using the event, a new object is created to be submitted to the 
     * server. The properties referenced on the target property are the 
     * names that were created for the inputs on lines 87-89.
     */
    const newMonster = {
        name: e.target.mName.value,
        age: e.target.mAge.value,
        description: e.target.mDesc.value
    };

    /* call the function responsible for sending the post request with the
     * newly created monster as the argument
     */
    postMonster(newMonster);
};

/* This function takes a monster object as an argument, and makes a POST
 * request to the json-server with the monster as the request's body.
 */
const postMonster = monster => {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(monster)
    };

    /* Request to BASE_URL global variable, with the config object as the 
     * second argument to fetch()
     */
    fetch(BASE_URL, config)
};  

/* This function adds event listeners to both the back and forward buttons
 * given in the HTML. It uses a global stateful variable 'currentPage' to
 * know which page to request when the user clicks either button. You cannot
 * request a page lower than 1 or higher than 21 (so the newly created 
 * monsters are viewable via the client).
 */
const listenForPageChange = () => {
    back.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage -= 1;
            fetchMonstersFromPage(currentPage);
        };
    });
    
    forward.addEventListener('click', () => {
        if (currentPage < 21) {
            currentPage += 1;
            fetchMonstersFromPage(currentPage);
        };
    });
};

/* Main entry point to program. Each of the function calls in the body of
 * init happen on page load */
const init = () => {
    // Fetch first 50 monsters from server (page 1 of monsters)
    fetchMonstersFromPage(currentPage);
    // Create and append the new monster form
    createMonsterForm();
    // Attach event listener to back and forward buttons to change page
    listenForPageChange();
};

// Calling this function executes the program
init();

