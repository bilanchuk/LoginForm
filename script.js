window.onload=function(){
	var res=document.querySelector(".res");
	var top=document.querySelector(".top");

	var calc={
		replace: true,
		repeatoperation:false,
		memory:0,
		numberClick: function(value,res){
			if(this.replace){
				res.value=value;
				this.replace=false;
			}
			else {
				res.value+=value;
		}   
			
		},
		operationClick:function(value,res,top){
			top.value+=res.value+value;
			if (this.repeatoperation==false)
			{
				this.memory=top.value;
				this.repeatoperation=true;
			}
			else { res.value=eval(this.memory+res.value);
				this.memory=res.value+value;
				
			}
			// top.value+=res.value+value;
			   this.replace=true;

		},
		equalClick:function(res,top){
			res.value=eval(this.memory+res.value);
			top.value="";
			this.replace=true;
			this.repeatoperation=false;
			this.memory=0;


		},
		clearClick:function(res,top){
			res.value=0;
			top.value="";
			this.replace=true;
			this.repeatoperation=false;
			this.memory=0;
		},
		pointClick:function(val,res){
			if (this.replace){
				res.value="0.";
				this.replace=false;
				return;
			}
			var str=res.value;
			var pos=str.indexOf(".");
			if (pos!=-1) return;
			res.value+=val;

		},
}

	calculator.onmouseover=function(event){
		var target=event.target;
		if (target.tagName !="INPUT") //відсікаєм клік не на інпут
			return;
		var atr=target.getAttribute("type");
		if (atr=="text") return;     //відсікаєм клік не на інпут
        target.classList.add("orange");
	}

	calculator.onmouseout=function(event){
        event.target.classList.remove("orange");
	}




	calculator.onclick=function(event){

		var target=event.target;
		if (target.tagName !="INPUT") //відсікаєм клік по полю тіла Калькулятора
			return;
		var atr=target.getAttribute("type");
		if (atr=="text") return; ///відсікаєм клік по по полю Текст
		var val=target.value;
		if (!isNaN(val)){
			//alert("Число- "+val);
			calc.numberClick(val,res);
			
		}
		if (val=="+"||val=="-"||val=="*"||val=="/"){
			calc.operationClick(val,res,top);
			//alert("Символ операції- "+val);
		}
		if (val=="="){
			calc.equalClick(res,top);

		}
		if (val=="c"){
			calc.clearClick(res,top);
		}
		if (val=="."){
			calc.pointClick(val,res);
}

}
}



// на кнопку С стерти топ і рес і поставити в рес 0 
// this.replace=true;
