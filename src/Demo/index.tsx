import React, { useState, useEffect } from "react";
import { Divider } from "antd";
import Child from "./Child";
import style from "./ch.module.css";

const Demo = () => {
  const [status, setstatus] = useState<boolean>(true);
  const [num, setnum] = useState<number>(10);
  const [age, setage] = useState<number>(100);
  const toggle = () => {
    setstatus(!status);
  };
  return (
    <div style={{ margin: 10 }}>
      <button className={style.btn} onClick={toggle}>
        toggle-{String(status)}
      </button>
      <button className={style.btn} onClick={() => setage(age + 1)}>
        + age {age}
      </button>
      <button className={style.btn} onClick={() => setnum(num + 1)}>
        + num
      </button>
      <Divider></Divider>
      {status && <Child num={num}></Child>}
    </div>
  );
};

export default Demo;
