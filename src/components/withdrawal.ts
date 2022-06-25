import {TList} from '../type'
import { add, sub } from '../tool';
const overCount = 1000; // 超出需付手续费金额
const service = 0.1 // 手续费率
export default class Withdrawal {
  public balance:number
  public withList:Array<TList>
  
  constructor(balance:number) {
    this.balance = balance; // 初始化余额
    this.withList = [];
  }
  // 提现
  goWithdrawal(inputVal:string):any {
    let amount = Number(inputVal);
    const cumulativeAmount = this.withList.reduce((pre, cur) => { // 累积提现金额
      return add(pre, cur.amount);
    }, 0);
    let serviceCharge = 0; // 手续费
    if (cumulativeAmount >= overCount) { // 累计提现金额已超过1000
      const num = Number((amount / overCount).toFixed(2));
      serviceCharge = num > service ? num : 0;
    } else {
      const overAmount = add(amount, cumulativeAmount) - overCount; // 超出1000的金额
      if (overAmount > 0) { // 累积未超过但本笔超过
        const num = Number((overAmount / overCount).toFixed(2));
        serviceCharge = num > service ? num : 0;
      }
    }
    this.withList.push({ amount: sub(amount, serviceCharge), serviceCharge, index: this.withList.length + 1 });
    this.balance = sub(this.balance, amount)
    return {
      newBalance: this.balance,
      newWithList: this.withList
    }
  }
}