export default class Inputcomp {
  public inputVal:string
  
  constructor(inputVal:string) {
    this.inputVal = inputVal;
  }
  deleteKey() {
    this.inputVal = this.inputVal.length ? this.inputVal.substring(0, this.inputVal.length - 1) : ''; 
  }
  setInputVal(val: string) {
    this.inputVal = val;
  }
  inputKey(e:number | string) {
    let text: string = ''
    if (e === '.') {
      if (!this.inputVal) { // 首个字符串为小数点时前面添加一个0
        text = '0.'
      } else if (this.inputVal.includes('.')) { // 有小数点不能再次输入小数点
        return;
      } else {
        text = `${this.inputVal}${e}`
      }
    } else {
      const index = this.inputVal.indexOf('.'); // 获取小数点在数字中的位置
      if (index > -1 && this.inputVal.length - 1 - index >= 2) { // 最多展示小数点后两位
        return;
      }
      text = `${this.inputVal}${e}`
    }
    const list = text.split('.');
    text = `${Number(list[0])}${list.length === 2 ? `.${list[1]}` : ''}` // 去除字符串前多余的0及保留最后一位小数点
    this.inputVal = text;
  }
}