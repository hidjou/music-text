// #00ffb4 = rgb(0, 255, 180)
// P5 vars
var song, slider, amplitude, volume, diameter, allSpans;
//$('#defaultCanvas0).hide();
var spanArrayLength;

function setup() {
  // put setup code here
  createCanvas(180, 180);
  song = loadSound('../sound/starlight.mp3', loaded);
  // createSlider(min, max, default, increment?)
  slider = createSlider(0, 1, 1, 0.01);
  song.setVolume(0.5);
  amplitude = new p5.Amplitude();
}

function draw() {
  // put drawing code here
  song.setVolume(slider.value());
  background(51);
  volume = amplitude.getLevel();
  diameter = map(volume, 0, 1, 0, 500);
  //console.log(volume);
  fill(255, 0, 255);
  ellipse(width/2, height/2, diameter, diameter);

  // Get all spans
  allSpans = selectAll('span');
  //console.log(volume);

  animateSpans(volume); // [0.1 : 0.4]
  setInterval(interpolateShade(), 30);
}

function loaded(){
    console.log('song loaded!');
    song.play();
  }
  var myColor = "rgb(0, 255, 255)";
  var shade = 255;
  var up = false;

function interpolateShade(){
    if(!up){
        shade -= 5;
    } else {
        shade += 5;
    }
    if(shade <= 0){
        up = true
    } else if(shade >= 255){
        up = false;
    }
    return shade;
}

function animateSpans(volume){
    // Which one is faster/more efficient 
    roundedRelativeAmplitude = round((allSpans.length + 1) * volume);
    for (var i = 1; i <= allSpans.length; i++){
        if(i >= roundedRelativeAmplitude){
            //$('span#' + i).addClass('green');
            document.getElementById(i).style.color = "rgb(0, 255, " + shade + ")";
        } else {
            //$('span#' + i).removeClass('green');
            document.getElementById(i).style.color = "rgb(255, 255, 255)";
        }
    }
}

// // Make each line into its own span
function divideParagraph(element){
    // Get all paragraphs
    var myText = $(element);
    $(window).resize(function(){
        // Each time window resizes execute
        // Split string where ever there is a space or more between two words
        myText.html('<span>' + myText.text().split(/\s{1,}/).join('</span> <span>') + '</span>');
        var lineNumber = 1, oldLine = 0, oldTop = -50;
        var spansCount = myText.text().split(/\s{1,}/).length;
        var newNewText = '<span id="1">';
        // Give each span its respective line number
        $('span', myText).each(function(index, myText){
            // First span
            if(index == 0){
                oldTop = $(this).position().top;
                newNewText += $(this).text() + ' ';
                return true
            // Last span
            }else if(index == spansCount - 1){
                newNewText += $(this).text() + '</span>';
                return true;
            }
            // New line
            if($(this).position().top != oldTop){
                oldTop = $(this).position().top;
                lineNumber++;
                newNewText += '</span><span id ="' + lineNumber + '">' + $(this).text() + ' ';
            // Same line
            } else {
                newNewText += $(this).text() + ' ';
            }
        });//each
        myText.html(newNewText);
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