import React, { useEffect, useState, useRef } from "react";

const Dh = (props: { count: number; cb: () => void }) => {
  const { count, cb } = props;
  const [state, setstate] = useState(10);
  const ref = useRef<Number>(state);
  useEffect(() => {
    console.log("sub", count);
  }, []);

  const show = () => {};

  useEffect(() => {
    ref.current = state;
  });

  console.log("ref", ref.current);

  return (
    <div style={{ padding: 20, border: "1px solid #ccc" }}>
      <h4 onClick={cb}>{count}</h4>
      <hr></hr>
      <h1>state: {state}</h1>
      <button onClick={() => setstate(state + 1)}>btnClick</button>
      <button onClick={show}>show</button>
    </div>
  );
};

export default React.memo(Dh);
