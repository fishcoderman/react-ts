import { useState } from "react";
import { Button } from "antd";

import { ExchangeTypeMap } from "./test";

const data = ExchangeTypeMap[1];

interface MainPros {
  type: string | undefined;
}

interface Obj {
  name: string;
  age: number;
}

const getKeys = <T, K extends keyof T>(obj: T, keys: K[]): T[K][] => {
  return keys.map((key) => obj[key]);
};

let keys: Array<number | string> = getKeys({ name: "jack", age: 18 }, ["name"]);

type Arr = [number, string];

type Kl<T> = {
  [K in keyof T]: Promise<T[K]>;
};

const ddd: Kl<Arr> = [new Promise((r) => r(1)), new Promise((r) => r("1"))];

type All = "name" | "2";

class Counter {
  constructor(public count: number) {}
  add(value: number) {
    this.count += value;
    return this;
  }
  subtract(value: number) {
    this.count -= value;
    return this;
  }
}

class SuperCounter extends Counter {
  constructor(public count: number) {
    super(count);
  }
  power(value: number) {
    this.count = this.count ** value;
    return this;
  }
}

const intance = new SuperCounter(2);
const res = intance.add(3).subtract(2).power(2);
console.log("res", res);

const Main = (props: MainPros) => {
  let [count, setCount] = useState<number>(0);
  let { type } = props;
  return (
    <div>
      <Button type="ghost" onClick={() => setCount(++count)}>
        {type}
      </Button>
    </div>
  );
};

export default Main;
