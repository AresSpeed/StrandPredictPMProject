document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("#quizForm");
  const submitBtn = document.querySelector("#submitBtn");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent the default form submission behavior

    // Collect selected answers
    const answers = [];
    const selectedOptions = form.querySelectorAll('input[type="radio"]:checked');
    selectedOptions.forEach(option => {
      const questionId = option.name;
      const answer = option.value;
      answers.push({ questionId, answer });
    });

    let abm = 0;
    let humss = 0;
    let stem = 0;
    let gas = 0;

    // Check for specific subject combinations
    answers.forEach(answer => {
      switch (answer.answer) {
        case "ABM":
          abm++;
          break;
        case "HUMSS":
          humss++;
          break;
        case "STEM":
          stem++;
          break;
        case "GAS":
          gas++;
          break;
      }
    });

    const strands = [
      { name: "ABM", count: abm },
      { name: "HUMSS", count: humss },
      { name: "STEM", count: stem },
      { name: "GAS", count: gas }
    ];
    
    // Sort strands array in descending order based on count
    strands.sort((a, b) => b.count - a.count);
    
    let recommendedStrand = "";
    let maxCount = strands[0].count;
    
    // Find the recommended strand(s)
    const recommendedStrands = strands.filter(strand => strand.count === maxCount);
    recommendedStrands.forEach((strand, index) => {
      recommendedStrand += strand.name;
      if (index < recommendedStrands.length - 1) {
        recommendedStrand += " or ";
      }
    });

    // Generate the result message
    const resultMessage = `Your recommended strand is ${recommendedStrand}.`;

    // Show the modal with the result message
    const modalContentElement = document.querySelector("#modalContent");
    modalContentElement.innerHTML = resultMessage;
    $('#resultModal').modal('show');

    // Disable the submit button
    submitBtn.disabled = true;
  });
});