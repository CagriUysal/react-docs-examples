document.querySelectorAll(".like_button_container").forEach((domContainer) => {
  const commentId = parseInt(domContainer.dataset.commentid);
  console.log(commentId);

  ReactDOM.render(e(LikeButton, { commentId }), domContainer);
});
