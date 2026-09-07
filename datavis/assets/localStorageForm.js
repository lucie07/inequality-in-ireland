document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("registration_form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // get selected radio values
        var priorKnowledgeInput = document.querySelector(
            'input[name="priorKnowledge"]:checked'
        );

        var purposeInput = document.querySelector(
            'input[name="purpose"]:checked'
        );

        // validate required questions
        if (!priorKnowledgeInput || !purposeInput) {
            alert("Please fill in the form.");
            return;
        }

        var priorKnowledge = priorKnowledgeInput.value;
        var purpose = purposeInput.value;

        // store topic selections
        var topicValues = [
            "labour",
            "demographic",
            "education",
            "health",
            "social"
        ];

        var topics = {};

        topicValues.forEach(function (topic) {
            if (document.getElementById(topic).checked) {
                topics[topic] = "yes";
            } else {
                topics[topic] = "no";
            }
        });

        localStorage.setItem(
            "topics",
            JSON.stringify(topics)
        );

        localStorage.setItem(
            "purpose",
            purpose
        );

        localStorage.setItem(
            "priorKnowledge",
            priorKnowledge
        );

        // replace the old Express redirects
        if (priorKnowledge === "no") {
            window.location.href = "./about.html";
        } else if (purpose === "professional") {
            window.location.href = "./Exploration.html";
        } else {
            window.location.href =
                "./generalStory/generalStory.html";
        }
    });
});