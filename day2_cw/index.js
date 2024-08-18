const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface(process.stdin, process.stdout);
const tasksFilePath = path.join(__dirname, "tasks.txt");

function askQuestion(query) {
  return new Promise((resolve) =>
    rl.question(query, (choice) => resolve(choice))
  );
}
const addTask = async () => {
  const task = await askQuestion("Enter Task: ");
  try {
    fs.accessSync(tasksFilePath);
    fs.appendFileSync(tasksFilePath, `${task}\n`);
    console.log("Task added successfully.");
  } catch (err) {
    if (err.code === "ENOENT") {
      fs.writeFileSync(tasksFilePath, `${task}\n`);
      console.log("Task added successfully.");
    } else {
      console.error("Error accessing or writing to file.");
      return;
    }
  }
};
const viewTasks = () => {
  try {
    const tasks = fs.readFileSync(tasksFilePath, "utf8");
    const taskSplit = tasks.split("\n").slice(0, -1);
    console.log("Tasks Are: ");
    taskSplit.map((task, index) => console.log(`${index + 1}. ${task}`));
  } catch (err) {
    console.log("No tasks found.");
    return;
  }
};
const markTaskComplete = async () => {
  const index = await askQuestion("Enter Task Number: ");
  try {
    const tasks = fs.readFileSync(tasksFilePath, "utf8");
    const taskSplit = tasks.split("\n");
    if (index > taskSplit.length - 1 || index < 1) {
      console.log("Invalid Task Number");
      return;
    }
    taskSplit[index - 1] = `[x] ${taskSplit[index - 1]}`;
    fs.writeFileSync(tasksFilePath, taskSplit.join("\n"));

    console.log("Task marked as complete.");

    viewTasks();
  } catch (err) {
    console.log("No task found.");
    return;
  }
};
const removeTask = async () => {
  const index = await askQuestion("Enter Task Number: ");
  try {
    const tasks = fs.readFileSync(tasksFilePath, "utf8");
    const taskSplit = tasks.split("\n");
    if (index > taskSplit.length - 1 || index < 1) {
      console.log("Invalid Task Number");
      return;
    }
    taskSplit.splice(index - 1, 1);
    fs.writeFileSync(tasksFilePath, taskSplit.join("\n"));
    console.log("Task removed successfully.");
    viewTasks();
  } catch (err) {
    console.log("No task found.");
    return;
  }
};

async function main() {
  while (true) {
    console.log("\n1. Add a new task");
    console.log("2. View a list of tasks");
    console.log("3. Mark a task as complete");
    console.log("4. Remove a task");
    console.log("5. Exit");

    const choice = await askQuestion("Enter Your Choice: ");

    switch (choice) {
      case "1":
        await addTask();
        break;
      case "2":
        viewTasks();
        break;
      case "3":
        await markTaskComplete();
        break;
      case "4":
        await removeTask();
        break;
      case "5":
        console.log("Goodbye!");
        rl.close();
        return;
      default:
        console.log("Invalid Choice");
        break;
    }
  }
}

main();
