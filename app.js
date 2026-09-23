(function(){
"use strict";

const WEEKEND_FIELD="ufCrm9WorkWeekend";
const CONSENT_FIELD="ufCrm9ConsentFile";

function status(text,type=""){
document.getElementById("app").innerHTML=`<div class="status ${type}">${text}</div>`;
}

function resize(){
window.parent.postMessage({
type:"vibe:resize",
height:document.body.scrollHeight
},"*");
}

function init(){
if(typeof BX24==="undefined"){
status("Откройте приложение из карточки Битрикс24","error");
return;
}

BX24.init(function(){
BX24.placement.info(function(info){

if(!info || !info.options){
status("Нет контекста placement","error");
return;
}

waitEditor();

});
});
}

function waitEditor(){
let count=0;

let timer=setInterval(function(){
count++;

try{
if(window.BX && BX.Crm && BX.Crm.EntityEditor){

let editor=BX.Crm.EntityEditor.getDefault();

if(editor){
clearInterval(timer);
bind(editor);
return;
}

}

}catch(e){console.warn(e);}

if(count>30){
clearInterval(timer);
status("Редактор карточки недоступен. Проверьте API EntityEditor","error");
}

},500);
}

function bind(editor){

let weekend=editor.getControlById(WEEKEND_FIELD);
let consent=editor.getControlById(CONSENT_FIELD);

if(!weekend || !consent){
status("Поля карточки не найдены","error");
return;
}

function apply(){
let value=weekend.getRuntimeValue();

let visible=value===true || value==="Y" || value==="1";

consent.setVisible(visible);
resize();
}

apply();

try{
weekend.getField().on("change",apply);
}catch(e){
console.warn(e);
}

status("Контроль видимости активирован","success");
resize();

}

init();

})();
