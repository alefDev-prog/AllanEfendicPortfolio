// First-page animations

let nameContainer;
let nameContainerRect;
const breakPoint = 0;

document.addEventListener('scroll', scroll);

function scroll() {
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
    const response = await fetch('https://alefdev-prog.github.io/AllanEfendicPortfolio.github.io/projects.json', {
        method:'GET',
        headers: {
            'content-type': 'application/json'
        },
        mode: 'no-cors'
    });
    console.log(response)
    const output = await response.json();
    return output;
}

const organize = async () => {
    const rawObj = await getAll();
    rawObj.projects.map((object, index) => projectsArr.push(new project(object, index)));
    projectsArr.forEach(el => console.log(el)); 
    
}

const display = async () => {
    await organize();

    const container = document.querySelector("#projects-container");

    //create cards
    projectsArr.forEach(el => {


        const project = document.createElement('div');
        project.classList.add('card', 'flipped');

        //picture
        const picWrapper = document.createElement('figure');
        const pic = document.createElement('img');
        pic.setAttribute("src", el.data.picture);
        pic.setAttribute("alt", "project picture");
        picWrapper.appendChild(pic);
        project.appendChild(picWrapper);
        


        //description
        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add("description-wrapper");

        const header = document.createElement('h1');
        header.innerText = el.data.name;

        const article = document.createElement('article');
        const descriptionText = document.createElement('p');
        descriptionText.innerHTML = el.data.description;
        article.appendChild(descriptionText);


        //full description
        descriptionWrapper.appendChild(header);
        descriptionWrapper.appendChild(article);
        
        

        //buttons for more info
        const gitBtn = document.createElement('div');
        const siteBtn = document.createElement('div');
        gitBtn.classList.add('proj-btn');
        siteBtn.classList.add('proj-btn');
        gitBtn.innerText = 'Github';
        siteBtn.innerText = 'Preview';

        //links
        siteBtn.addEventListener('click', () => window.open(el.data.website, '_blank').focus());
        gitBtn.addEventListener('click', () => window.open(el.data.github, '_blank').focus());

        //font-awesome
        gitBtn.insertAdjacentHTML('beforeend', '<i class="fa-brands fa-github btn-icon"></i>');
        siteBtn.insertAdjacentHTML('beforeend', '<i class="fa-sharp fa-solid fa-magnifying-glass btn-icon"></i>')

        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');
        btnWrapper.append(gitBtn, siteBtn);


        //appending
        descriptionWrapper.appendChild(btnWrapper);
        project.appendChild(descriptionWrapper);
        container.appendChild(project); 
        
        
        

    });
    
}

const animate =  async () => {
    await display();

    const flippedElements = document.querySelectorAll(".flipped");
    const flipObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
               
                entry.target.classList.add('aligned');
                //entry.target.classList.remove('flipped');
            }
            else {
                entry.target.classList.remove('aligned');
            }
        });
    });


    flippedElements.forEach(el => flipObserver.observe(el));
}

animate();











