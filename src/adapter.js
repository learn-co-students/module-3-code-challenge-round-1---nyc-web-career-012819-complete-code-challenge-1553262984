const adapter = (function() {
  const IMAGE_ID = 2257; //Enter the id from the fetched image here
  const API_URL = 'https://randopic.herokuapp.com';

  return {
    fetchImage: function() {
      return fetch(`${API_URL}/images/${IMAGE_ID}`)
        .then(response => response.json());
    },
    incrementLikeCount: function(IMAGE_ID) {
      return fetch(`${API_URL}/likes/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_id: IMAGE_ID })
      });
    },
    postComment: function(attributes) {
      return fetch(`${API_URL}/comments/`, {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(attributes)
      });
    },
    deleteComment: function(commentId) {
      return fetch(`${API_URL}/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
    }
  };
})();