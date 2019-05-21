(function () {
    var burger = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".navlist");
    burger.addEventListener('click', function () {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
})();

