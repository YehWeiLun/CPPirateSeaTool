(function () {
    class ActionData {
        constructor(form) {
            this.name = form.querySelector('input[name=mode]').value;
            this.form = form;
        }
    }
    class PageModifier {
        constructor() {
            // 取得當前頁面的所有表單
            this.actions = getAllActionsForm().map(f => new ActionData(f));
            // 解除右鍵限制
            unlockRightClick();
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

    var pageModifier = new PageModifier();
   
})()