let backgroundOption = true;
let backinterval;
//toggle spin class on icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    document.querySelector(".settings-box").classList.toggle("open");
};
//check if there is local storage random background item
let backgroundLocalitem = localStorage.getItem("background_option");

//check if random background localstroage not empty
if (backgroundLocalitem !== null) {
    if (backgroundLocalitem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    //remove active class from all spans
    document.querySelectorAll(".random-back span").forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundLocalitem === 'true') {
        document.querySelector(".random-back .yes").classList.add("active");
    } else {
        document.querySelector(".random-back .no").classList.add("active");
        
    }
}

//check local storage color option
let maincolors = localStorage.getItem("color-option");
if (maincolors !== null) {
    document.documentElement.style.setProperty('--main-color', maincolors);   
     //remove active class from all colors list item
        document.querySelectorAll(".colors-list li").forEach(element => {
            element.classList.remove("active");
    //add active class on element with data color === local storage item
     if (element.dataset.color === maincolors) {
          //add active class
         element.classList.add("active");
       }
        });
}


//switch colors

const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        //set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        //set color on local storage
        localStorage.setItem("color-option", e.target.dataset.color);
        handleActive(e);
    });
});
//switch random background

const randomBackground = document.querySelectorAll(".random-back span");

randomBackground.forEach(span => {
    span.addEventListener("click", (e) => {
        
        e.target.classList.add("active");
        handleActive(e);

        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomImgs();
            localStorage.setItem("background_option",true);
        } else {
            backgroundOption = false;

            clearInterval(backinterval);

            localStorage.setItem("background_option", false);
        }
    });
});

// select landing page element
let landingpage = document.querySelector(".landing-page");

// get array of imgs
let imgsArrsy = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

//background option


function randomImgs() {
    if (backgroundOption === true) {
    backinterval=  setInterval(() => {
    //get random number
    let randomNumber = Math.floor(Math.random() * imgsArrsy.length);

    //change background image url
    landingpage.style.backgroundImage = 'url("imgs/' + imgsArrsy[randomNumber] + '")';
    
}, 1000);
    }
}

randomImgs();

//select skills selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    //skills offset top
    let skilsoffsettop = ourSkills.offsetTop;
    //skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    //window Height
    let windowHeight = this.innerHeight;
    //window scroll top
    let windowScrolltop = this.pageYOffset;

    if (windowScrolltop > (skilsoffsettop + skillsOuterHeight - windowHeight)) {
        let allskills = document.querySelectorAll(".skill-box .skill-progress span");
        allskills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
}

//create pop with img
let ourgallery = document.querySelectorAll(".gallery img"); 

ourgallery.forEach(img => {
    img.addEventListener("click", (e) => {
       //create overlay element
        let overlay = document.createElement("div");

        //add class to overlay
        overlay.className = 'popup-overlay';

        //append overlay to body
        document.body.appendChild(overlay);

        //create popup
        let popupbox = document.createElement("div");

        //add class to popup
        popupbox.className = 'popup-box';
        if (img.alt !== null) {
            //create head
            let imghead = document.createElement("h3");

            //create text for head
            let imgtext = document.createTextNode(img.alt);

            //append text in head

            imghead.appendChild(imgtext);

            //append head to the popup box
            popupbox.appendChild(imghead);
        }

        //create the img
        let popupimg = document.createElement("img");

        //set img src
        popupimg.src = img.src;

        //add img to popupbox
        popupbox.appendChild(popupimg);

        document.body.appendChild(popupbox);

        //create the close span
        let closebtn = document.createElement("span");

         //create close button text
        let closebuttontext = document.createTextNode("X");

        //apend text to close button
        closebtn.appendChild(closebuttontext);

        closebtn.className = 'close-btn';

        //add close btn to popup-box

        popupbox.appendChild(closebtn);
   }) 
});

//close popup
document.addEventListener("click", function (e) {
    if (e.target.className == 'close-btn') {
        //remove current popup
        e.target.parentElement.remove();

        //remove ovelay
        document.querySelector(".popup-overlay").remove();
    }
});

//select all bullets

const allBullets = document.querySelectorAll(".nav-bullet .bullet");
//select all links
const allLinks = document.querySelectorAll(".links a");

function scrollTosomewhere(element) {
    element.forEach(ele => {
    
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
scrollTosomewhere(allBullets);
scrollTosomewhere(allLinks);

//handle active states
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    //add active class on self
    ev.target.classList.add("active");
}
let bulletSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullet");
let bulletLocalitem = localStorage.getItem("bullets-option");
if (bulletLocalitem !== null) {
    bulletSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletLocalitem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");

    }
}
bulletSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets-option", 'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets-option",'none');
        } 
        handleActive(e);
    });
});
//reset button
document.querySelector(".reset-option").onclick = function () {
    localStorage.removeItem("color-option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets-option"); 
    window.location.reload();
};
//toggle menu
let togglBtn = document.querySelector(".toggle-menu");

let tLinks = document.querySelector(".links");

togglBtn.onclick = function (e) {
    //stop propagation
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
}

//click anywhere outside menu and toggle button

document.addEventListener("click", (e) => {
    if (e.target !== togglBtn && e.target !==tLinks) {
            //check if menu is open
        if (tLinks.classList.contains("open")) {
            togglBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
})
//stop propagation on menu
tLinks.onclick = function (e) {
    e.stopPropagation();
}