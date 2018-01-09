function SelectText(element) {
    // Set needed vars
    var doc = document,
        text = doc.getElementById(element),
        range,
        selection;    
    if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
//string.join(str) - joins an array of strings and puts str between each
// Original code
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
// $(function($){
//     // positions
//     var oldTop = -1, currentTop = -1;
//     var color;
//     var gradiant = 0;

//     // Get IDed element
//     var $selected = $('#selectme');
//     // Divide element into multiple spans
//     $selected.html("<span>" + $selected.text().split(' ').join("</span> <span>") + "</span>");

//     $selected.find('span').each(function(){
//         currentTop = $(this).position().top;
//         // If currentTop > oldTop => change of YPost => change of line
//         // Change oldTop and color an
//         if(currentTop > oldTop){
//             oldTop = currentTop;
//             color = "rgb(0, 255, " + (180 - gradiant) + ")"
//             gradiant = gradiant + 10;
//             $(this).css("color", color);
//         } else {
//             // If on the same line apply the same color
//             $(this).css("color", color);
//         }
//     });
// });


//// Original code
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

// takes all paragraphs and separates all words into spans, each span has class linex
// where x = number of line, works on window resize
// $(function(){
//     // Get all paragraphs
//     var myText = $('#selectme');
//     myText.html('<span>' + myText.text().split(' ').join('</span> <span>') + '</span>');
//     $(window).resize(function(){
//         // Each time window resizes execute
//         var line = 0; 
//         var oldTop = -15;
//         $('span', myText).each(function(){
//             console.log('giving spans classes');
//             var top = $(this).offset().top;
//             if(top!=oldTop){
//                 oldTop=top;
//                 line++;
//             }
//             $(this).attr('class', 'line' + line);
//         });//each
//     });//resize
//     $(window).resize(); //first one
// });
// Make each line into its own span
$(function(){
    // Get all paragraphs
    var myText = $('#selectme');
    $(window).resize(function(){
        // Each time window resizes execute
        myText.html('<span>' + myText.text().split(' ').join('</span> <span>') + '</span>');
        var line = 0; 
        var oldTop = -15;
        var length = 0;
        //console.log('dividing text');
        // Give each span its respective line number
        $('span', myText).each(function(){
            length += 1;
            var top = $(this).offset().top;
            if(top!=oldTop){
                oldTop=top;
                line++;
            }
            $(this).attr('class', 'line' + line);
        });//each
        oldTop = -15;
        var previousLine = 1;
        var currentLine = 1;
        var lineText = '<span class="line1">';
        var index = 0;
        $('span', myText).each(function(){
            // The last span
            if(index >= length - 1){
                lineText += $(this).text() + '</span>';
                return true;
            }
            currentLine = $(this).attr('class').substring(4);
            if(currentLine == previousLine){
                lineText += $(this).text() + ' ';

            } else {
                lineText += '</span><span class="line' + currentLine + '">' + $(this).text() + ' ';
                previousLine += 1;
            }
            index +=1;
        })
        myText.html(lineText);
    });//resize
    $(window).resize(); //first one
    alert('no errors');
});

// If anything inside the document is clicked
document.onclick = function(e) {
    // If the clicked object has a class for 'click'
    if (e.target.className === 'click') {
        // Run 'SelectText()'
        SelectText('selectme');
    }
};