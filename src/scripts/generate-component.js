const { exec } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter the component name: ", (componentName) => {
  if (!componentName.trim()) {
    console.log("Component name cannot be empty!");
    rl.close();
    return;
  }

  const componentPath = `shared/components/${componentName}`;
  exec(`ng generate component ${componentPath} --skip-tests`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${stderr}`);
    } else {
      console.log(stdout);
    }
    rl.close();
  });
});
