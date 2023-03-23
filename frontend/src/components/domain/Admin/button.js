export default function Button({ title, index, clicked = (f) => f, selected }) {
  const btStyle1 = {
    background: "var(--main-color)",
    border: "none",
    borderRadius: "10px",
    fontSize: "1.5em",
  };

  const btStyle2 = {
    background: "var(--soft-color)",
    border: "none",
    borderRadius: "10px",
    fontSize: "1.5em",
  };

  return (
    <button
      style={index == selected ? btStyle1 : btStyle2}
      onClick={() => clicked(index)}
    >
      {title}
    </button>
  );
}
