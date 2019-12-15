const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];
// const title = document.querySelector("#title");
const superEventHandler = {
   randomIndex: null,
   title: document.querySelector("#title"),

   randomColor: function() {
      randomIndex = Math.floor(Math.random() * colors.length);
   },

   handleResize: function(e) {
      // console.log(e);
      // console.log("I have been resized");
      superEventHandler.randomColor();
      document.title = "Now Resizing!";
      title.innerText = "You just resized!";
      title.style.color = colors[randomIndex];
   },

   handleClick: function(e) {
      superEventHandler.randomColor();
      document.title = "Now RightButton Clik!";
      title.innerText = "You just clicked right button!";
      title.style.color = colors[randomIndex];
   },

   handleMouseOver: function(e) {
      superEventHandler.randomColor();
      document.title = "Now MouseOver!";
      title.innerText = "Now mouse over in H1 element!";
      title.style.color = colors[randomIndex];
   },

   handleMouseOut: function(e) {
      superEventHandler.randomColor();
      document.title = "Now MouseOut!";
      title.innerText = "Just Now mouse out in H1 element!";
      title.style.color = colors[randomIndex];
   }
};

window.addEventListener("resize", superEventHandler.handleResize);
document.addEventListener("contextmenu", superEventHandler.handleClick);
superEventHandler.title.addEventListener("mouseover", superEventHandler.handleMouseOver);
superEventHandler.title.addEventListener("mouseout", superEventHandler.handleMouseOut);
