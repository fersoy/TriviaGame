// I will use some Turkish definitions when I am stuck to findletiables names
const dogru = 1;
const yanlis = 0;

// Array of pictures
const pictures = [
    "./assets/images/ankara.jpg",
    "./assets/images/buonesaries.jpg",
    "./assets/images/vienna.jpg",
    "./assets/images/beijing.jpg",
    "./assets/images/kabul.jpg",
    "./assets/images/newdelhi.jpg",
    "./assets/images/oslo.jpg",
    "./assets/images/hanoi.jpg",
    "./assets/images/bern.jpg",
    "./assets/images/jakarta.jpeg",
    "./assets/images/wrong.jpg",
    // "./assets/images/images.jpeg",
];


// Javascript start here
$(document).ready(function () {

// Create objects and arrays(if needed) of questions and options here
    class soru {  
        constructor(capitals, a0, a1, a2, a3, rightAnswer, capitalsPictures) {
            this.question = capitals;
            this.answers = [a0, a1, a2, a3];
            this.rightAnswer = rightAnswer;
            this.capPictures =capitalsPictures;
        }
        
        // Display questions and then hide questions

        displayQuestion() {
            $("#question").text(this.question);
            $("#question").css("visibility", "visible");
        }
        hideQuestion() {
            $("#question").css("visibility", "hidden");
        }
        // create a loop for answers(use forEach!!!)
        displayAnswers() {
           let thisQuestion = this;
            $("#answer" + "0").text(this.answers[0]);
            thisQuestion.answers.forEach(function (value, i) {
                $("#answer" + i).text(thisQuestion.answers[i]);
                $("#answer" + i).css("visibility", "visible");
            });
        };
        hideAnswers() {
            this.answers.forEach(function (value, i) {
                $("#answer" + i).css("visibility", "hidden");
            });
        };
    }
    

    // Create arrays of questions here(10 questions are good)

   let questions = [{}];
   let thisQuestion;

    let wrongGuesses;
    let noAnswer;
    let questionNum;

    questions[0] = new soru("What is the capital city of Turkey?",
        "Istanbul", "Ankara", "Izmir", "Antalya", 1, 0);
    questions[1] = new soru("What is the capital city of Argentina?",
        "San Marino", "San Salvador", "Lima", "Buenos Aires", 3, 1);
    questions[2] = new soru("What is the capital city of Austria?",
        "Canberra", "Lisbon", "Vienna", "Belgrade", 2, 2);
    questions[3] = new soru("What is the capital city of China?",
        "Peking", "Hong Kong", "Tokyo", "Beijing", 3, 3);
    questions[4] = new soru("What is the capital city of Afghanistan?",
        "Kabul", "Dhoka", "Islamabad", "Doha", 0, 4);
    questions[5] = new soru("What is the capital city of India?",
        "Kanpur", "New Delhi", "Kabul", "Mumbai", 1, 5);
    questions[6] = new soru("What is the capital city of Norwey?",
        "Kiev", "Stockholm", "Canberra", "Oslo", 3, 6);
    questions[7] = new soru("What is the capital city of Vietnam?",
        "Hanoi", "Hong Kong", "Bangkok", "Beijing", 0, 7);
    questions[8] = new soru("What is the capital city of Switzerland?",
        "Lisbon", "Bern", "Amsterdam", "Astana", 1, 8);
    questions[9] = new soru("What is the capital city of Indonesia?",
        "Reykjavik", "Suva", "Jakarta", "Dhaka", 2, 9);

  
    // create button functions here and append them to the attributes and maybe pictures
   let buttons = $('<input/>').attr({
        type: 'button',
        id: 'startButton',
        value: 'Start',
        class: "buttons"
    });
    $("#resim").append(buttons);

    // button should also start over

   let screen = $('<input/>').attr({
        type: 'button',
        id: 'startover',
        value: 'Start Over',
        style: 'margin-top: -20%',
        class: 'buttons'
    });

    $(".background").append(screen);
    $("#startover").hide();

    // document on click!!!

    $(document).on("click", "#startButton", function (event) {
        startGame(false);
    });

    $(document).on("click", ".answer", function (event) {
       let words = $(this).attr('id');
       let count = words[words.search(/[0-9]/)];
        roundOver(count == questions[thisQuestion].rightAnswer ? dogru : yanlis);
    });

    $(document).on("click", "#startover", function (event) {
        $("#startover").hide();
        startGame(false);
    });
    

    // set time functions here

    let leftTime;
    let timeCalculator;
    
    function showTime(time) {
        $("#zaman").text("Time remaining: " + "You have "+ leftTime + " seconds left");
        $("#zaman").css("visibility", "visible");
    }

    function timer() {
        leftTime--;
        showTime(leftTime);
        if (leftTime <= 0) {
            roundOver(yanlis);
        }
    }

    // if else statements for correct answers or wrong anwers. Quiz starts! time, starting over
   let capitalQuiz = true; 

    function startGame(restart) {
        $("#resim1").hide();
        $("#resim").hide();
        leftTime = 10;
        timeCalculator = setInterval(timer, 1000);
        showTime(leftTime);
        if (!restart) { 
            thisQuestion = 0;
            wrongGuesses = 0;
            noAnswer = 0;
            if (capitalQuiz) {
                $("#startButton").toggle();
                capitalQuiz = false;
            }
        }
        questions[thisQuestion].displayQuestion();
        questions[thisQuestion].displayAnswers();
        return;
    }

    function roundOver(dogruyanlis) {
        clearInterval(timeCalculator);
        questions[thisQuestion].hideAnswers();
        questions[thisQuestion].hideQuestion();
        if (dogruyanlis == yanlis) {
            $("#resim").find("img").remove(); 
            $("#resim").append('<img src="./assets/images/wrong.jpg">');
            $("#resim").css("visibility", "visible");
            $("#resim").show();
            $("#answer0").text("Try again!");
            $("#answer0").css("visibility", "visible");
            if (leftTime <= 0) {
                $("#zaman").text("Time is gone!");
                noAnswer++;
            } else {
                $("#zaman").text("Wrong answer!");
                wrongGuesses++;
            }
        } else {
            $("#zaman").text("Correct!");
            $("#resim").find("img").remove(); 
            $("#resim").append('<img alt="test" src="' +
                pictures[questions[thisQuestion].capPictures] + '">');
            $("#resim").css("visibility", "visible");
            $("#resim").show();
            thisQuestion++; 
        }
        if (thisQuestion === 10) { 
            setTimeout(gameOver, 1000, true);
        } else {
            setTimeout(startGame, 1000, true);
        }
        return;
    }

    function gameOver() {
        $("#zaman").text("Game over!");
        $("#question").text("");
        $("#answer0").text("Incorrect: " + wrongGuesses);
        $("#answer1").text("Unanswered: " + noAnswer);
        $("#answer0").css("visibility", "visible");
        $("#answer1").css("visibility", "visible");
        $("#answer2").css("visibility", "hidden");
        $("#startover").show();
        return;
    }
});

