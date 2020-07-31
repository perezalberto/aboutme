document.addEventListener("DOMContentLoaded", (event) => {
    smoothScrolling();
    firebaseConfig();
    document.getElementById("contact-form").addEventListener("submit", (event) => {
        event.preventDefault();
        sendFormData(event);
    });
});


const offset = (element) => {
    var rect = element.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

const smoothScrolling = () => {
    let anchors = document.querySelectorAll("a[href^='#']");
    for (let element of anchors) {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            let target = document.querySelector(e.target.getAttribute("href"));
            window.scrollTo({
                top: offset(target).top,
                behavior: 'smooth',
            });
        });
    }
}

const firebaseConfig = () => {
    // Your web app's Firebase configuration
    var config = {
        apiKey: "AIzaSyDeP4Mm81iMibJuzJhfn49QZm-OT1hydk4",
        authDomain: "aboutme-23131.firebaseapp.com",
        databaseURL: "https://aboutme-23131.firebaseio.com",
        projectId: "aboutme-23131",
        storageBucket: "aboutme-23131.appspot.com",
        messagingSenderId: "969813473305",
        appId: "1:969813473305:web:1ce38e4b0c5dbfe7ae9288",
        measurementId: "G-X6V177FV8D"
      };
      // Initialize Firebase
      firebase.initializeApp(config);
      firebase.analytics();
}

const sendFormData = async (event) => {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subject = document.getElementById('subject');
    const body = document.getElementById("body");

    const data = {
        'name': name.value,
        'email': email.value,
        'phone': phone.value,
        'subject': subject.value,
        'body': body.value
    };

    const submitElement = document.getElementById("submit");

    submitElement.value = "Sending...";
    try {
        await firebase.database().ref('contact').push(data);
        submitElement.classList.value = "bg-green";
        submitElement.value = "Message sent"
    } catch (error) {
        submitElement.classList.value = "bg-red";
        submitElement.value = "Error sending"
    }
    
    await setInterval(()=>{
        submitElement.classList.value = "";
        submitElement.value = "Send message";
    },2000);


    document.getElementById("contact-form").reset();
}
