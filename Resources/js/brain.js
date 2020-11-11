function navbarEffect(){
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").style.backgroundColor = "rgba(255,255,255,0.95)";
        // document.getElementById("navbar").style.backdrop

        document.getElementById("navbar").style.color = "black";

        // document.getElementById("logo").style.fontSize = "25px";
      } else {
        document.getElementById("navbar").style.backgroundColor = "transparent";
        document.getElementById("navbar").style.color = "white";
        // document.getElementById("logo").style.fontSize = "35px";
      }
}
document.addEventListener('contextmenu', event => event.preventDefault());


function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function disableScroll() { 
  // Get the current page scroll position 
  scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, 

      // if any scroll is attempted, set this to the previous value 
      window.onscroll = function() { 
          window.scrollTo(scrollLeft, scrollTop); 
      }; 
} 

function enableScroll() { 
  window.onscroll = function() {}; 
} 
function loadingeffect() {
  setInterval(() => {
    document.querySelector("#loading").style.display = "none"
    
}, 600);
}