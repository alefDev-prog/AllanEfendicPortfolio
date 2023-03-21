// First-page animations

const nameContainer = document.getElementById('name-container');
const nameContainerRect = nameContainer.getBoundingClientRect();
const breakPoint = nameContainerRect.top - 60;

document.addEventListener('scroll', () => {
    let scrollDist = document.documentElement.scrollTop;
    console.log(scrollDist);
    if (scrollDist >= breakPoint) {
        nameContainer.style.transform = `translateX(-${scrollDist-breakPoint}px)`;
    }

});




// information accordion
const accordionBtns = document.getElementsByClassName('accordion-title');
for(btn of accordionBtns) {

    btn.addEventListener('click', (event) => {
        const sibling = event.target.nextElementSibling;
        event.target.classList.toggle('minus');
        sibling.classList.toggle('active');
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
})





