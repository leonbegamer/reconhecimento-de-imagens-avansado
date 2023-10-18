function setup()
{
 canvas = createCanvas(300, 300);
 canvas.center();
 video = createCapture(VIDEO);
 video.hide();
 classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}

function modelLoaded()
{
    console.log('model Loaded!');
}

function draw()
{
    image(video, 0, 0 ,300 ,300);
    classifier.classify(video, gotResult);
}
var previusResult = '';

function gotResult(error, results)
{
if(error)
{
    console.error(error)
}
else
{
if((results[0].confidence > 0.5) && (previusResult != results[0].label))
{
    console.log(results);
    previusResult=results[0].label;
    var synth = window.speechSynthesis;
    speakData = 'o objeto detectado é-'+results[0].label;
    var utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
    document.getElementById("resultObjectName").innerHTML = results[0].label;
    document.getElementById("resultObjectAccuracy").innerHTML= results[0].confidence.toFixed(3);
}
}
}
