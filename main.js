let notesNumber = localStorage.length; // מספר הפתקים
let noteClass;

// connection to the dom

const titleNote = document.querySelector("#note-title");
const searchDateButton = document.getElementById("search_date");
const addNewNote = document.querySelector("#add_note");
const removeAll = document.querySelector("#exit");
const closePopupButton = document.getElementById('close-popup-btn');
const popup = document.getElementById('popup');

const addANote = document.getElementById('add_new_note');
const remove_btn = document.getElementById('remove_note');
const update_btn = document.getElementById('update_note');

const addTitleNote = document.getElementById("title_note");
const addTextNote = document.getElementById("text_note");
const notes = document.getElementById("notes");
const optionsSelect = document.getElementById("options");
const toRemoveAll = document.getElementById("remove_all");
const yesRemove = document.getElementById("yes_remove");
const deletionConfirmation = document.getElementById("deletion_confirmation");
const undelete = document.getElementById("undelete");
const noRemove = document.getElementById("no_remove");
const textRemove = document.getElementById("text_remove");

const userName = document.getElementById("user_name");
const toInput = document.getElementById("toInput");
const iconMainMobile = document.getElementById("main_mobile");
const dateNote = document.getElementById("note_date");
const checkNotes = document.getElementsByClassName("check_note");

// connection to the dom

removeAll.addEventListener("click", deleteAll);
searchDateButton.addEventListener("click", handleSearchByDateClick);


updateGreetingAndNoteDisplay();

function addNote(title, text, date, bk) {
  notesNumber++;
  const newNote = {
    id: notesNumber,
    title: title,
    text: text,
    date: date,
    bk: bk,
  };
  localStorage.setItem(`note${notesNumber}`, JSON.stringify(newNote));
  popup.style.display = 'none';
  addTitleNote.value = "";
  addTextNote.value = "";
  optionsSelect.selectedIndex = 0;
  updateGreetingAndNoteDisplay();
}

let selectedColor = "";

optionsSelect.addEventListener("change", function() {
  const selectedOption = optionsSelect.options[optionsSelect.selectedIndex];
  selectedColor = selectedOption.getAttribute("color") || "";
});

function addNewNoteFunction() {
  let addTitle = addTitleNote.value;
  let addText = addTextNote.value;

  addNote(addTitle, addText, dateNote.value, selectedColor);
  selectedColor = "";
}

addANote.addEventListener("click", addNewNoteFunction);

function deleteAll() {
  if (localStorage.length === 0) {
    toInput.style.display = "none";
    toRemoveAll.style.display = "block";
    textRemove.innerHTML = "There are no notes to delete";
    yesRemove.style.display = "none";
    noRemove.innerHTML = "ok";
    noRemove.addEventListener("click", () => {
      toRemoveAll.style.display = "none";
    });
  } else {
    toInput.style.display = "none";
    toRemoveAll.style.display = "block";
    textRemove.innerHTML = "delete all are you sure.";
    yesRemove.style.display = "block";
    noRemove.innerHTML = "no";
    noRemove.addEventListener("click", () => {
      toRemoveAll.style.display = "none";
    });
    yesRemove.addEventListener("click", () => {
      toRemoveAll.style.display = "none";
      notesNumber = 0;
      localStorage.clear();
      notes.innerHTML = "";
    });
  }
}

addNewNote.addEventListener("click", () => {
  popup.style.display = 'block';
  let today = new Date().toISOString().split("T")[0];
  dateNote.value = today;
});

closePopupButton.addEventListener('click', () => {
  popup.style.display = 'none';
});

userName.addEventListener("click", () => {
  toRemoveAll.style.display = "block";
  textRemove.textContent = "user name:";
  yesRemove.style.display = "none";
  toInput.style.display = 'block';
  toInput.style.margin = "10px 0 10px 0";
  noRemove.innerHTML = "save";
  noRemove.addEventListener("click", () => {
    const inputUserName = document.getElementById("inputUserName");
    const userNameValue = inputUserName.value;
    localStorage.setItem("user name", userNameValue);
    updateGreetingAndNoteDisplay();
    toRemoveAll.style.display = "none";
    inputUserName.value = "";
  });
});

function updateGreetingAndNoteDisplay() {
  const userNameValue = localStorage.getItem("user name");
  if (userNameValue) {
    const dateNow = new Date();
    const hourNow = dateNow.getHours();
    if (hourNow > 6 && hourNow < 12) {
      userName.innerHTML = `Good morning ${userNameValue}`;
    } else if (hourNow > 12 && hourNow < 18) {
      userName.innerHTML = `Good afternoon ${userNameValue}`;
    } else {
      userName.innerHTML = `Good night ${userNameValue}`;
    }
  }

  notes.textContent = "";
  try {
    for (let i = 0; i < localStorage.length + 1; i++) {
      let noteNumber = `note${i}`;
      let noteData = localStorage.getItem(noteNumber);

      if (noteData) {
        let note = JSON.parse(noteData);
        let newDiv = document.createElement("div");
        newDiv.className = "note";
        newDiv.style.background = `#${note.bk}`;
        newDiv.id = noteNumber;
        newDiv.innerHTML = `
          <input id="${noteNumber}" class="check_note" type="checkbox"/>
          <h3 class="note-title">${note.title}</h3>
          <div style="max-height: 7em; overflow-y: auto;">
            <p class="note-text" style="white-space: pre-wrap; max-width: 24ch; overflow-wrap: break-word;">${note.text.replace(/\n/g, '<br>')}</p>
          </div>
          <h4 class="note-date">${note.date}</h4>
        `;
        notes.appendChild(newDiv);
      }
    }
  } catch (error) {
    console.error("An error occurred while loading notes:", error);
  }
}

remove_btn.addEventListener('click', () => {
  const message = document.getElementById('message_delete');
  if (localStorage.length === 0){   
        message.style.display = 'block';
        setTimeout(function() {
            message.style.display = 'none';
        }, 2000);
  } else {
    message.textContent = "Confirm the notes you want to delete";
    message.style.display = 'block';
        setTimeout(function() {
            message.style.display = 'none';
        }, 2000);
    for (let i = 0; i < checkNotes.length; i++) {
      const checkNoteOuter = checkNotes[i];
      checkNoteOuter.style.display = "block";
    }
  
  
    deletionConfirmation.style.display = "block";
    undelete.style.display = "block";
    remove_btn.style.display = "none";
    undelete.addEventListener("click", () => {
      deletionConfirmation.style.display = "none";
      undelete.style.display = "none";
      remove_btn.style.display = "block";
    })
    deletionConfirmation.addEventListener("click", () => {
      deletionConfirmation.style.display = "none";
      undelete.style.display = "none";
      remove_btn.style.display = "block";
      for (let u = 0; u < localStorage.length; u++) {
        const checkNoteInner = checkNotes[u];
        if (checkNoteInner.checked) {
          localStorage.removeItem(checkNoteInner.id);
          updateGreetingAndNoteDisplay();
          notesNumber--;
        }
      }
    })
  }
  
});

const searchInput = document.getElementById('search_input');

searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase();
  filterNotes(searchText);
});

function filterNotes(searchText) {
  notes.textContent = '';
  try {
    for (let i = 0; i < localStorage.length + 1; i++) {
      let noteNumber = `note${i}`;
      let noteData = localStorage.getItem(noteNumber);

      if (noteData) {
        let note = JSON.parse(noteData);
        if (note.title.toLowerCase().includes(searchText) ||
          note.text.toLowerCase().includes(searchText)) {
            let newDiv = document.createElement("div");
            newDiv.className = "note";
            newDiv.style.background = `#${note.bk}`;
            newDiv.id = noteNumber;
            newDiv.innerHTML = `
              <input id="${noteNumber}" class="check_note" type="checkbox"/>
              <h3 class="note-title">${note.title}</h3>
              <div style="max-height: 7em; overflow-y: auto;">
                <p class="note-text" style="white-space: pre-wrap; max-width: 24ch; overflow-wrap: break-word;">${note.text.replace(/\n/g, '<br>')}</p>
              </div>
              <h4 class="note-date">${note.date}</h4>
            `;

            notes.appendChild(newDiv);

        }
      }
    }
  } catch (e) {
    console.error('Error parsing note:', e);
  };
};


function handleSearchByDateClick() {
  const searchDate = searchInput.value;
  if (searchDate) {
    searchNotesByDate(searchDate);
  } else {
    alert("Enter a date (YYYY-MM-DD) in the search box");
  }
}

function searchNotesByDate(date) {
  notes.textContent = '';
  try {
    for (let i = 0; i < localStorage.length + 1; i++) {
      let noteNumber = `note${i}`;
      let noteData = localStorage.getItem(noteNumber);

      if (noteData) {
        let note = JSON.parse(noteData);
        if (note.date === date) {
          let newDiv = document.createElement("div");
          newDiv.className = "note";
          newDiv.style.background = `#${note.bk}`;
          newDiv.id = noteNumber;
          newDiv.innerHTML = `
            <input id="${noteNumber}" class="check_note" type="checkbox"/>
            <h3 class="note-title">${note.title}</h3>
            <div style="max-height: 7em; overflow-y: auto;">
              <p class="note-text" style="white-space: pre-wrap; max-width: 24ch; overflow-wrap: break-word;">${note.text.replace(/\n/g, '<br>')}</p>
            </div>
            <h4 class="note-date">${note.date}</h4>
          `;

          notes.appendChild(newDiv);
        }
      }
    }
  } catch (e) {
    console.error('Error parsing note:', e);
  }
}
