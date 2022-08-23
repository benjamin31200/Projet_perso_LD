import chalk from "chalk";
import generator from "generate-password"

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
}

export const definePassword = generator.generate({
	length: 25,
	numbers: true,
  symbols: true
});
