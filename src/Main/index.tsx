import { FC, useState } from "react";
import { Button } from "antd";

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
