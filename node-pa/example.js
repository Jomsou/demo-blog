const dataLib = require('./pa');
const gbk = require('gbk');
const JSDOM = require('jsdom').JSDOM;

dataLib.getUrl('https://detail.tmall.com/item.htm?spm=a220o.1000855.1000983.1.44c6262dtF3Osv&id=551008959296&standard=1&skuId=3362446137322', buffer => {
    //console.log('成功' + buffer.toString('gbk'));
   let html = gbk.toString('utf-8', buffer);
   let DOM = new JSDOM(html);
   let document = DOM.window.document;
   //console.log(document);
    let oHd = document.querySelector('.tb-detail-hd h1');
    console.log(oHd.innerHTML);
}, (err) => {
    console.log('请求失败');
})