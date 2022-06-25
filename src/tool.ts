// 两个浮点数求和
export const add = (a: number, b: number):number => {
  let c = 0 // a的小数部分长度
  let d = 0 // b的小数部分长度
  try {
    c = a.toString().split('.')[1].length
  } catch (f) { }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) { }
  
  let e = 10 ** Math.max(c, d) //保证a、b为整数的最小10次幂
  return (a * e + b * e) / e
}

// 两个浮点数相减
export const sub = (a: number, b: number):number => {
  let c = 0 // a的小数部分长度
  let d = 0 // b的小数部分长度
  try {
    c = a.toString().split('.')[1].length
  } catch (f) { }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) { }

  let e = 10 ** Math.max(c, d) //保证a、b为整数的最小10次幂
  return (a * e - b * e) / e
}


