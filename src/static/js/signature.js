import md5 from 'js-md5';

class Signature{

  constructor(){}
  /**
   * 获取随机数
   * @param num 多少位数
   * */
  getRomder(num){
    return  Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1));
  }
 
  createSign(params, signSring) {
    delete params.signature
    delete params.nonce
    delete params.timestamp
    let timestamp = Date.parse(new Date()) / 1000
    //获取随机数
    let nonce = this.getRomder(10)
    //验签固定字符串
    let signString = signSring
    //验签
    let signature = ''
    params['nonce'] = nonce
    params['timestamp'] = timestamp
    signature = this.loopJsonToSignString(params)
    signature += signString
    
    signature = signature.toLowerCase()
    signature = md5(signature)
    return {nonce, timestamp, signature}
  }

  /**
   *排序json 返回排序完成后的数组
   *@param json data
   *@return json newJson newArr
   * */
  sortJsonKeyToArr (data) {
    let newJson = {}
    let newArr = []
    for (let attr in data) {
      let lowerAttr = attr.toLowerCase()
      newArr.push(lowerAttr)
      newJson[lowerAttr] = data[attr]
    }
    return {sortArr: newArr.sort(), sortJson: newJson}
  }
 
  /**
   * 判断是否是数组
   * */
  isArrayFn(value){
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    }else{
      return Object.prototype.toString.call(value) === "[object Array]";
    }
  }
 
  /**
   * 解析富文本文件
   * */
  analysisRichText (text) {
    return unescape(text)
  }
 
  /**
   *将数组打成string
   *@param string name key值
   *@param array arr 数组
   *@return string
   * */
  breakArrToJson(name, arr) {
    let newString = ''
    let newArr = []
    arr.forEach((val, index) => {
        let nameprefix = `${name}[${index}]`
        if (typeof (val) != 'object') {
          let childString = `${nameprefix}${val}`
          newArr.push(childString)
        }
        else {
          let sortKey = this.sortJsonKeyToArr(val).sortArr
          let lowerArr = {}
          for (let attr in val) {
            if (val[attr] !== null && val[attr] !== '' && val[attr] !== undefined) {
              lowerArr[attr.toLowerCase()] = val[attr]
            }
          }
          for (let i = 0; i < sortKey.length; i++) {
            if (lowerArr[sortKey[i]] !== null && lowerArr[sortKey[i]] !== '' && lowerArr[sortKey[i]] !== undefined) {
              let childString = `${nameprefix}[${sortKey[i]}]${lowerArr[sortKey[i]]}`
              newArr.push(childString)
            }
          }
        }
      }
    )
    newArr.sort()
    for (let i = 0; i < newArr.length; i++) {
      newString += newArr[i]
    }
    return newString.toLowerCase()
  }
 
  /**
   * 生成sign
   * @param json data
   * @param string attrName 对象的键名
   * @return string
   * */
  loopJsonToSignString (data, attrName = false) {
    let sortRest = this.sortJsonKeyToArr(data)
    let sortArr = sortRest.sortArr
    let sortJson = sortRest.sortJson
    let signature = ''
    sortArr.forEach( attr => {
      let currentVal = sortJson[attr]
      if (currentVal !== null && currentVal !== undefined && currentVal !== '') {
        if ((typeof (currentVal) == 'string' || typeof (currentVal) == 'number' || currentVal == 0) && !this.isArrayFn(currentVal) && typeof (currentVal) != 'object') {//是string
          if (attrName === false) {
            signature += `${attr}${currentVal}`
          } else {
            signature += `${attrName}[${attr}]${currentVal}`
          }
        } else if(currentVal === true || currentVal === false){
          if (attrName === false) {
            signature += `${attr}${currentVal}`
          } else {
            signature += `${attrName}[${attr}]${currentVal}`
          }
        } else if (this.isArrayFn(currentVal) && currentVal.length > 0) {//是数组
          if (attrName == false) {
            // let newAttrName = `${attrName}[${attr}]`
            signature += this.breakArrToJson(attr, currentVal)
          }
        } else if (!this.isArrayFn(currentVal) && typeof (currentVal) == 'object'){//是json
            if (attrName !== false) {
            let newAttrName = `${attrName}[${attr}]`
            signature += this.loopJsonToSignString(currentVal, newAttrName)
          } else {
            signature += this.loopJsonToSignString(currentVal, attr)
          }
        }
      }
    })
    return signature
  }
}

export default new Signature()