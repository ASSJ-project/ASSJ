import "./test.css";
import Button from "./button";
export default function Test() {
  const [index, setIndex] = useState(0);

  const tab = [
    {
      tabTitle: (
        <Button
          title="1번탭"
          index={0}
          clicked={(index) => setIndex(index)}
          selected={index}
        />
      ),
      tabContent: <div> 탭 내용1 </div>,
      index: 0,
    },

    {
      tabTitle: (
        <Button
          title="2번탭"
          index={1}
          clicked={(index) => setIndex(index)}
          selected={index}
        />
      ),
      tabContent: <div> 탭 내용2 </div>,
      index: 1,
    },
    {
      tabTitle: (
        <Button
          title="3번탭"
          index={2}
          clicked={(index) => setIndex(index)}
          selected={index}
        />
      ),
      tabContent: <div> 탭 내용3 </div>,
      index: 2,
    },
  ];

  return (
    <>
      <div>{tab.map((item, index) => item.tabTitle)}</div>
      <div>{tab[index].tabContent}</div>
      {/* <div className="testcontainer">
        <div className="box">
          <InputBox text="email" inputText={(email) => setEmail(email)} />
        </div>
        <div className="box">
          <InputBox text="password" inputText={(pw) => setPw(pw)} />
        </div>
        <div className="box">
          <InputBox text="address" inputText={(addr) => setAddr(addr)} />
        </div>
        <div className="box">
          <InputBox text="name" inputText={(name) => setName(name)} />
        </div>
        <Register /> */}

      {/* <button onClick={() => findPassword(email)}>이메일체크</button> */}
      {/* {accessToken ? <Logout /> : <Login />} */}
      {/* <button onClick={() => registerDo(email, pw, add)}>회원가입</button> */}
      {/* <p>{email}</p> */}
      {/* <p>{inDB}</p> */}
      {/* <p>{pw}</p>
        <p>{add}</p> */}
      {/* </div> */}
    </>
  );
}
