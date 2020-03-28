function  getScrollOffset() {//查看滚动条的滚动距离
    if(window.pageXOffset){
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    }else{
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

function getViewportOffset() {//查看视口尺寸
    if(window.innerWidth){
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    }else{
        return {
            w: document.documentElement.clientWidth,
            y: document.documentElement.clientHeight
        }
    }
}

function addEvent(elem,type,handle){//添加事件函数
    if(elem.addEventListener){
        elem.addEventListener(type,handle,false);
    }else if (elem.attachEvent){
        elem.attachEvent('on' + type,function () {
            handle.call(elem);
        })
    }else{
        elem['on' + type] = handle;
    }
}

function adaptationEm() {//调整em为屏幕百分比单位
    let htmlwidth = getViewportOffset().h;  //获取窗口宽度
    let htmlDom = document.getElementsByTagName('html')[0];//获得html DOM元素
    //给DOM元素设置字体大小样式。
    htmlDom.style.fontSize = htmlwidth/37.5 + 'px';
    // Em 和 rem都是灵活、可扩展的单位，由浏览器转换为像素值，具体取决于您的设计中的字体大小设置
}

function loadScript(url,callback){//异步加载脚本文件,加载完后执行里面的某个方法
    var script = document.createElement('script');
    script.type = "text/javascript";
    if(script.readyState){//ie的异步加载方式
        script.onreadystatechange = function () {
            if(script.readyState == "complete" || script.readyState == "loaded"){
                callback();
            }
        }
    }else{
        script.onload = function () {
            callback();
        }
    }
    script.src = url;//这句放在后面，是防止小文件瞬间加载完成从而导致事件绑定失效。
    document.head.appendChild(script);//有这句才会在浏览器解析。
}