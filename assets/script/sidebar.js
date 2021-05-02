function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (currentScrollPos <= 500) {
        document.getElementById("openMenu").style.display = "block";
    } else {
        document.getElementById("openMenu").style.display = "none";
    }
};