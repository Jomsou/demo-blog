//请求url模块，用于将url解析成json
const urlLib = require('url');
//export输出模块，若是输出用moudule.exports,单个用exports
//好处: 便于其他文件调用，避免全局变量
exports.getUrl = (surl, success, error)=>{
    _req(surl);
    function _req(surl) {
        let mod = null;
        //将url解析成json
        let obj = urlLib.parse(surl);
        //http、https请求模块不同
        if (obj.protocol == 'http:') {
            mod = require('http');
        } else {
            mod = require('https');
        }
        //把要抓取的网站作为服务端，这里作为客户端发出请求
        let req = mod.request({
            'hostname': obj.hostname,
            'path': obj.path
        }, res => {
            let arr = [];
            if (res.statusCode == 200) {
                res.on('data', buffer => {
                    arr.push(buffer);
                });
                res.on('end', () => {
                    let b = Buffer.concat(arr);
                    success && success(b);
                })

            }
            //301：永久重定向
            //302: 临时重定向
            //解决办法：用递归一直重定向 
            else if (res.statusCode == 301 || 302) {
                _req(res.headers['location']);
            } else {
                //404等请求失败
                console.log(res.statusCode);
                error && error();
            }
        })
        //通信失败
        req.on('error', err => {
            error && error(err);
        })
        //请求结束，任务开始
        req.end();
    }
}