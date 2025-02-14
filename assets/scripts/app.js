// Global Variables 
let author = "Author";
let title = "title";
let url = "";
let splittedAuthor = [];
let listPersons = [];
let date = '';
let boxReference = document.createElement('div');
let textReference = document.createElement('p');
const showReference = document.getElementById('form-container');

// Settings for element created
boxReference.classList.add('box-reference');
boxReference.id = 'box-reference-to-copy';
textReference.id = 'reference-text';
textReference.classList.add('config-reference')


// Functions to generate references

// Function to generate the reference (only works in YouTube Reference)
function referenceYouTube(){
    // Declare and assing data from imputs to variables title, author, channel, date and url, respectively
    title = getTittle();
    author = getAuthor();
    date = getDateInBox();
    url = getURL();
    let channel = document.getElementById('channel').value;

    // check if the imputs (title, channel, url) are empty.  Author and date, can be empty
    if (title === '' || channel === '' || url === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor llena todos los datos.",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
    } else {
        // Shwow the reference inside in a 'div' element
        printReference(`${(author === '' ? '' : author)} ${(author === '' ? channel.charAt(0).toUpperCase()+channel.slice(1)+'.' : '['+channel.charAt(0).toUpperCase()+channel.slice(1)+'].')} (${date}). ${title} [Video]. YouTube. ${url}`);
    }

    createButtonCopy();
    return;    
}

// Function to generate the reference (only works in Book Reference)
function referenceBook(){
    title = getTittle();
    author = getAuthor();
    date = new Date(document.getElementById('date').value).getFullYear();
    let edition = document.getElementById('edition').value;
    let editor = document.getElementById('editor').value;
    let country = document.getElementById('country').value;
    
    // check if the imputs (title, author, editor) are empty. Verify if date is not a number. Edition and Country, can be empty
    if (title === '' || author === '' || editor === '' || isNaN(date) ){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor llena todos los datos.",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
    } else {
        // Show the reference inside in a 'div' element
        printReference(
            `${author} (${date}). ${title} ${(edition === '' ? '': 'Edición '+ edition + '.')} 
            ${editor.charAt(0).toUpperCase() + editor.slice(1).toLowerCase() + '.'} ${(country === '' ? '' : country + '.')}`
        );
    }

    createButtonCopy();
    return;
}

// Function to generate the reference (only works in Newspaper Reference)
function referenceNewsPaper(){
    title = getTittle();
    author = getAuthor();
    date = getDateInBox();

    // Select the values in inputs that contains id: name-newspaper and pages
    let nameNewsPaper = document.getElementById('name-newspaper').value;
    let pages = document.getElementById('pages').value;

    // check if the imputs are empty. The imputs can't are empty
    if (title, author, nameNewsPaper, pages === '' || date === 's.f.'){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor llena todos los datos.",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
    } else {
        // Show the reference inside in a 'div' element
        printReference(`${author} (${date}). ${title} ${nameNewsPaper}. ${pages}`);
    }

    createButtonCopy();
    return;
}

// Function to generate the reference (only works in Website Reference)
function referenceWebSite(){
    title = getTittle();
    author = getAuthor();
    date = getDateInBox();
    url = getURL();
    let blog = document.getElementById('name-website').value;

    // check for the imputs are empty (tiitle and url). Author, date and blog, can are empty
    if (title === '' || url === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor llena todos los datos.",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
    } else {
        // Show the reference inside in a 'div' element
        printReference(`${author} (${date}). ${title} ${blog}. ${url}`);
    }

    createButtonCopy();
    return;
}

// Function to generate the reference (only works in PDF Reference)
function referencePDF(){
    title = getTittle();
    author = getAuthor();
    url = getURL();
    date = new Date(document.getElementById('date').value).getFullYear();
    
    // check for the imputs are empty (title and URL) Author and date can are empty
    if (title === '' || url === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor llena todos los datos.",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
    } else {
        printReference(`${author} (${(isNaN(date) ? 's.f.': date)}). ${title} ${url}`);
    }

    createButtonCopy();
    return;
}

// Function to generate the reference (only works in Podcast Reference)
function referencePodcast(){
    title = getTittle();
    date = getDateInBox();
    url = getURL();
    
    let episode = document.getElementById('episode').value;
    let namePodcast = document.getElementById('name-podcast').value;
    let producer = document.getElementById('producer').value;

    // check if the imputs are empty. The imputs can't are empty
    if (title, author, url, episode, namePodcast, producer === '' || date === 's.f.'){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor llena todos los datos.",
            // footer: '<a href="#">Why do I have this issue?</a>'  <-- disabled
          });
    } else {
        // Show the reference inside in a 'div' element
        printReference(
            `${getAuthor()} ${(listPersons.length > 1) ? '(Presentadores)' : '(Presentador)'} (${date}). ${title} 
            (Núm. ${episode}) [Episodio de pódcast de audio]. En ${namePodcast.charAt(0).toUpperCase()}${namePodcast.slice(1).toLowerCase()}. 
            ${producer}. ${url}`
        );
    }
    
    createButtonCopy();
    return;
}


/* ----- Funtions to get the input's values ------ */

// Function to save the persons in the list persons
function getAuthor(){
    const persons = document.querySelectorAll('#author');
    

    persons.forEach((input) => {
        let name = [];
        name.push(input.value);
        listPersons.push(name);

    });
    
    stringNames = listPersons.map(name => formatAuthor(name[0])).join(' & ');
    console.log(listPersons);
    return stringNames;
}

// Function to get the title
function getTittle(){
    title = document.getElementById('title').value;
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase() + '.';
}

// Function to get the URL
function getURL(){
    url = document.getElementById('url').value;
    return url;
}

// Function to get the date and format the date
function getDateInBox(){
    date = document.getElementById('date').value;
    if (date === ''){
        return 's.f.'
    } else {
        let monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

        // Declare variables day, month and year, assing data from date 
        let selectedDate = new Date(date);
        let day = String(selectedDate.getDate() + 1).padStart(2, '0');
        let month = monthNames[selectedDate.getMonth()];
        let year = selectedDate.getFullYear();

        // Formatting is set
        let formattedDate = `${year}, ${day} de ${month}`;
        return formattedDate;
    }
}


/* -------- Utilities -------- */ 

// Function to set the format to name author
function formatAuthor(author){
    splittedAuthor = author.split(' '); //Split the author and store in an array 
    if (author === ''){ // Check for if author is empty
        return '';
    } else {
        if (splittedAuthor.length > 1){
            return `${splittedAuthor[1].charAt(0).toUpperCase()}${splittedAuthor[1].slice(1)}, ${splittedAuthor[0].charAt(0).toUpperCase()}.`; // Show => Example, E.
        } else {
            return `${author.charAt(0).toLocaleUpperCase()}${author.slice(1)}.`; // Show Example.
        }
    }
}

// Function to add a person
function addPerson(textInLabel = 'Nueva Persona'){
    // First create the elements input and label
    let newImput = document.createElement('input');
    let newLabel = document.createElement('label');

    // Declare the attributes for the imput
    newImput.type = 'text';
    newImput.placeholder = 'Nombre de la persona agregada';
    newImput.classList.add('box-of-text');
    newImput.id = 'author';

    // Assing the value to the label
    newLabel.innerHTML = textInLabel;

    // Select the container in which it will be added the new elements
    // Select the default input, is use as reference
    const firstInput = document.querySelector('#author');

    // Check for the default input exist
    if (firstInput){
        firstInput.insertAdjacentElement('afterend', newImput);
        firstInput.insertAdjacentElement('afterend', newLabel);
    }

    return;
}

// Function to add and format the elements for create de box reference
function printReference( format = ``){
    // The function expects the forman expresed in template string as parameter
    // Show the reference inside in a 'div' element
    textReference.innerHTML = format;
    showReference.appendChild(boxReference); // Div enabled
    boxReference.appendChild(textReference); // Text enabled
}

// Function that use clipboard API, allows copy the text, and add to the clipboard
function copyToClipboard(){
    let textToCopy = document.getElementById('reference-text');
    navigator.clipboard.writeText(textToCopy.innerText);
    // When the copy button is clicked, show an alert, using the tool sweetalert2
    Swal.fire({
        icon: "success",
        title: "Copiado exitosamente!",
        showConfirmButton: false,
        timer: 1500
      });
    
    return;
}

// Function to create button with icon of copy to clipboard
function createButtonCopy() {
    let btnCopy = document.createElement('img');
    btnCopy.setAttribute('onclick', 'copyToClipboard();');
    btnCopy.src = '../../assets/img/icons/copy-light.svg';
    btnCopy.classList.add('button-copy');
    btnCopy.id = 'copy-btn';
    btnCopy.style.width = '25px';
    btnCopy.style.height = '25px';
    boxReference.appendChild(btnCopy);
}

// Function to clear the screen and inputs
function clearInputs(){
    showReference.removeChild(boxReference);

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input =>{
        input.value = '';
    });
    
}

