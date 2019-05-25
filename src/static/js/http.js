import Setting from '@/config/setting.js'
import Signatrue from './signature.js'
import qs from 'qs'
import axios from 'axios'

const baseUrl = Setting.baseUrl
const signString = Setting.signString

class Http {
    constructor() {}

    // GET请求
    get(url, data = {}, loading = false) {
        return this.requestAll(url, data, 'GET', loading)
    }
    // POST请求
    post(url, data, loading = false) {
        return this.requestAll(url, data, 'POST', loading)
    }
    // PUT请求
    put(url, data, loading = false) {
        return this.requestAll(url, data, 'PUT', loading)
    }
    // DELETE请求
    delete(url, data = {}, loading = false) {
        return this.requestAll(url, data, 'DELETE', loading)
    }

    requestAll(url, data, method, loading) {
        if (loading) {
            // 自定义开启loading时需要执行的代码
        }

        /* -----------------如果需要生成验签----------------------- */
        let paramsSign = this.redirectSign(url, data, method)
        let params;
        if (method === 'POST' || method === 'PUT') {
            params = Object.assign(data, paramsSign)
            params = qs.stringify(params)
        } else {
            let urlParams = ''
            for (let key in paramsSign) {
                urlParams += `&${key}=${paramsSign[key]}`
            }
            url += url.indexOf('?') == -1 ? urlParams.replace("&","?") : urlParams
        }
        /* ------------------------------------------------------ */
        return new Promise((resolve, reject) => {
            axios({
                url: baseUrl + '/' + url,
                data: params || data,
                method,
                header: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then(res => {
                // res.data为服务器返回的数据
                // 以服务器返回的真实数据为准
                if (res.data.Data) {
                    // 成功返回数据
                    resolve(res.data.Data)
                } else {
                    // 服务器返回错误信息
                    reject(res.data.ErrMsg)
                }
                if (loading) {
                    // 如果开启了loading需要结束loading
                }
            })
            .catch(err => {
                // 发送请求出错
                let errMsg = '发送请求的时候遇到一个错误，错误详情为：' + err
                new Error(errMsg)
                if (loading) {
                    // 如果开启了loading需要结束loading
                }
            })
        })
    }

    // 生成页签
    redirectSign(url, data, method) {
        let params = {}
        if (method === 'GET' || method === 'DELETE') {
            params = this.getUrlJson(url)
        } else {
            params = {...data}
        }
        return Signatrue.createSign(params, signString)
    }
    // 获取url中传递的参数
    getUrlJson(url) {
        let position = url.indexOf('?');
        let newJson = {};
        if(position != -1){
            position = parseInt(position) + 1;
            let newUrl = url.slice(position);
            let arr1 = newUrl.split('&');
            for(let i = 0;i<arr1.length;i++){
                let arr2 = [];
                arr2 = arr1[i].split('=');
                newJson[arr2[0]] = arr2[1];
            }
        }
        return newJson
    }
}

export default new Http()