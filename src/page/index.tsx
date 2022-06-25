import React, { useState, useEffect } from 'react';
import {TList} from '../type';
import Withdrawal from '../components/withdrawal';
import Input from '../components/input';

const list:(number | string)[] = Array.from({length:10}).map((item,index)=>{
  return index;
 });
list.push('.');
const withdrawal = new Withdrawal(10000);
const inputComp = new Input('');
function Index() {
  const [inputVal, setInputVal] = useState(''); // 输入框数值
  const [balance, setBalance] = useState(0); // 余额
  const [eExceed, setExceed] = useState(false); // 是否超过余额
  const [withList , setWithList] = useState<TList[]>([]); // 提现记录
  useEffect(() => {
    setBalance(withdrawal.balance);
    setInputVal(inputComp.inputVal);
  }, []);
  useEffect(() => {
    setExceed(Number(inputVal) > balance);
  }, [inputVal, balance]);

  // 提现
  const goWithdrawal = () => {
    let amount = Number(inputVal);
    if (amount > 0 && !eExceed) {
      const { newBalance, newWithList } = withdrawal.goWithdrawal(inputVal);
      setWithList(newWithList);
      setBalance(newBalance);
      inputComp.setInputVal('');
      setInputVal('');
    }
  }

  // 全部提现
  const withAll = () => {
    inputComp.setInputVal(balance.toString());
    setInputVal(balance.toString());
  }

  // 输入框删除
  const deleteKey =() => {
    inputComp.deleteKey();
    setInputVal(inputComp.inputVal);
  }

  // 输入框输入
  const inputKey = (e:(number | string)) => {
    inputComp.inputKey(e);
    const text = inputComp.inputVal;
    setInputVal(text);
  }
  return (
    <div className="App">
      <input value={inputVal} onChange={()=>{}} />
      {!eExceed && <div>当前零钱余额{balance}元，<button onClick={withAll}>全部提现</button></div>}
      {eExceed && <div>输入金额超过零钱金额</div>}
      <div className='keyboard'>
        <div className='key-left'>
          {list.map(item => {
            return <div onClick={() => inputKey(item)} key={item} className='key'>{item}</div>
          })}
        </div>
        <div className='key-right'>
          <div className='key' onClick={deleteKey}>X</div>
          <div className='withdrawal' onClick={goWithdrawal}>提现</div>
        </div>
      </div>
      <div>
        {withList.map(item => {
          return <div key={item.index}>金额：{item.amount};手续费：{item.serviceCharge}</div>
        })}
      </div>
    </div>
  ); 
}

export default Index;