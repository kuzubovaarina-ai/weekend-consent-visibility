(function(){

"use strict";


function show(data){

document.body.innerHTML = `
<h2>Placement debug</h2>
<pre style="font-size:14px">
${JSON.stringify(data,null,2)}
</pre>
`;

}



if(typeof BX24 === "undefined"){

show({
error:"BX24 object not found"
});

return;

}



BX24.init(function(){


BX24.placement.info(function(info){


show(info);


});


});


})();
