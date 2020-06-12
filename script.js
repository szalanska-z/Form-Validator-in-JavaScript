const userName = document.getElementById("username");
const password = document.getElementById("password");
const repeatPass = document.getElementById("password2");
const address = document.getElementById("email");
const clearBtn = document.querySelector(".clear");
const sendBtn = document.querySelector(".send");
const closeBtn = document.querySelector(".close");
const popUp = document.querySelector(".popup");

const showError = (input, msg) => {
  const formBox = input.parentElement;
  const errorMsg = formBox.querySelector(".error-text");
  formBox.classList.add("error");
  errorMsg.textContent = msg;
};

const clearError = (input) => {
  const formBox = input.parentElement;
  formBox.classList.remove("error");
};

const checkForm = (input) => {
  input.forEach((element) => {
    if (element.value === "") {
      showError(element, element.placeholder);
    } else {
      clearError(element);
    }
  });
};

const checkLength = (input, min) => {
  if (input.value.length < min) {
    showError(
      input,
      `${input.previousElementSibling.innerText.slice(
        0,
        -1
      )} składa się z min. ${min} znaków`
    );
  }
};

const checkPassword = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showError(pass2, "Hasła do siebie nie pasują");
  }
};

const checkMail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value)) {
    clearError(email);
  } else {
    showError(email, "E-mail jest niepoprawny");
  }
};

const checkErrors = () => {
  const allInputs = document.querySelectorAll(".form-box");
  let errorCount = 0;

  allInputs.forEach((element) => {
    if (element.classList.contains("error")) {
      errorCount++;
    }
  });
  if (errorCount === 0) {
    popUp.classList.add("show-popup");
  }
};

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkForm([userName, password, repeatPass, address]);
  checkLength(userName, 3);
  checkLength(password, 8);
  checkPassword(password, repeatPass);
  checkMail(address);
  checkErrors();
});

clearBtn.addEventListener("click", () => {
  [userName, password, repeatPass, address].forEach((input) => {
    input.value = "";
    clearError(input);
  });
});
