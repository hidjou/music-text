function SelectText(element) {
    // Set needed vars
    var doc = document,
        text = doc.getElementById(element),
        range,
        selection;    
    if (doc.body.createTextRange) {
        // Research this method
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
//string.join(str) - joins an array of strings and puts str between each
// $(function($) {
//     var lasty;

//     console.log("running spliting");
//     // target = our text
//     var $target = $('#selectme');
//     $target.html(
//       "<span>" +
//       $target.text().split(/\s/).join("</span> <span>") +
//       "</span>");
//     lasty = -1;
//     $target.find('span').each(function() {
//       var $this = $(this),
//           top = $this.position().top;
//       if (top > lasty) {
//         $this.css("fontWeight", "bold");
//         lasty = top;
//       }
//     });
// });​

// // Change color of the first word of the line
// // #00ffb4 = rgb(0, 255, 180)
// $(function($){
//     var lasty;
//     // target = our text
//     var $selected = $('#selectme');
//     //$selectedArray = $selected.text().split(' ');
//     // separate each word into its own span
//     $selected.html("<span>" + $selected.text().split(' ').join("</span> <span>") + "</span>");
//     lasty = -1;
//     $selected.find('span').each(function(){
//         var $this = $(this),
//         top = $this.position().top;
//         if (top > lasty){
//             console.log('changing color');
//             $this.css("color", "rgb(0, 255, 180)");
//             lasty = top;
//         }
//     });
// });

// Change color of separate lines
$(function($){
    var oldTop, currentTop;
    var $selected = $('#selectme');

    var gradiant = 0;
    var color = "rgb(0, 255, " + (180 - gradiant) + ")"

    $selected.html("<span>" + $selected.text().split(' ').join("</span> <span>") + "</span>");
    oldTop = -1;
    currentTop = -1;
    
    $selected.find('span').each(function(){
        currentTop = $(this).position().top;
        if(currentTop > oldTop){
            oldTop = currentTop;
            gradiant = gradiant + 10;
            color = "rgb(0, 255, " + (180 - gradiant) + ")"
            $(this).css("color", color);
        } else {
            $(this).css("color", color);
        }
    });
});

// Make each line into its own span

// $(function(){
//     var p = $('p'); 
//     var words = p.text().split(' '); 
//     var text = ''; 
//     $.each(words, function(i, w){
//         if($.trim(w)) text = text + '<span>' + w + '</span> ' }
//           ); //each word 
//     p.html(text); 
//     $(window).resize(function(){ 
  
//       var line = 0; 
//       var prevTop = -15; 
//       $('span', p).each(function(){ 
//         var word = $(this); 
//         var top = word.offset().top; 
//         if(top!=prevTop){ 
//           prevTop=top; 
//           line++; 
//         } 
//         word.attr('class', 'line' + line); 
//       });//each 
  
//     });//resize 
  
//     $(window).resize(); //first one
// });



// If anything inside the document is clicked
document.onclick = function(e) {
    // If the clicked object has a class for 'click'
    if (e.target.className === 'click') {
        // Run 'SelectText()'
        SelectText('selectme');
    }
};