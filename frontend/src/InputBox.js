export default function InputBox({ text, inputText = (f) => f }) {
  return (
    <>
      <span>{text} </span>
      <input
        type="text"
        className="input"
        onChange={(e) => {
          inputText(e.target.value);
        }}
      />
    </>
  );
}
