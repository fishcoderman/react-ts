import { useEffect, useState, useCallback } from "react";
import Sub from "./Sub";
import { get } from "lodash";

const Dh = (props: { name: string }) => {
  const { name } = props;
  const [count, setCount] = useState<number>(10);
  const [num, setNum] = useState<number>(10);
  useEffect(() => {
    const obj = {
      name: {
        k: [{ l: 1 }, { l: 2 }],
      },
    };
    console.log("lodash", get(obj, "name.k3[2]", 456));
  }, []);
  const onchange1 = () => {
    setCount(count + 1);
  };
  const onchange2 = () => {
    setNum(num + 1);
  };
  const handle = () => {
    console.log("handle");
  };
  const cb = useCallback(() => {
    return handle();
  }, [count]);
  return (
    <div
      style={{ padding: 20, border: "1px solid #ccc", width: 500, height: 200 }}
    >
      <h4>{name}</h4>
      <button onClick={onchange1}>click count -- {count}</button>
      <button onClick={onchange2}>click num -- {num}</button>
      <Sub count={count} cb={cb}></Sub>
    </div>
  );
};

export default Dh;
