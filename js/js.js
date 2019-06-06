var burger = document.querySelector(".nav-toggle");
var menu = document.querySelector(".navlist");
var templateElement = document.querySelector(".template");
let template = null;
if (templateElement) {
    template = templateElement.content
}
/*var templateElement = document.querySelector(".img_template");*/
const main = document.querySelector("main");
const allli = document.querySelectorAll("li")
var MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?_embed&per_page=100";
//console.log(burger)

console.log(window.location.pathname)

burger.addEventListener('click', function () {
    //console.log("hi")
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
});

if (window.location.pathname === "/janisblacksmith/index.html") {
    console.log(window.location.pathname)
    var slideIndex = 1;
    showSlides(slideIndex);

}
if (window.location.pathname === "/janisblacksmith/artwork.html") {
    JSONFetch(MyLink);

    setupArtworkLinks()

}

function setupArtworkLinks() {
    allli[0].addEventListener("click", function () {
        //console.log("hallo");
        MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?_embed&per_page=30";
        JSONFetch(MyLink);
    })

    allli[1].addEventListener("click", function () {
        //console.log("hallo");
        MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?categories=2&_embed";
        JSONFetch(MyLink);
    })


    allli[2].addEventListener("click", function () {
        //console.log("hallo");
        MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?categories=3&_embed";
        JSONFetch(MyLink);
    })


    allli[3].addEventListener("click", function () {
        //console.log("hallo");
        MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?categories=4&_embed";
        JSONFetch(MyLink);
    })


    allli[4].addEventListener("click", function () {
        //console.log("hallo");
        MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?categories=7&_embed";
        JSONFetch(MyLink);
    })


    allli[5].addEventListener("click", function () {
        //console.log("hallo");
        MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?categories=5&_embed";
        JSONFetch(MyLink);
    })


    allli[6].addEventListener("click", function () {
        //console.log("hallo");
        MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?categories=6&_embed";
        JSONFetch(MyLink);
    })

}





function JSONFetch(link) {

    var request = new XMLHttpRequest();
    request.open('GET', link, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);
            createHTML(data);
            //console.log(data);

        }

    };

    request.send();
}



function createHTML(data) {
    main.innerHTML = '';


    template = templateElement.content

    for (var i = 0; i < data.length; i++) {
        const clone = template.cloneNode(true);
        //console.log(data[i]);
        clone.querySelector('.img_template').addEventListener("click", artworkExpand);
        clone.querySelector('.modal button').addEventListener("click", artworkClose);
       // clone.querySelector('.inner').addEventListener("scroll", scrollFunction);
        if (data[i]._embedded['wp:featuredmedia']) {
            clone.querySelector('.img_template').src = data[i]._embedded['wp:featuredmedia']["0"].source_url;
            //clone.querySelector('.img_template').src = data[i]._embedded['wp:featuredmedia']["0"].media_details.sizes.thumbnail.source_url
        } else {
            clone.querySelector('.img_template').remove()
        }

        clone.querySelector('.name_template').innerHTML = data[i].title.rendered;
        clone.querySelector('.inner .name_template').innerHTML = data[i].title.rendered;
        clone.querySelector('.desc_template').innerHTML = data[i].content.rendered;


        clone.querySelector('.country_template').innerHTML = data[i].place;
        clone.querySelector('.date_template').innerHTML = data[i].year;





        // clone.querySelector('.event-category').innerHTML = catName[catIndex];
        // clone.querySelector('.event-heading').innerHTML = data[i].title.rendered;
        //let date = data[i].dateday;
        //let time = data[i].timetime;
        //clone.querySelector('.event-date').innerHTML = date.substr(0,10);
        //clone.querySelector('.event-time').innerHTML = time.substr(0,5);
        if (data[i].gallery !== false) {
            ////console.log('runs');
            //console.log(data[i].gallery["1"].guid);

            for (var j = 0; j < data[i].gallery.length; j++) {

                var image = document.createElement("img");
                //https://janiskarasevskis.tabeagrsl.com/wp-content/uploads/2019/05/9-11.jpg

                const withoutJPG = data[i].gallery[j].guid.substring(0, data[i].gallery[j].guid.length - 4)
                const cropped = withoutJPG + "-150x150.jpg"
                image.src = data[i].gallery[j].guid;
                image.classList.add("modalimg");
                clone.querySelector('.inner').appendChild(image);


            }
        }

        document.querySelector('main').appendChild(clone);
    }






};

function artworkExpand() {
    //console.log('opened');
    ////console.log(this.nextElementSibling);
    this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.toggle("visible");
}

function artworkClose() {
    //console.log('closed');
    this.parentElement.parentElement.classList.toggle("visible");
}





function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (slides.length > 0) {
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }
}

// When the user scrolls down 20px from the top of the document, show the button
//window.onscroll = function() {scrollFunction()};


/*
function scrollFunction(e) {
    console.log(e.target)
    modalInner = e.target;
    if (modalInner.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

*/
