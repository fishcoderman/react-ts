// 普通函数定义
const fn1 = (firstname: string, secondename: string): string => {
  return firstname + secondename;
}

// 函数类型接口

interface FunIneter {
  (value: number, label: string): string
}

const fn2: FunIneter = (val: number, lab: string): string => {
  return val + lab;
}

console.log('函数类型接口', fn2(123, 'ack'))


// 普通泛型

const fn3 = <T>(value: T, label: T): string => {
  return String(value) + label
}

function fn4<T>(val: T): T {
  return val;
}

console.log(fn3<string>('12', '456'))

console.log(fn4<string>('123'))

// 泛型接口
interface Fxjk {
  <T>(val: T): T
}

const fn5: Fxjk = <T>(val: T): T => {
  return val;
}

console.log(fn5<number>(123))


interface A {
  name: string
}

interface B {
  age: number
}

type C = A & B;

const person: C = {
  name: '123',
  age: 20
}