let offset = (el) => {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

let smoothScrolling = () => {
    let anchors = document.querySelectorAll("a[href^='#']");
    for(let element of anchors){
        element.addEventListener("click",(e)=>{
            e.preventDefault();
            let target = document.querySelector(e.target.getAttribute("href"));
            window.scrollTo({
                top: offset(target).top,
                behavior: 'smooth',
            });
        });
    }
}

window.onload = () => {
    smoothScrolling()
}