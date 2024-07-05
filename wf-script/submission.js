document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("myForm");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        const formData = new FormData(form);

        // Determine the value of label_names based on the class of the second child of the element with id "form-content-tab"
        const formContentTab = document.getElementById("form-content-tab");
        const secondChild = formContentTab.children[1];
        const labelNames = secondChild.classList.contains("current") ? "alpha_usage" : "investor_inquiry";
    
        const data = {
            first_name: formData.get('first-name'),
            last_name: formData.get('last-name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            interest: formData.get('interest'),
            message: formData.get('message'),
            label_names: [labelNames]
        };
    
        fetch("/.netlify/functions/create-contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
        if (result.success) {
            // Handle successful submission
            alert("Contact created successfully!");
        } else {
            // Handle errors
            alert("Error: " + result.message);
        }
        })
        .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while submitting the form.");
        });
    });
});
    
    