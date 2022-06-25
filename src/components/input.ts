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
    let l = `${this.inputVal}${e}`;
    const reg1 = /0*([1-9]\d*|0\.\d+)/;
    l = l.replace(reg1, '$1').replace(".","$#$").replace(/\./g,"").replace("$#$",".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); 
    this.inputVal = l === '.' ? '0.' : l;
  }
}