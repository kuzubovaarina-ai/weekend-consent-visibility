(function () {

    "use strict";


    function show(data) {

        document.body.innerHTML = `
        <div style="
            padding:20px;
            font-family:Arial;
            color:#333;
        ">
            <h2>Bitrix24 Debug</h2>

            <pre>
${JSON.stringify(data, null, 2)}
            </pre>
        </div>
        `;

    }


    show({
        step: "start",
        bx24: typeof BX24
    });



    if (typeof BX24 === "undefined") {

        show({
            error: "BX24 object not found"
        });

        return;

    }



    BX24.init(function () {


        show({
            step: "BX24 init success"
        });



        BX24.placement.info(function (info) {


            show({

                step: "placement info",

                info: info

            });


        });



    });



})();
/*(function () {

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


})();*/
