/*
 ************** Definir os principais objetos **************
 */
const addnote = document.querySelector("#add-note"); //Botão de para adicionar nota
let closeModal = document.querySelector("#close-modal"); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector("#modal"); //Modal para edição das notas
let modalView = document.querySelector("#modal-view"); //Modal para exibição dos detalhes da nota
let notes = document.querySelector("#notes"); //Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#btn-close-note"); //icone para fechar modal de edição de nota.
const editao = document.querySelector("#edicao-nota");
const lixo = document.querySelector("#lixo");

/*
 *********************** Eventos ***************************
 */
addnote.addEventListener("click", (evt) => {
  evt.preventDefault();
  modal.style.display = "block";
  notes.style.display = "none";
  addnote.style.display = "none";
});

btnCloseNote.addEventListener("click", (evt) => {
  evt.preventDefault();
  modal.style.display = "none";
  notes.style.display = "flex";
  addnote.style.display = "block";

  document.querySelector("#input-id").value = "";
  document.querySelector("#input-title").value = "";
  document.querySelector("#input-content").value = "";
  document.querySelector("#title-note").innerText = "";
  document.querySelector("#content-note").innerText = "";

  listNotes();
});

btnSaveNote.addEventListener("click", (evt) => {
  evt.preventDefault();

  let data = {
    id: document.querySelector("#input-id").value,
    title: document.querySelector("#input-title").value,
    content: document.querySelector("#input-content").value,
    lastTime: new Date().getTime(),
  };
  saveNote(data);
});

closeModal.addEventListener("click", (evt) => {
  evt.preventDefault();
  modalView.style.display = "none";
  notes.style.display = "flex";
  addnote.style.display = "block";
  document.querySelector("#title-note").innerText = "";
  document.querySelector("#content-note").innerText = "";
});

/*
 *********************** Funções ***************************
 */

const saveNote = (data) => {
  let notes = loadNotes();
  if (data.id.trim().length < 1) {
    data.id = new Date().getTime();
    document.querySelector("#input-id").value = data.id;
    notes.push(data);
  } else {
    notes.forEach((item, i) => {
      if (item.id == data.id) {
        notes[i] = data;
      }
    });
  }
  console.log(data);

  notes = JSON.stringify(notes);
  localStorage.setItem("notes", notes);
};

const listNotes = () => {
  let listNotes = loadNotes();
  console.log(notes);
  notes.innerHTML = "";



  listNotes.forEach((item) => {
    let divCard = document.createElement("div");
    divCard.className = "card";
    divCard.style.width = "25rem";
    divCard.style.border = "1px solid #ac5050";
    divCard.style.marginBottom = "5vh";
    divCard.style.marginTop = "2vh";
    divCard.style.marginLeft = "2vh";




    divCard.addEventListener("click", (evt) => {
      evt.preventDefault();
      showNote(item);
    });



    let divCardBody = document.createElement("div");
    divCardBody.style.color = "#000005";
    divCardBody.style.textAlign = "center";
    divCardBody.style.fontSize = "0.9vw";







    divCardBody.className = "card-body";

    let h1 = document.createElement("h1");
    h1.style.color = "#0d6efd";
    h1.style.fontSize = "3vw";


    h1.innerText = item.title;
    divCardBody.appendChild(h1);
    divCard.appendChild(divCardBody);










    let pContent = document.createElement("p");
    pContent.innerText = item.content;
    divCardBody.appendChild(pContent);
    let pLastTime = document.createElement("p");
    pLastTime.innerText =
      "Última edição: " + new Date(item.lastTime).toLocaleDateString("pt-BR");

    divCardBody.appendChild(pLastTime);

    notes.appendChild(divCard);
  });
};











const loadNotes = () => {
  let notes = localStorage.getItem("notes");
  if (!notes) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }
  return notes;
};

const showNote = (item) => {
  notes.style.display = "none";
  addnote.style.display = "none";
  modalView.style.display = "block";

  document.querySelector("#title-note").innerText = item.title;
  let pContent = document.createElement("p");
  pContent.innerText = item.content;
  document.querySelector("#content-note").appendChild(pContent);

  let pLastTime = document.createElement("p");
  pLastTime.innerText =
    "Última edição: " + new Date(item.lastTime).toLocaleDateString("pt-BR");
  document.querySelector("#content-note").appendChild(pLastTime);

  editao.addEventListener("click", (evt) => {
    evt.preventDefault();

    modal.style.display = "block";
    modalView.style.display = "none";

    let titlo = document.querySelector("#input-title");
    titlo.value = item.title;

    let conteudo = document.querySelector("#input-content");
    conteudo.value = item.content;

    let id = document.querySelector("#input-id");
    id.value = item.id;
  });

  lixo.addEventListener("click", (evt) => {
    evt.preventDefault();
  });
};

listNotes();
