document.addEventListener("DOMContentLoaded", function() {
    // Function to handle form submission
    function handleFormSubmission(event, labelName) {
      event.preventDefault();
  
      const formData = new FormData(event.target);
  
      const message = formData.get('message');
  
      if (message.length > 280) {
        const messageField = event.target.querySelector('textarea[name="message"]');
        messageField.style.border = "2px solid red";
        alert("Message exceeds 280 characters limit.");
        return;
      }
  
      const data = {
        "first-name": formData.get('first-name'),
        "last-name": formData.get('last-name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        interest: formData.get('interest'),
        message: message,
        label_names: [labelName]
      };
  
      fetch("https://hox-create-contact.netlify.app/.netlify/functions/create-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          alert("Contact created successfully!");
        } else {
          alert("Error: " + result.message);
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while submitting the form.");
      });
    }
  
    // Get the forms
    const investorForm = document.getElementById("wf-form-Investor-inquiry");
    const alphaUsageForm = document.getElementById("wf-form-Alpha-usage");
  
    // Add event listeners to the forms
    if (investorForm) {
      investorForm.addEventListener("submit", function(event) {
        handleFormSubmission(event, "investor_inquiry");
      });
    }
  
    if (alphaUsageForm) {
      alphaUsageForm.addEventListener("submit", function(event) {
        handleFormSubmission(event, "alpha_usage");
      });
    }
  });
  