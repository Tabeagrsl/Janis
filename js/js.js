var burger = document.querySelector(".nav-toggle");
var menu = document.querySelector(".navlist");
var template = document.querySelector(".template").content;
const main = document.querySelector("main");
const allli = document.querySelectorAll("li")
var MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?_embed";

burger.addEventListener('click', function () {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
});

allli[0].addEventListener("click", function(){
    console.log("hallo");
    MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?_embed";
    JSONFetch(MyLink);
})

allli[1].addEventListener("click", function(){
    console.log("hallo");
    MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?categories=2&_embed";
    JSONFetch(MyLink);
})

allli[2].addEventListener("click", function(){
    console.log("hallo");
    MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?categories=3&_embed";
    JSONFetch(MyLink);
})

allli[3].addEventListener("click", function(){
    console.log("hallo");
    MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?categories=4&_embed";
    JSONFetch(MyLink);
})

allli[4].addEventListener("click", function(){
    console.log("hallo");
    MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?categories=7&_embed";
    JSONFetch(MyLink);
})

allli[5].addEventListener("click", function(){
    console.log("hallo");
    MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?categories=5&_embed";
    JSONFetch(MyLink);
})

allli[6].addEventListener("click", function(){
    console.log("hallo");
    MyLink = "https://janiskarasevskis.tabeagrsl.com/wp-json/wp/v2/artwork?categories=6&_embed";
    JSONFetch(MyLink);
})



function JSONFetch(link) {

    var request = new XMLHttpRequest();
    request.open('GET', link , true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);
            createHTML(data);
            console.log(data);

        }

    };

    request.send();
}



function createHTML(data) {
    main.innerHTML = '';


    for (var i = 0; i < data.length; i++) {
        const clone = template.cloneNode(true);
        clone.querySelector('button').addEventListener("click", artworkExpand);
        clone.querySelector('.img_template').src = data[i]._embedded['wp:featuredmedia']["0"].source_url;



        clone.querySelector('.name_template').innerHTML = data[i].title.rendered;

        // clone.querySelector('.event-category').innerHTML = catName[catIndex];
        // clone.querySelector('.event-heading').innerHTML = data[i].title.rendered;
        //let date = data[i].dateday;
        //let time = data[i].timetime;
        //clone.querySelector('.event-date').innerHTML = date.substr(0,10);
        //clone.querySelector('.event-time').innerHTML = time.substr(0,5);
        if (data[i].gallery !== false) {
            console.log('runs');
            console.log(data[i].gallery["1"].guid);

            for (var j = 0; j < data[i].gallery.length; j++) {

                var image = document.createElement("img");
                image.src = data[i].gallery[j].guid;
                image.classList.add("modalimg");
                clone.querySelector('.modal').appendChild(image);


            }
        }

        document.querySelector('main').appendChild(clone);
    }





};

function artworkExpand() {
    console.log('opened');
    console.log(this.nextElementSibling);
    this.nextElementSibling.classList.toggle("visible");
}


JSONFetch(MyLink);


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

