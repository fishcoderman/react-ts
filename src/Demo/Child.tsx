import React, { memo, useState, useEffect, useRef } from "react";
import demo from "./demo";
import jack from "ut";
console.log("name", jack);
demo();

const Child = (props: { num: number }) => {
  const { num } = props;
  const [count, setCount] = useState<number>(0);
  const ref = useRef(100);

  useEffect(() => {
    // console.log('useEffect', count)
    return () => {
      console.log("unmont", ref.current);
    };
  }, []);
  const add = () => {
    ref.current = ref.current + 1;
    console.log("current", ref.current);
    // setCount(count + 1);
  };
  return (
    <div style={{ border: "1px solid #ccc", padding: 10 }}>
      {console.log("child render")}
      <h1>child</h1>
      <h4>{count}</h4>
      <h4>
        num:{num}-ref: {ref.current}
      </h4>
      <button onClick={add}>+ count</button>
    </div>
  );
};

export default memo(Child);
