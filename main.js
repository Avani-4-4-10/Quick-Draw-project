array_1 = ["moon", "paper","star" , "clock"]

random_no = Math.floor((Math.random() * array_1.length))


sketch = array_1[random_no]
document.getElementById("sketch_drawn").innerHTML="Sketch To Be Drawn: "+sketch
timer_counter = 0
timer_check = ""
drawn_sketch = ""
answer_holder = ""
score = 0

function setup() {
    canvas = createCanvas(280, 280)
    background("white")
    canvas.center()
    canvas.mouseReleased(ClassifyCanvas)
    synth = window.speechSynthesis
}

function clearCanvas() {
    background("white")
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet')
}

function draw() {
    check_sketch()
    if(drawn_sketch==sketch){
        answer_holder="set"
        score=score+1
        document.getElementById("score").innerHTML="score: "+score
    }
    strokeWeight(13)
    stroke(0)
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }

}

function ClassifyCanvas() {
    classifier.classify(canvas, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        document.getElementById("result_sketch").innerHTML = "Your Sketch: " + results[0].label
        document.getElementById("result_confidence").innerHTML = "Confidence: " + Math.round(results[0].confidence * 100) + "%"
        utterThis = new SpeechSynthesisUtterance(results[0].label)
        synth.speak(utterThis)
    }
}
function check_sketch(){
    timer_counter=timer_counter+1
    document.getElementById("time").innerHTML="Time: "+timer_counter
    if(timer_counter > 400){
        timer_counter=0
        timer_check="completed"
    }
   
    if(timer_check=="completed"|| answer_holder=="set"){
        timer_check=""
       answer_holder=""
       UpdateCanvas()
    }
}
function UpdateCanvas(){
    background("white")
    random_no = Math.floor((Math.random() * array_1.length))
    sketch = array_1[random_no]
    document.getElementById("sketch_drawn").innerHTML="Sketch To Be Drawn: "+sketch
}