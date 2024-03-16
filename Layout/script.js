(function () {
    class ActionData {
        constructor(form) {
            this.name = form.querySelector('input[name=mode]').value;
            this.form = form;
        }
    }
    class FleetData {
        constructor() {
            this.fleetTable = null;            
            this.initialize();
            this.location = this.getLocation(this.fleetTable.querySelector("tr:nth-child(2) > td:nth-child(2)").innerHTML);
            this.money = this.getMoney(this.fleetTable.querySelector("tr:nth-child(4) > td:nth-child(2)").innerHTML);
            this.inventory = this.getInventory(this.fleetTable.querySelector("tr:nth-child(5) > td:nth-child(2)").innerHTML);
            this.movingInput = document.querySelector('input[name=down]')?.value;
        }
        getLocation(str){
            //亞洲(物價：0.00％ 稅率：0％ 天氣：<font color="#A35709">四季分明</font> 蝕之刻尚未到來...：<font color="#FFCC00">125 ‱</font>)
            var match = str.match(/(.+)\(物價：(.+)％ 稅率：(.+)％ 天氣：<font color="#A35709">(.+)<\/font> 蝕之刻尚未到來...：<font color="#FFCC00">(.+) ‱<\/font>\)/);            
            if(match == null) return null;            
            var location = {
                name: match[1],
                price: parseFloat(match[2]),
                tax: parseFloat(match[3])                
            };
            return location;
        }
        getMoney(str){                       
            var match = str.match(/現金：(.+) G/);
            if(match == null) return null;            
            return parseFloat(match[1].replace(/,/g, ""));            
        }
        getInventory(str){                        
            var match = str.match(/全部：(.+)　現有：(.+)　剩餘：(.+)/);            
            if(match == null) return null;                                   
            var match2 = match[3].match(/水手：(.+)人 基礎戰力：(.+) 食物：(.+) 貨物：(.+),(.+)/);
            if(match2 == null) return null;                        
            return {
                current: parseFloat(match[1]),
                max: parseFloat(match[2]),
                sailor: parseFloat(match2[1])                                
            };
        }
        initialize() {
            var fleetTitleCell = null;
            document.querySelectorAll("td[align=center]").forEach(td => {
                if (td.innerHTML == "艦隊資訊") {
                    fleetTitleCell = td;
                }
            });
            if (fleetTitleCell == null) {
                alert("找不到艦隊資訊");
                throw "找不到艦隊資訊";
            }

            var tdParent = fleetTitleCell.parentNode;
            while (tdParent && tdParent.nodeName != 'TABLE') {
                tdParent = tdParent.parentNode;
            }
            if (tdParent) {
                this.fleetTable = tdParent;
            }
        }
    }

    class PageModifier {
        constructor() {
            // 取得當前頁面的所有表單
            this.actions = getAllActionsForm().map(f => new ActionData(f));
            // 解除右鍵限制
            unlockRightClick();
            this.fleetData = new FleetData();
            console.log.apply(null, this.actions.map(a => a.name));
        }
    }
    /// 取得所有表單
    function getAllActionsForm() {
        var inputs = document.querySelectorAll('input[name=mode]');
        var forms = [];
        inputs.forEach(ipt => {
            let currentParentNode = ipt.parentNode;
            if (currentParentNode.nodeName == 'FORM') forms.push(currentParentNode);
            while (currentParentNode && currentParentNode.nodeName != 'FORM') {
                currentParentNode = currentParentNode.parentNode;
                if (currentParentNode.nodeName == 'FORM') forms.push(currentParentNode);
            }
        });
        return forms;
    }
    /// 解除右鍵限制
    function unlockRightClick() {
        function R(a) {
            ona = "on" + a;
            if (window.addEventListener) window.addEventListener(a, function (e) { for (var n = e.originalTarget; n; n = n.parentNode) n[ona] = null; }, true);
            window[ona] = null; document[ona] = null; if (document.body) document.body[ona] = null;
        }
        R("contextmenu");
        R("click");
        R("mousedown");
        R("mouseup");
        R("selectstart");
    }

    var pageModifier = window.pageModifier = new PageModifier();
    if(pageModifier.fleetData.movingInput){
        var reloadTime = Math.random()*1000 * 20;
        console.log(`reload in ${Math.round(reloadTime/1000,2)} seconds.`);
        setTimeout(()=>{window.location.reload();}, reloadTime);
    }
})()