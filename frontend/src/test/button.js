export default function Button({ title, index, clicked = (f) => f, selected }) {
  const btStyle1 = {
    background: "red",
  };

  const btStyle2 = {
    background: "blue",
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
