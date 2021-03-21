import { FC, useState, useEffect } from 'react';
import { Button } from 'antd';

interface Info {
  name?: string,
  age: number
}

const Home: FC<{ type: string }> = ({ type }) => {
  const [count, setCount] = useState('1');
  useEffect(() => {
    assign({ name: 1 }, { age: 2 })
    let sexobj = {age: 'maile'}
    log(sexobj as any)
    getargs(1,2,3)
  }, [])

  const assign = <T, U>(obj1: T, obj2: U): T & U => {
    let res = {} as T & U;
    res = Object.assign(obj1, obj2);
    return res;
  }

  const log = (val: Info) => {
    console.log(val)
  }

  const getargs = (...args:any[]) => {
    console.log(args)
  }

  return (
    <div style={{ padding: 20, border: '1px solid #ccc', width: 600 }}>
      <input type="text" value={count} onChange={({ target: { value } }) => setCount(value)}></input>
      &nbsp; &nbsp; &nbsp;
      <Button type="primary">{type}</Button>
    </div>
  )
}

export default Home;