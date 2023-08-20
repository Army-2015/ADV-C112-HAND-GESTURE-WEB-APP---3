var prediction_1= "";

Webcam.set({
    height: 300,
    width: 350,
    image_format: 'png',
    png_quality: 90
    
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {document.getElementById("snapshot").innerHTML = '<img id="captured_image" src="'+data_uri+'" />';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/JTlQdsIBn/model.json' , modelLoaded);

function modelLoaded()
{
    console.log('Model is Loaded!')
}

function predict()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error){
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("predicted_emotion_text").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
    }
}

function speak()
{
    var utterance = new SpeechSynthesisUtterance();
    var speak_data = "The first prediction is"+ prediction_1;
    utterance.text = speak_data;
    utterance.voice = window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.speak(utterance);
}