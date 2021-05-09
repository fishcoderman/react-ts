import Item from "antd/lib/list/Item";

interface Info {
  name: string;
  (arg: string): number;
}
interface Item {
  name?: string;
}
const s = (p: Item) => {
  p.name?.length;
};
const demo = () => {
  const obj: Info = (arg: string): number => {
    return 123;
  };
  console.log("obj", obj);
};
export default () => {
  return 123;
};
