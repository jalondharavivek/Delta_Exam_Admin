// function addQuestions() {

//     var questionNumber = document.getElementById("total_question").value;

//     var questionsHtml = "";
//      var questionsubmit = "<br> <input type='submit' value ='submit' name='submit'>"
//     for (var i = 1; i <= questionNumber; i++) {

//         questionsHtml += "<div class='question-header'>Question " + i + "</div>";
//         questionsHtml += "<label for='question'>Question text :</label>";
//         questionsHtml += "<textarea id='question_text' name='question_text' rows='3' ></textarea>";
//         questionsHtml += "<label for='option_a'>Option A:</label>";

//         questionsHtml += "<input type='text' id='option_a' name='option_a'>";
//         questionsHtml += "<label for='option_b'>Option B:</label>"
//         questionsHtml += "<input type='text' id='option_b' name='option_b'>";
//         questionsHtml += "<label for='option_c'>Option C:</label>"
//         questionsHtml += "<input type='text' id='option_c' name='option_c'>";
//         questionsHtml += "<label for='option_d'>Option D:</label>"
//         questionsHtml += "<input type='text' id='option_d' name='option_d'>";
//         questionsHtml += "<label for='answer-" + i + "'>Answer:</label>";
//         questionsHtml += " <select id='answer' name='answer'><option value=''>Select Correct Option</option> <option value='A'>A</option><option value='B'>B</option><option value='C'>C</option> <option value='D'>D</option> </select>"
//         questionsHtml += "<br><br>"
//     }

//     document.getElementById("questions").innerHTML = questionsHtml +    questionsubmit;
//     // document.getElementById("questions").innerHTML = questionsubmit 
// }



const option_a = document.getElementById("option_a");
const option_b = document.getElementById("option_b");
const option_c = document.getElementById("option_c");
const option_d = document.getElementById("option_d");
const selectbox = document.getElementById("correct_option");

// Add event listeners to each text box
option_a.addEventListener("input", updateSelectBox);
option_b.addEventListener("input", updateSelectBox);
option_c.addEventListener("input", updateSelectBox);
option_d.addEventListener("input", updateSelectBox);

// Function to update the options of the select box
function updateSelectBox() {
  // Get the values of the text boxes
  const value1 = option_a.value;
  const value2 = option_b.value;
  const value3 = option_c.value;
  const value4 = option_d.value;

  // Create an array of the values
  const values = [value1, value2, value3, value4];

  // Clear the options of the select box
  selectbox.innerHTML = "";

  // Add each value as an option to the select box
  values.forEach((value) => {
    const option = document.createElement("option");
    option.text = value;
    selectbox.add(option);
  });
}





