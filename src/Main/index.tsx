import { FC, useState } from "react";
import { Button } from "antd";

// const loads = <T>(name: T):T[] => {
//   return [name];
// }

const getKeys = <T, K extends keyof T>(obj: T, keys: K[]): T[K][] => {
  return keys.map((key) => obj[key]);
};

let keys: Array<number | string> = getKeys({ name: "jack", age: 18 }, ["name"]);
console.log("keys", keys);

const Main: FC = () => {
  const [state, setState] = useState<number>(10);
  const handleClick = () => {
    setState(state + 1);
  };
  return (
    <div>
      <h4>{state}</h4>
      <Button onClick={handleClick}></Button>
    </div>
  );
};

export default Main;
