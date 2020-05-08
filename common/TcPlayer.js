export function TPlay() {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve(TcPlayer)
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//imgcache.qq.com/open/qcloud/video/vcplayer/TcPlayer-2.3.2.js";
    script.onerror = reject;
    document.head.appendChild(script);
  })
}