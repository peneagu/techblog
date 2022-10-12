const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment-box-input').value.trim();
    const post = document.querySelector('.post-container');
    const post_id = post.getAttribute('data-post-id');
  
    if (comment && post_id) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  document
  .querySelector('.comment-form')
  .addEventListener('submit', newCommentHandler);