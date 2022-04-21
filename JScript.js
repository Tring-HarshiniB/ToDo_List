let storage = "";
let user = "";
let finduser = "";
let userdetails = "";

$(document).ready(function() {
    if(sessionStorage.getItem('login') !=undefined ){
    
         storage = JSON.parse(sessionStorage.getItem('login'));
         user = JSON.parse(localStorage['signup']);
         finduser = user.users.find(element => element.uname == storage.uname && element.pwd == storage.pwd);
         userdetails = finduser;
         
         document.getElementById('show').style.display="block";
        if(userdetails.list.length > 0){
            display();
        }
    }
    else{
        alert(" Please Log In First ! ");
        location.href = "LogIn.html";
     }
    });

    function clearcomplete(){
        if(userdetails.list.length>0){
           let completeClear =  userdetails.list.filter(check => check.checked =='no');
           userdetails.list= completeClear;
           display();
            } 
    }

    function empty() {
        userdetails.list = [];
        document.getElementById('tasks').innerHTML = '';
        display();
    }

    function save() {
        storage = JSON.parse(sessionStorage.getItem('login'));
         user = JSON.parse(localStorage['signup']);
        for(let li of user.users){
        if(li.uname == storage.uname && li.pwd ==  storage.pwd){
            li.list = userdetails.li;
        }
        }
        console.log(user);
        localStorage['signup']=JSON.stringify(user);
    
    }

    function add() {
        let task = document.getElementById('new-task').value.trim();
        console.log(task)
        if(task){
            let add= {
            "taskname":task,
            "checked":"no"
        }
        userdetails.list.push(add);
        let task = document.getElementById('new-task').value = "";
        display();
        }
    }

    function display(){
        let items='<ul>';
        let index = 0;
        for (let li of userdetails.list) {
        items += '<li>' ;
        if(li.checked == 'yes'){
            items+= '<li><div class="itemdelete" onclick="deleteitem(\'' + index + '\')">x</div></li>' ;
        }else{
            items+= '<li><div class="itemdelete" onclick="deleteitem(\'' + index + '\')">x</div></li>' ;
        }
        index++;
        html+='</li>';
    }
    html +='</ul>';
    document.getElementById('tasks').innerHTML = items;
    save();
    }

    function deleteitem(itm){
        userdetails.list.splice(itm,1);
        display();
    }

    function logout(){
        sessionStorage.clear();
        location.href = "LogIn.html";
    }
