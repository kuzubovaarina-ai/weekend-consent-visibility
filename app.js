(function () {
    "use strict";


    const WEEKEND_FIELD = "ufCrm9WorkWeekend";
    const CONSENT_FIELD = "ufCrm9ConsentFile";


    let editorInstance = null;



    function showStatus(message, type = "") {

        const app = document.getElementById("app");

        if (app) {

            app.innerHTML =
                `<div class="status ${type}">
                    ${message}
                </div>`;

        }

        console.log(message);
    }




    function resizeFrame() {

        window.parent.postMessage(

            {
                type: "vibe:resize",
                height: document.body.scrollHeight
            },

            "*"

        );

    }





    function initBitrix() {


        if (typeof BX24 === "undefined") {

            showStatus(
                "Откройте приложение из карточки Битрикс24",
                "error"
            );

            return;

        }



        BX24.init(function () {


            console.log(
                "BX24 initialized"
            );



            BX24.placement.info(function (info) {


                console.log(
                    "Placement info:",
                    info
                );



                if (
                    !info ||
                    !info.options
                ) {


                    showStatus(
                        "Нет контекста карточки Битрикс24",
                        "error"
                    );


                    return;

                }



                waitEditor();


            });


        });


    }






    function waitEditor() {


        let attempts = 0;



        const timer = setInterval(function () {


            attempts++;



            try {


                if (

                    window.BX &&
                    BX.Crm &&
                    BX.Crm.EntityEditor

                ) {


                    editorInstance =
                        BX.Crm.EntityEditor.getDefault();



                    if (editorInstance) {


                        clearInterval(timer);


                        bindFields();


                        return;

                    }


                }



            }

            catch (error) {

                console.warn(
                    error
                );

            }




            if (attempts > 30) {


                clearInterval(timer);


                showStatus(

                    "Не удалось получить редактор карточки. EntityEditor недоступен.",

                    "error"

                );


            }



        }, 500);



    }







    function bindFields() {



        const weekendControl =

            editorInstance.getControlById(
                WEEKEND_FIELD
            );



        const consentControl =

            editorInstance.getControlById(
                CONSENT_FIELD
            );





        if (

            !weekendControl ||
            !consentControl

        ) {


            showStatus(

                "Не найдены поля карточки",

                "error"

            );


            console.log(
                "weekendControl",
                weekendControl
            );


            console.log(
                "consentControl",
                consentControl
            );


            return;


        }






        function applyVisibility() {



            const value =
                weekendControl.getRuntimeValue();




            const show =

                value === true ||

                value === "Y" ||

                value === "1";





            consentControl.setVisible(
                show
            );



            console.log(

                "Согласие отображается:",

                show

            );



            resizeFrame();



        }






        // первоначальная проверка

        applyVisibility();






        // отслеживание изменения поля

        try {


            weekendControl
                .getField()
                .on(

                    "change",

                    applyVisibility

                );



        }

        catch (e) {


            console.warn(

                "Не удалось подписаться на изменение поля",

                e

            );


        }







        showStatus(

            "Контроль видимости поля активирован",

            "success"

        );



        resizeFrame();



    }







    initBitrix();



})();
