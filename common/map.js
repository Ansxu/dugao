export function MP(index) {//index==0时初次加载引用百度js文件，不重复引入js文件
  return new Promise(function (resolve, reject) {
		if(index==0){
			window.onload = function () {
			  resolve(BMap)
			}
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "//api.map.baidu.com/api?v=2.0&ak=iMAZit8WXHPF38QS2WRSL2gp9eW6mYvK&callback=init";
			script.onerror = reject;
			document.head.appendChild(script);
		}else{
			resolve(BMap)
		}
  })
}