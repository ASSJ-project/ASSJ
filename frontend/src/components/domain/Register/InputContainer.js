export default function InputContainer({ ...props }) {
  return (
    <>
      <p className="text_box">{props.title}</p>
      <input
        className="total_input"
        placeholder={props.placeHolder}
        type={props.type}
        onChange={(e) => props.change(e.target.value)}
        onClick={(e) => props.click(e)}
        id={props.id}
      />
    </>
  );
}
