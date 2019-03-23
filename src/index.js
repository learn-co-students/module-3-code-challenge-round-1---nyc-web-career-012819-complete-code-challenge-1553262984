document.addEventListener('DOMContentLoaded', () => {
  const DOM = new Dom();
  DOM.addAllEventListeners();
  
  adapter.fetchImage()
    .then(attributes => {
      DOM.renderImage(new Image(attributes));
    });
})
