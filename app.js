(function () {

"use strict";


function show(data) {

    document.body.innerHTML = `
        <div style="
            padding:20px;
            font-family:Arial;
        ">
            <h2>Bitrix24 Placement Debug</h2>

            <pre>
${JSON.stringify(data, null, 2)}
            </pre>
        </div>
    `;

}



if (typeof BX24 === "undefined") {

    show({
        error: "BX24 object not found"
    });

    return;
}



BX24.init(function () {


    BX24.placement.info(function (info) {


        show(info);


    });


});


})();
