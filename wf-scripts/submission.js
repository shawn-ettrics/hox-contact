document.addEventListener("DOMContentLoaded", function() {
    function handleFormSubmission(event, labelName) {
      event.preventDefault();
  
      const formData = new FormData(event.target);
  
      const data = {
        "first-name": formData.get('first-name'),
        "last-name": formData.get('last-name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        interest: formData.get('interest'),
        message: formData.get('message'),
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
  
    function validateMessageLength(event) {
      const messageField = event.target;
      const submitButton = messageField.closest('form').querySelector('button[type="submit"]');
      if (messageField.value.length > 280) {
        messageField.style.border = "2px solid red";
        submitButton.disabled = true;
      } else {
        messageField.style.border = "";
        submitButton.disabled = false;
      }
    }
  
    const messageFields = document.querySelectorAll('textarea[name="message"]');
    messageFields.forEach(field => {
      field.addEventListener('input', validateMessageLength);
    });
  
    const investorForm = document.getElementById("wf-form-Investor-inquiry");
    const alphaUsageForm = document.getElementById("wf-form-Alpha-usage");
  
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
  