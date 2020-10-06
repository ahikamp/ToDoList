$(document).one('pageinit',function(){

var  currentIndex=0;
var html= ''
var taskslist=new Array();
//emptySign();

if (localStorage.length!=0){
$('#tasklist').empty(html);
init();
}
     else
        {
            emptySign();
        }






//add addtask handler
$('#addtask-btn').on('tap',addTask)
//add delete handler
$('#removeall-btn').on('tap',removeAll)

$('#updatetask-btn').on('tap',updateTask)

$('#tasklist').on('tap','#update-btn',insertCurrentData)

$('#tasklist').on('tap','#delete-btn',deleteTask)



function addTask(){

let date = $("#dateinput").val();
let description = $("#descinput").val();

var task = {
date: date,
description: description,
}

taskslist.push(task);
updateLocalStorageAndUI();
}


function init(){
taskslist = JSON.parse(window.localStorage.getItem('task'));
addToListTasks();
}


function removeAll(){
taskslist = []
$('#tasklist').empty(html);
window.localStorage.clear();
emptySign();
}


function addToListTasks()
{
    for(i=0;i<taskslist.length;i++)
    {
    html ='<div class="element-list"><li><strong>Date:</strong>'+taskslist[i].date+'<br> <strong> Description: </strong>'+taskslist[i].description+'<br><a id="delete-btn" data-role="button" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right  ui-icon-delete" data-index="'+i+'" ></a><a type = "button" id="update-btn" href="#update-task" data-date= "'+taskslist[i].date+  '"data-desc= "'+taskslist[i].description+ '" data-index= "'+i+'" > update</a></li></div><br>'
    $('#tasklist').append(html);
    }
}

function updateTask(){

let date = $('#update-date').val();
let description = $('#update-desc').val();

var task = {
date: date,
description: description,
}

taskslist.splice(currentIndex,1,task)

updateLocalStorageAndUI();
}



function emptySign(){
html='<p class="emptylist" >' +"There are no have any tasks"+ '</p>'
$('#tasklist').append(html);
}



function sortFunction(a,b){
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;
}


function deleteTask(){
//alert("chk")
localStorage.setItem('currentIndex',$(this).data('index'))
currentIndex = localStorage.getItem('currentIndex')
taskslist.splice(currentIndex,1)


updateLocalStorageAndUI();


}


function insertCurrentData()
{
localStorage.setItem('currentDate',$(this).data('date'))
localStorage.setItem('currentDesc',$(this).data('desc'))
localStorage.setItem('currentIndex',$(this).data('index'))
currentIndex = localStorage.getItem('currentIndex')


$('#update-date').val(localStorage.getItem('currentDate'))
$('#update-desc').val(localStorage.getItem('currentDesc'))

}

function updateLocalStorageAndUI(){

window.localStorage.setItem('task',JSON.stringify(taskslist));
$('#tasklist').empty(html);
taskslist.sort(sortFunction);
if (taskslist.length==0)
    removeAll();
addToListTasks();
}




})

