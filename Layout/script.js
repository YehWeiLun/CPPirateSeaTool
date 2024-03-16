(function(){        
    class PageModifier{        
        constructor(){
            this.forms = getAllActionsForm();
            this.actions = [this.forms.map(f=>f.querySelector("input[name=mode]").value)];
            console.log(this.actions);
        }
    }
    function getAllActionsForm(){
        var inputs = document.querySelectorAll('input[name=mode]');
        var forms = [];
        inputs.forEach(ipt=>{
            let currentParentNode = ipt.parentNode;
            while(currentParentNode && currentParentNode.nodeName!='FORM'){                
                currentParentNode = currentParentNode.parentNode;
                if(currentParentNode.nodeName =='FORM') forms.push(currentParentNode);
            }            
        });
        return forms;
    }

    var pageModifier = new PageModifier();
})()