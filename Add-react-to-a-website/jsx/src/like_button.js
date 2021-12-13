const useState = React.useState;
const e = React.createElement;

function LikeButton({ commentId }) {
  const [liked, setLiked] = useState(false);

  if (liked) {
    return commentId
      ? `You liked comment number ${commentId}`
      : "You liked this.";
  }

  return <button onClick={() => setLiked(true)}>Like</button>;
}

ReactDOM.render(
  <LikeButton />,
  document.getElementById("like_button_container")
);
