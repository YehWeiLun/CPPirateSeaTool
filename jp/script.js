

function formPost(body) {    
    return fetch("http://maril.sakura.ne.jp/cgi-bin/sea/sea.cgi", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            "pragma": "no-cache",
            "upgrade-insecure-requests": "1"
        },
        "referrer": "http://maril.sakura.ne.jp/cgi-bin/sea/sea.cgi",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

class LocalStorageAccessor {
    constructor() {
        this.storage = window.localStorage;
    }
    set(key, value) {
        this.storage.setItem(key, value);
    }
    get(key) {
        return this.storage.getItem(key);
    }
}
// 取消所有input submit預設事件
document.querySelectorAll('input[type="submit"]').forEach(function (item) {
    item.addEventListener('click', function (e) {
        var currentNode = item;
        var myForm = null;
        while (myForm == null && currentNode.nodeName != "FORM") {
            currentNode = currentNode.parentNode;
            if (currentNode.nodeName == "FORM") {
                myForm = currentNode;
            }
        }
        if (myForm.querySelector("input[name='mode'][value='move']")) {
            localStorageAccessor.set("target", myForm.querySelector("input[name='target'][checked]").value.replace('△','%81%A2'));
        }
    });
});
// 幫所有input[name=target]加上click事件,註銷所有input[name=target]的checked,並將當前點擊的input[name=target]設為checked
document.querySelectorAll('input[name="target"]').forEach(function (item) {
    item.addEventListener('click', function (e) {
        document.querySelectorAll('input[name="target"]').forEach(function (item) {
            item.removeAttribute("checked");
        });
        item.setAttribute("checked", "checked");
    });
});

let localStorageAccessor = new LocalStorageAccessor();

(function(){
    if (localStorageAccessor.get("target")) {
        let moveForm = getMoveForm();
        moveForm.target = localStorageAccessor.get("target");
        moveForm.reload = document.querySelector("input[name='reload']").value;

        var body = Object.keys(moveForm).map(key => `${key}=${moveForm[key]}`).join("&")
        console.log(body);
        setTimeout(() => {            
            formPost(body).then(()=>setTimeout(()=>{
                localStorageAccessor.set("target", "");
                window.location.reload();
            },1100));
        }, 1100);
    
    }
    
})()