document.addEventListener('DOMContentLoaded', () => {
  const DOM = new Dom();
  DOM.addAllEventListeners();

  let image;
  
  adapter.fetchImage()
    .then(attributes => {
      image = new Image(attributes)
      DOM.renderImage(image);
    });

})
