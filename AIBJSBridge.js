(function(){

	if(window.aib){
		return;
	}

	var AIBJSBridge = {
        protocols: []
	}

	//根据id替换指定图片
	AIBJSBridge.replaceImage = function(id, str){
		if(typeof id == "string" && typeof str == "string"){
            document.getElementById(id).src = str;
     	}else{
     		throw new Error("type error");
     	}
    }

    //向body标签末尾追加内容
    AIBJSBridge.appendStringToBody = function(str){
    	var element = document.createElement("div");
    	element.innerHTML = str;
    	document.body.appendChild(element);
    }

    //接收oc注册的handle,
    AIBJSBridge.receiveHandleName = function(str){

        this.protocols.push(str);
        if (str.search("_") != -1) {
            var strArray = str.split("_");
            this._addEventForElementsToGetId(strArray[0],strArray[1]);
        }
    }

    //根据handleName执行oc原生方法
    AIBJSBridge.runClientMethod = function(handleName,data){
        var str = "window.webkit.messageHandlers."+ handleName + ".postMessage(\""+data+"\")";
        eval(str);
    }

    //
    AIBJSBridge._addEventForElementsToGetId = function(tagName,eventType){
 
        var that = this;
        $(tagName).on(eventType,function(){
            that.runClientMethod(tagName+"_"+eventType, this.id);
        });
     }

	window.aib = AIBJSBridge;
}());
