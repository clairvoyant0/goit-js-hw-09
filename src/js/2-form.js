const form = document.querySelector(".feedback-form");

const formData = {
    email: "",
    message: ""
};

form.addEventListener("input", () => {
    const dataForm = new FormData(form);
    formData.email = dataForm.get("email") || "";
    formData.message = dataForm.get("message") || "";
    
    saveToLocalStorage("feedback-form-state", formData);
});

function saveToLocalStorage(key, value) {
    try {
        const jsonData = JSON.stringify(value);
        localStorage.setItem(key, jsonData);
    } catch (error) {
        console.error("Error saving to localStorage", error);
    }
}

function getFromLocalStorage(key) {
    const json = localStorage.getItem(key);
    try {
        return JSON.parse(json);
    } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
        return null;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const data = getFromLocalStorage('feedback-form-state');

    if (data) {
        form.elements.email.value = data.email || "";
        form.elements.message.value = data.message || "";
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (formData.email === "" || formData.message === "") {
        alert('Please fill in all fields');
        return;
    }

    console.log("Email:", formData.email);
    console.log("Message:", formData.message);

    localStorage.removeItem("feedback-form-state"); 
    formData.email = '';
    formData.message = '';
    form.reset();
});