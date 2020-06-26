    // Get the modal
    const modal = document.querySelector("#hamburger__overlay");
    // Get the button that opens the modal
    const btn = document.querySelector("#menu__btn");
    // Get the <span> element that closes the modal
    const close = document.querySelector("#menu__close")[0];


    
    // When the user clicks the button, open the modal 
    btn.addEventListener("click", e => {
        modal.style.display = "flex";
    })
    
    // When the user clicks on <span> (x), close the modal
    // close.addEventListener("click", e => {
    //     modal.style.display = "none";
    // })
    
    modal.addEventListener("click", e => {
      if(e.target == modal) {
        modal.style.display = "none";
      }
  })
    // When the user clicks anywhere outside of the modal, close it
