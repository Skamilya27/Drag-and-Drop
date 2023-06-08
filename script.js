window.addEventListener("DOMContentLoaded", (event) => {
  // Get references to the necessary elements
  const left = document.getElementById("left");
  const right = document.getElementById("right");
  const resetBtn = document.getElementById("resetBtn");

  // Add event listeners to items in the left container
  const items = left.getElementsByClassName("item");
  Array.from(items).forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
  });

  // Add event listeners to the right container
  right.addEventListener("dragover", dragOver);
  right.addEventListener("drop", drop);

  // Drag and drop functions
  let draggedItem = null;

  function dragStart(event) {
    draggedItem = this;
    // Add 'dragging' class to the dragged item
    setTimeout(() => {
      this.classList.add("dragging");
    }, 0);
  }

  function dragEnd(event) {
    // Remove 'dragging' class from the dragged item
    this.classList.remove("dragging");
  }

  function dragOver(event) {
    // Prevent default behavior to allow dropping
    event.preventDefault();
  }

  function drop(event) {
    // Prevent default behavior and move the dragged item to the right container
    event.preventDefault();
    right.appendChild(draggedItem);
    draggedItem = null;
    showSuccessMessage();
  }

  function showSuccessMessage() {
    // Create a success message element and add it to the right container
    const successMessage = document.createElement("div");
    successMessage.innerText = "Item dropped successfully!";
    successMessage.classList.add("success-message");
    successMessage.style.color = "#ADD7B5";
    successMessage.style.marginLeft = "50px";
    right.appendChild(successMessage);
    // Remove the success message after 2 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 2000);
  }

  // Reset button functionality
  resetBtn.addEventListener("click", () => {
    // Clear the right container and move items back to the left container
    right.innerHTML = "";
    Array.from(items).forEach((item) => {
      left.appendChild(item);
    });
  });
});
