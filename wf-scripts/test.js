document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("wf-form-Investor-inquiry");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const formData = new FormData(form);

  
      const data = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        interest: formData.get('interest'),
        message: formData.get('message'),
        label_names: 'investor_inquiry"'
      };
  
      fetch("https://api.apollo.io/v1/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer F1ylxgjzNqFcVmrxp7XNWQ` // Use your actual API key here
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
    });
  });
  