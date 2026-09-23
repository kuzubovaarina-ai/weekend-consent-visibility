(function(){

"use strict";


function output(data)
{
    document.body.innerHTML =
    `
    <div style="
        padding:20px;
        font-family:Arial;
        white-space:pre-wrap;
    ">
    <h2>Placement debug</h2>
    <pre>
${JSON.stringify(data,null,2)}
    </pre>
    </div>
    `;
}



if(typeof BX24 === "undefined")
{

    output({
        error:"BX24 не найден"
    });

    return;

}



BX24.init(function(){

    console.log("BX24 init OK");


    BX24.placement.info(function(info){

        output(info);


    });


});


})();
