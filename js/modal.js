    // Get the modal
    const modal = document.getElementsByClassName("hamburger__overlay");
    // Get the button that opens the modal
    const btn = document.getElementsByClassName("menu__btn");
    // Get the <span> element that closes the modal
    const close = document.getElementsByClassName("hamburger__close")[0];


    
    // When the user clicks the button, open the modal 
    btn.addEventListener("click", e => {
        modal.style.display = "flex";
    })
    
    // When the user clicks on <span> (x), close the modal
    close.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }