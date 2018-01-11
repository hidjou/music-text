// #00ffb4 = rgb(0, 255, 180)
// P5 vars
var song, slider, amp, volume, diameter, spans;
//$('#defaultCanvas0).hide();

function setup() {
  // put setup code here
  createCanvas(180, 180);
  song = loadSound('../sound/starlight.mp3', loaded);
  // createSlider(min, max, default, increment?)
  slider = createSlider(0, 1, 1, 0.01);
  song.setVolume(0.5);

  amp = new p5.Amplitude();
}

function loaded(){
  console.log('loaded');
  song.play();
}

function draw() {
  // put drawing code here
  song.setVolume(slider.value());
  background(51);
  volume = amp.getLevel();
  diameter = map(volume, 0, 1, 0, 500);
  //console.log(volume);
  fill(255, 0, 255);
  ellipse(width/2, height/2, diameter, diameter);

  // Get all spans
  spans = selectAll('span');
  console.log(volume);
  animateSpans(volume);
}

function animateSpans(volume){
    roundedRelativeAmplitude = round((spans.length + 1) * volume);
    for (var i = 1; i <= spans.length; i++){
        if(i >= roundedRelativeAmplitude){
            $('span.' + i).addClass('green');
        } else {
            $('span.' + i).removeClass('green');
        }
    }
}

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
            $(this).attr('class', lineNumber);
        });//each
        oldTop = -50;
        var previousLine = 1, currentLine = 1;
        var newText = '<span class="1">';
        var index = 0;
        $('span', myText).each(function(){
            // The last span
            if(index >= spanArrayLength - 1){
                newText += $(this).text() + '</span>';
                return true;
            }
            currentLine = $(this).attr('class');
            if(currentLine == previousLine){
                newText += $(this).text() + ' ';

            } else {
                newText += '</span><span class="' + currentLine + '">' + $(this).text() + ' ';
                previousLine += 1;
            }
            index +=1;
        })//each
        myText.html(newText);
    }).delay(50);//resize
    $(window).resize(); //first run
}

function setClassForSelectedText(){
    // set the selected text's class to x
    
    // Call divideParagraph(x)
}

$(document).ready(function(){
    divideParagraph('#selectme');
    //$('span.1').addClass('green');
});