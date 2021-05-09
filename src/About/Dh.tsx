import { useEffect, useState, useRef } from "react";
import Sub from "./Sub";

const Dh = (props: { name: string }) => {
  const { name } = props;
  const inputElement = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState<number>(1);
  const [code, setCode] = useState("1");
  useEffect(() => {
    console.log("dh", name);
  }, []);

  const onchange = () => {
    // setCount(count + 1);
    const dom = inputElement.current!;
    dom.focus();
  };

  const onInputChange = (value: string) => {
    console.log("value", value);
    setCode(value);
  };
  return (
    <div
      style={{ padding: 20, border: "1px solid #ccc", width: 500, height: 200 }}
    >
      <h4>{name}</h4>
      <button onClick={onchange}>click me</button>
      <input
        ref={inputElement}
        type="number"
        placeholder="please enter you code"
        value={code}
        onChange={({ target: { value } }) => onInputChange(value)}
      />
      <Sub count={count} cb={() => {}}></Sub>
    </div>
  );
};

export default Dh;
