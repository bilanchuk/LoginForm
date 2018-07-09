window.onload=function(){
	var index = null;
	var table = document.getElementById("table");
	var btnForRead = document.getElementById("add");
	var btnForUpdate = document.getElementById("update");
	var name = document.getElementById("name");
	var update = document.getElementById("update");
	console.log(name);
	var age = document.getElementById("age");
	var salary = document.getElementById("salary");

function GetUser(){
	table.innerHTML='';
	var xhr = new XMLHttpRequest();
	xhr.open("GET","/GetUser", true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) 
			return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		}
		else  {
			var mas = JSON.parse(xhr.responseText);
			var table = document.getElementById("table");
			for(var i = 0;i < mas.length; i++){
				var tr = document.createElement("tr");
				table.appendChild(tr);
				for (var key in mas[i]){
					var td = document.createElement("td");
					tr.appendChild(td);
					td.innerHTML = mas[i][key];
				}
				var td = document.createElement("td");
				tr.appendChild(td);
				var btn = document.createElement("button");
				td.appendChild(btn);
				btn.classList.add('delete'); btn.innerHTML = "Delete";
				var td = document.createElement("td");
				tr.appendChild(td);
				var btnUpdate = document.createElement("button");
				btnUpdate.classList.add('delete'); btnUpdate.innerHTML = "Update";
				td.appendChild(btnUpdate);
				btn.onclick = DeleteUser;
				btnUpdate.onclick = updateUser;
			}	
		}
	}
}

GetUser();

function DeleteUser(){
	var index = this.parentNode.parentNode.rowIndex
	var xhr = new XMLHttpRequest();
	var obj = {index:index};
	var objson = JSON.stringify(obj);
	xhr.open("post","/delete", true);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) 
			return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		}
		else  {
			console.log(xhr.responseText);
			GetUser();
		}	
	}
xhr.send(objson);
}

function addUser(user){
	var xhr = new XMLHttpRequest();
	xhr.open('post','/adduser',true);
	var obj = JSON.stringify(user);
	xhr.setRequestHeader('content-type','application/json');
	xhr.send(obj);
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) 
			return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		}
		else  {
			console.log(xhr.responseText);
			GetUser();
		}

		
	}

}

function updateUser(){
	var row = this.parentNode.parentNode;
	index = row.rowIndex;
	var tds=row.querySelectorAll('td');
	name.value=tds[0].innerHTML;
	age.value=tds[1].innerHTML;
	salary.value=tds[2].innerHTML;
};

btnForRead.onclick = function(){
	var user = new Object();
	user.name = name.value;
	user.age = age.value;
	user.salary = salary.value;
	addUser(user);
};

update.onclick = function(){
	var user = new Object();
	user.name = name.value;
	user.age = age.value;
	user.salary = salary.value;
	user.rowIndex = index;
	var xhr = new XMLHttpRequest();
	xhr.open('post','/updateUser',true);
	var obj = JSON.stringify(user);
	xhr.setRequestHeader('content-type','application/json');
	xhr.send(obj);
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) 
			return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		}
		else  {
			console.log(xhr.responseText);
			GetUser();
		}	
	}
	name.value = "";
	age.value = "";
	salary.value = "";
}
}


