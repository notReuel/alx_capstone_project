const username = document.getElementById('username');
const modal = document.getElementById('regModal');
const regBtn = document.getElementById('regBtn')
const closeModal = document.getElementsByClassName('close')[0];
const modalForm = document.getElementById('modal-form')
const saveNameBtn = document.getElementById('saveNameBtn');


// ==== MODAL POP UP
// when the start quiz button is clicked open the modal
regBtn.onclick = function() {
    modal.style.display = "block"
}

//close modal when user click 'x'
closeModal.onclick = function() {
    modal.style.display = "none"
}

// close when user clicks outside the modal box
window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
}


// ====== MODAL FORM
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = username.value;

    // const playerName = {
    //     Name: name,
    // };

    // console.log(playerName)
    // savePlayerName(playerName);
    savePlayerName(name)
});

// KEEP SUBMIT BUTTON DISABLED WHILE FORM IS EMPTY
username.addEventListener('keyup', () => {
    //keep button dissabled if username is empty
    saveNameBtn.disabled = !username.value
});

// Save player name to local storage
function savePlayerName (name) {
    // const key = playerName.Name;
    localStorage.setItem('mostRecentPlayer', JSON.stringify(name));

    // console.log(key)
    // let storedPlayerNames = localStorage.getItem('playerName');
    // if (!storedPlayerNames) {
    //     storedPlayerNames = []
    // } else {
    //     storedPlayerNames = JSON.parse(storedPlayerNames)
    // }
    // // const storedPlayerNames = localStorage.getItem('playerName') || [];
    // // console.log(localStorage.getItem('playerName'))
    // storedPlayerNames.push(playerName);

    // localStorage.setItem('playerName', JSON.stringify(storedPlayerNames));
    // console.log(storedPlayerNames)
    username.value =  ""

    window.location.assign("/quiz.html")
}

// saveName = e => {
//     // const name = formData.get("username")
//     console.log(`${username.value}, clicked the save button!`);
//     e.preventDefault();

//     localStorage.setItem("name", username.value)
// };

// saveName = e => {
//     console.log('You clicked submit')
// }

