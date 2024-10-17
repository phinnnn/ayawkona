const canvas = document.getElementById('canvas');
const addTextButton = document.getElementById('addTextButton');
const fontSizeInput = document.getElementById('fontSize');
const fontFamilySelect = document.getElementById('fontFamily');
const fontColorInput = document.getElementById('fontColor');
const imageUploadInput = document.getElementById('imageUpload');

let selectedElement = null;

// Function to add a new text element
function addTextElement() {
  const textElement = document.createElement('div');
  textElement.contentEditable = true; // Allows the user to edit the text
  textElement.classList.add('text-element');
  textElement.innerText = 'Edit this text';

  // Position the text element at a default location
  textElement.style.left = '50px';
  textElement.style.top = '50px';

  // Make the text element selectable
  textElement.addEventListener('click', () => selectElement(textElement));

  canvas.appendChild(textElement);
  makeElementDraggable(textElement);
}

// Function to make an element draggable
function makeElementDraggable(element) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  element.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    selectElement(element);
  });

  document.addEventListener('mousemove', function (e) {
    if (isDragging) {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });
}

// Function to select an element for styling
function selectElement(element) {
  selectedElement = element;
  updateToolbar();
}

// Update toolbar values based on the selected element
function updateToolbar() {
  if (selectedElement) {
    fontSizeInput.value = parseInt(window.getComputedStyle(selectedElement).fontSize);
    fontFamilySelect.value = window.getComputedStyle(selectedElement).fontFamily;
    fontColorInput.value = window.getComputedStyle(selectedElement).color;
  }
}

// Change font size of the selected element
fontSizeInput.addEventListener('input', function () {
  if (selectedElement) {
    selectedElement.style.fontSize = `${fontSizeInput.value}px`;
  }
});

// Change font family of the selected element
fontFamilySelect.addEventListener('change', function () {
  if (selectedElement) {
    selectedElement.style.fontFamily = fontFamilySelect.value;
  }
});

// Change font color of the selected element
fontColorInput.addEventListener('input', function () {
  if (selectedElement) {
    selectedElement.style.color = fontColorInput.value;
  }
});

// Function to handle image upload and display it on the canvas
imageUploadInput.addEventListener('change', function () {
  const file = imageUploadInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const imageElement = document.createElement('img');
    imageElement.src = e.target.result;
    imageElement.classList.add('image-element');
    imageElement.style.left = '50px';
    imageElement.style.top = '50px';

    // Make the image draggable
    makeElementDraggable(imageElement);
    canvas.appendChild(imageElement);
  };

  reader.readAsDataURL(file);
});

// Event listener for adding new text element
addTextButton.addEventListener('click', addTextElement);

function myMenuFunction() {
  var i = document.getElementById("navMenu");
  if(i.className === "nav-menu") {
      i.className += " responsive";
  } else {
      i.className = "nav-menu";
  }
 }
 var a = document.getElementById("loginBtn");
 var b = document.getElementById("registerBtn");
 var x = document.getElementById("login");
 var y = document.getElementById("register");
 function login() {
     x.style.left = "4px";
     y.style.right = "-520px";
     a.className += " white-btn";
     b.className = "btn";
     x.style.opacity = 1;
     y.style.opacity = 0;
 }
 function register() {
     x.style.left = "-510px";
     y.style.right = "5px";
     a.className = "btn";
     b.className += " white-btn";
     x.style.opacity = 0;
     y.style.opacity = 1;
 }