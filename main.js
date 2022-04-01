window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

window.addEventListener('resize', hideHamburger);

function hideHamburger(e) {
    if (window.innerWidth > 768) {
        $('.hamburger').style.display = 'none'
        console.log($('body').style.position)
    } else {
        $('.hamburger').style.display = 'block'
        $('body').style.position = 'relative';
        console.log($('body').style.position)
    }
}

/* Toggle hamburger menu */
function showMobileMenu() {
    $('.hamburger').style.display = 'none'
    $('.mobile-menu-close').style.display = 'block'
    $('.mobile-menu').style.transform = 'translateX(0)'
    $('body').style.position = 'fixed';
}

$('.hamburger').addEventListener('click', showMobileMenu)


function hideMobileMenu() {
    $('.mobile-menu-close').style.display = 'none'
    $('.hamburger').style.display = 'block'
    $('.mobile-menu').style.transform = 'translateX(100%)'
    $('body').style.position = 'relative';
}

$('.mobile-menu-close').addEventListener('click', hideMobileMenu)

const faq = [
    {   
        id: 1,
        question: "What is Bookmark?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis."
    },
    {
        id: 2,
        question: "How can I request a new browser?",
        answer: "Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdie tVivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet."
    },
    {
        id: 3,
        question: "Is there a mobile app?",
        answer: "Sed consectetur quam id neque fermentum accumsan. Praesent luctus vestibulum dolor, ut condimentum urna vulputate eget. Cras in ligula quis est pharetra mattis sit amet pharetra purus. Sed sollicitudin ex et ultricies bibendum."
    },
    {
        id: 4,
        question: "What about other Chromium browsers?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis."
    }
];

/* Feature Slider */
$$('.feature-tab')
    .forEach(feature => 
        feature.addEventListener('click', toggleSlider)
    );

function toggleSlider() {
    /* remove selected from all classes */
    $$('.feature-tab')
    .forEach(feature => {
        if (feature.classList.contains('selected')) {
            feature.classList.remove('selected')
        }
    })
    this.classList.add('selected')
    let title = $('.feature-heading')
    let desc = $('.feature-desc')
    let img = $('.feature-img')
    switch (this.innerText) {
        case 'Simple Bookmarking': 
            title.textContent = "Bookmark in one click"
            desc.textContent = "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites."
            img.src = './images/illustration-features-tab-1.svg'
            break
        case 'Speedy Searching': 
            title.textContent = "Intelligent Search"
            desc.textContent = "Our powerful search feature will help you find saved sites in no time. No need to trawl through all of your bookmarks."
            img.src = './images/illustration-features-tab-2.svg'
            break
        case 'Easy Sharing':
            title.textContent = "Share your bookmarks"
            desc.textContent = "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button."
            img.src = './images/illustration-features-tab-3.svg'
            break
    }
}



/* Insert FAQ */
let html = faq.map(item => {
    return `
        <div class="question-flex" data-id="${item.id}">
            <div class="question-container">
                <span class="question">${item.question}</span>
                <img class="arrow" src="./images/icon-arrow.svg" data-id="${item.id}">
            </div>
            <div data-id="${item.id}" class="answer">${item.answer}</div>
        </div>
`}).join('');

$('.faq-accordion').innerHTML = html;


/* FAQ accordion functionality */
const faqItems = $$('.question-flex')
faqItems.forEach(item => {
    item.addEventListener('click', () => handleFAQClick(item))
})

function handleFAQClick(item) {
    let id = item.dataset.id;
    let corrAnswer = [...$$('.answer')].find(answer => answer.dataset.id === id)
    let container = corrAnswer.closest('.question-flex')
    let arrow = [...$$('.arrow')].find(answer => answer.dataset.id === id)
    let allAnswers = $$('.answer');

    if (container.classList.contains('active')) {
        container.classList.remove('active');
        arrow.style.transform = 'rotateZ(0deg)'
        arrow.style.filter = 'none'
        console.log('hiding')
    } else {
        container.classList.add('active');
        arrow.style.transform = 'rotateZ(180deg)'
        arrow.style.filter = 'brightness(0) saturate(100%) invert(53%) sepia(75%) saturate(4004%) hue-rotate(329deg) brightness(102%) contrast(95%)'
    }
    allAnswers.forEach(answer => {
            let container = answer.closest('.question-flex')
            if (container.classList.contains('active') && answer !== corrAnswer) {
                let id = answer.dataset.id;
                let arrow = [...$$('.arrow')].find(answer => answer.dataset.id === id)
                arrow.style.transform = 'rotateZ(0deg)'
                arrow.style.filter = 'none'
                container.classList.remove('active');
            }
    })
}