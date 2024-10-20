const canvas = document.getElementById('canvas');
const addTextButton = document.getElementById('addTextButton');
const fontSizeInput = document.getElementById('fontSize');
const fontFamilySelect = document.getElementById('fontFamily');
const fontColorInput = document.getElementById('fontColor');
const imageUploadInput = document.getElementById('imageUpload');
const deleteButton = document.getElementById('deleteButton');

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

    // Make the text element selectable and draggable
    textElement.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent canvas click
        selectElement(textElement);
    });
    makeElementDraggable(textElement);

    canvas.appendChild(textElement);
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
    deleteButton.style.display = 'inline'; // Show delete button
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

// Function to handle image upload and display them on the canvas
imageUploadInput.addEventListener('change', function () {
    const files = Array.from(imageUploadInput.files); // Get all selected files
    
    files.forEach(file => { // Process each file
        const reader = new FileReader();

        reader.onload = function (e) {
            const imageElement = document.createElement('div');
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('image-element');
            img.style.left = '50px'; // Default position
            img.style.top = '50px'; // Default position

            // Create a resize handle
            const resizeHandle = document.createElement('div');
            resizeHandle.classList.add('image-resize-handle');
            imageElement.appendChild(img);
            imageElement.appendChild(resizeHandle);
            imageElement.classList.add('image-container');
            
            // Make the image draggable
            imageElement.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent canvas click
                selectElement(imageElement);
            });

            // Enable resizing
            makeElementDraggable(imageElement);
            canvas.appendChild(imageElement);
            
            // Resizing functionality
            makeResizable(resizeHandle, img, imageElement);
        };

        reader.readAsDataURL(file);
    });
});

// Function to make elements resizable
function makeResizable(resizeHandle, img, container) {
    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    resizeHandle.addEventListener('mousedown', function (e) {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(container).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(container).height, 10);
        e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
        if (isResizing) {
            const newWidth = startWidth + (e.clientX - startX);
            const newHeight = startHeight + (e.clientY - startY);
            container.style.width = newWidth + 'px';
            container.style.height = newHeight + 'px';
            img.style.width = '100%'; // Ensure image fills the container
            img.style.height = 'auto'; // Maintain aspect ratio
        }
    });

    document.addEventListener('mouseup', function () {
        isResizing = false;
    });
}

// Event listener for adding new text element
addTextButton.addEventListener('click', addTextElement);

// Event listener for deleting the selected element
deleteButton.addEventListener('click', function () {
    if (selectedElement) {
        selectedElement.remove();
        selectedElement = null;
        deleteButton.style.display = 'none'; // Hide delete button
    }
});
