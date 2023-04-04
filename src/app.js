// First-page animations

let nameContainer;
let nameContainerRect;
const breakPoint = 0;

document.addEventListener('scroll', scroll);

function scroll() {
    console.log("hej")
    nameContainer = document.getElementById('name-container');
    nameContainerRect = nameContainer.getBoundingClientRect();


    let scrollDist = document.documentElement.scrollTop;
    let sectionHeight = document.querySelector('#welcome-section').clientHeight;

    if (scrollDist >= breakPoint) {
        nameContainer.style.transform = `translateX(-${scrollDist-breakPoint}px)`;
      
    }
}



// information accordion
const accordionBtns = document.getElementsByClassName('accordion-title');
let open = false;
for(btn of accordionBtns) {

    btn.addEventListener('click', (e) => {

        const accordions = document.querySelectorAll(".accordion-text");
        const sibling = e.target.nextElementSibling;
        for(accordion of accordions) {
        
            if(accordion.classList.contains('active') && !sibling.isSameNode(accordion)) {
                accordion.classList.remove('active');
                accordion.previousElementSibling.classList.remove('minus');
            }
        }

        
        sibling.classList.toggle('active');
        e.target.classList.toggle('minus');
        

    })
}



// sliding in the hidden elements

const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            console.log(entry);
            entry.target.classList.add("show");
        }
        else {
            entry.target.classList.remove("show");
        }
    });
});

hiddenElements.forEach((element) => observer.observe(element));




// 3d animations for icons 

const icons = document.querySelectorAll(".icon-container");

icons.forEach(icon => {
    icon.addEventListener('mousemove', event => {
        
         
        let X = (event.offsetX-icon.clientWidth/2)/2.5;
        let Y = (event.offsetY-icon.clientHeight/2)/2.5;
        event.target.style.transform = `rotateY(${X}deg) rotateX(${-Y}deg)`;
        event.stopPropagation();
    
    
    },);
});

//mouse enters
icons.forEach(icon => {
    icon.addEventListener('mouseenter', event => {
        event.target.style.transition = "none";
    })
})


//mouse leaves
icons.forEach(icon => {
    icon.addEventListener('mouseleave', event => {
        event.target.style.transition = "all 0.5s ease";
        event.target.style.transform = `rotateY(0deg) rotateX(0deg)`;
    })
});


//project-section

class project {
    data;
    id;
    constructor(data, id) {
        this.data = data;
        this.id = id;
    }

    get data() {
        return this.data;
    }
}

const projectsArr = [];


//async stuff
const getAll = async () => {
    const response = await fetch('projects.json', {
        method:"GET",
        headers: {
            'content-type': 'application/json'
        },
        mode: 'no-cors'
    });
    const output = await response.json();
    return output;
}

const organize = async () => {
    const rawObj = await getAll();
    rawObj.projects.map((object, index) => projectsArr.push(new project(object, index)))
    
}

organize();








