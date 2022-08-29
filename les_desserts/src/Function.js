import chalk from "chalk";
import generator from "generate-password";
import Swal from "sweetalert2";

export const baseText = (ppTexte) => {
  const getSmallText = ppTexte.split(" ");
  const arrayText = [];
  for (let i = 0; i < 19; i++) {
    arrayText.push(getSmallText[i]);
  }
  const newText = arrayText.join(" ") + "...";
  return newText;
};

export const chalkFunc = {
  error: console.error,
  log: console.log,
  bad: chalk.bold.underline.red,
  success: chalk.bold.underline.green,
};

export const deleteBlank = (data) => {
  return data.split(" ").join("");
};

export const definePassword = generator.generate({
  length: 25,
  numbers: true,
  symbols: true,
});

const changeColor = (label) => {
  const labelArray = ["email", "password", "repeat_password", "name", "lastname", "pseudonyme"];
  if (label) {
    const filteredLabel = labelArray.filter((element) => element !== label);
    for (const element of filteredLabel) {
      const reset = document.getElementById(element);
      reset.style.borderColor = "#d9d9d9";
      reset.style.borderWidth = "revert";
    }
  }
  const showErr = document.getElementById(label);
  showErr.style.borderStyle = "inset";
  showErr.style.borderColor = "red";
  showErr.style.borderWidth = "medium";
};

export const errorMessageSignUp = (array) => {
  if (array[0].value === "") {
    Swal.showValidationMessage(`${array[0].label} ne doit pas être vide`);
    changeColor(array[0].label);
  } else if (array[0].limit === 3 || array[0].limit === 7) {
    Swal.showValidationMessage(
      `${array[0].label} doit être supérieur à ${array[0].limit}`
    );
    changeColor(array[0].label);
  } else if (array[0].limit === 50 || array[0].limit === 100) {
    Swal.showValidationMessage(
      `${array[0].label} doit être inférieur à ${array[0].limit}`
    );
    changeColor(array[0].label);
  } else if (array[0].invalids) {
    Swal.showValidationMessage(`l'${array[0].label} n'est pas conforme`);
    changeColor(array[0].label);
  } else if (array[0].valids) {
    Swal.showValidationMessage(`${array[0].label} doit être identique`);
    changeColor(array[0].label);
  }
};
