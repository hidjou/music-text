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


// Change color of the first word of the line
function paintFirstSpanInLine(){
    var oldTop;
    // target = our text
    var $selected = $('#selectme');
    //$selectedArray = $selected.text().split(' ');
    // separate each word into its own span
    $selected.html("<span>" + $selected.text().split(' ').join("</span> <span>") + "</span>");
    oldTop = -1;
    $selected.find('span').each(function(){
        var $this = $(this),
        top = $this.position().top;
        if (top > oldTop){
            $this.css("color", "rgb(0, 255, 180)");
            oldTop = top;
        }
    });
}


//// Gradiant color text
function paintGradiantLines(){
    // positions
    $(window).resize(function(){
        var oldTop = -1, currentTop = -1;
        var color;
        var gradiant = 0;

        // Get IDed element
        var $selected = $('#selectme');
        // Divide element into multiple spans
        $selected.html("<span>" + $selected.text().split(' ').join("</span> <span>") + "</span>");

        $selected.find('span').each(function(){
            currentTop = $(this).position().top;
            // If currentTop > oldTop => change of YPost => change of line
            // Change oldTop and color an
            if(currentTop > oldTop){
                oldTop = currentTop;
                color = "rgb(0, 255, " + (180 - gradiant) + ")"
                gradiant = gradiant + 10;
                $(this).css("color", color);
            } else {
                // If on the same line apply the same color
                $(this).css("color", color);
            }
        });
    });
    $(window).resize();
}

// // Takes all paragraphs and separates all words into spans, each span has class linex
// // Where x = number of line, works on window resize
function divideParagraphIntoOneWordSpans(){
    // Get all paragraphs
    var myText = $('#selectme');
    myText.html('<span>' + myText.text().split(' ').join('</span> <span>') + '</span>');
    $(window).resize(function(){
        // Each time window resizes execute
        var line = 0; 
        var oldTop = -15;
        $('span', myText).each(function(){
            var top = $(this).offset().top;
            if(top!=oldTop){
                oldTop=top;
                line++;
            }
            $(this).attr('class', 'line' + line);
        });//each
    });//resize
    $(window).resize(); //first one
}