(function () {

    console.log("APP JS START");

    const app = document.getElementById("app");

    if (app) {
        app.innerHTML = `
            <h1>JS работает</h1>
            <p>Версия диагностики 002</p>
        `;
    } else {
        document.body.innerHTML = `
            <h1>JS работает</h1>
            <p>Элемент app не найден</p>
        `;
    }

})();
