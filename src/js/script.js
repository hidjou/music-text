// If anything inside the document is clicked
document.onclick = function(e) {
    // If the clicked object has a class for 'click'
    if (e.target.className === 'click') {
        // Run 'SelectText()'
        SelectText('selectme');
        
    }
};
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
//             $this.css("color", "rgb(0, 255, 180)");
//             lasty = top;
//         }
//     });
// });


// Gradiant color text
// $(function($){
//     // positions
//     $(window).resize(function(){
//         var oldTop = -1, currentTop = -1;
//         var color;
//         var gradiant = 0;

//         // Get IDed element
//         var $selected = $('#selectme');
//         // Divide element into multiple spans
//         $selected.html("<span>" + $selected.text().split(' ').join("</span> <span>") + "</span>");

//         $selected.find('span').each(function(){
//             currentTop = $(this).position().top;
//             // If currentTop > oldTop => change of YPost => change of line
//             // Change oldTop and color an
//             if(currentTop > oldTop){
//                 oldTop = currentTop;
//                 color = "rgb(0, 255, " + (180 - gradiant) + ")"
//                 gradiant = gradiant + 10;
//                 $(this).css("color", color);
//             } else {
//                 // If on the same line apply the same color
//                 $(this).css("color", color);
//             }
//         });
//     });
//     $(window).resize();
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

// // Make each line into its own span
function divideParagraph(element){
    // Get all paragraphs
    var myText = $(element);
    $(window).resize(function(){
        // Each time window resizes execute
        myText.html('<span>' + myText.text().split(' ').join('</span> <span>') + '</span>');
        var lineNumber = 0, oldTop = -50, spanArrayLength = 0;
        // Give each span its respective line number
        $('span', myText).each(function(){
            spanArrayLength += 1;

            if($(this).position().top != oldTop){
                oldTop = $(this).position().top;
                lineNumber++;
            }
            $(this).attr('class', 'line' + lineNumber);
        });//each
        oldTop = -50;
        var previousLine = 1, currentLine = 1;
        var newText = '<span class="line1">';
        var index = 0;
        $('span', myText).each(function(){
            // The last span
            if(index >= spanArrayLength - 1){
                newText += $(this).text() + '</span>';
                return true;
            }
            currentLine = $(this).attr('class').substring(4);
            if(currentLine == previousLine){
                newText += $(this).text() + ' ';

            } else {
                newText += '</span><span class="line' + currentLine + '">' + $(this).text() + ' ';
                previousLine += 1;
            }
            index +=1;
        })//each
        myText.html(newText);
        console.log('done');
    }).delay(50);//resize
    $(window).resize(); //first run
}

function setClassForSelectedText(){
    // set the selected text's class to x
    
    // Call divideParagraph(x)
}

$(document).ready(function(){
    divideParagraph('#selectme');
});