import inquirer from "inquirer";
import chalk from 'chalk';
let todo_Flag = true;
const task = [""];
console.log(chalk.yellowBright("\n=========================================\n\t\tTODO LIST\t\t\n=========================================\n"));
console.log(chalk.yellowBright("TODO LIST :", task));
// Use splice to remove the empty string at index 0
task.splice(0, 1); // Remove 1 element starting at index 0
function displayTasks(task) {
    const totalTasks = task.length;
    console.log(chalk.cyanBright("\n=========================================\n\t\tPENDING TASKS\t\t\n=========================================\n"));
    for (let i = 0; i < totalTasks; i++) {
        console.log(chalk.redBright("\n-----------------------------------------------\n", i + 1, ". ", task[i], "\n-----------------------------------------------"));
    }
    if (totalTasks === 0) {
        console.log(chalk.cyanBright("NO PENDING TASKS"));
    }
    console.log(chalk.cyanBright("\n=========== END OF LIST ============\n"));
}
displayTasks(task);
while (todo_Flag) {
    console.clear();
    console.log(chalk.yellowBright("\n=========================================\n\t\tTODO LIST\t\t\n=========================================\n"));
    console.log(chalk.yellowBright("TODO LIST :", task));
    const todoList = await inquirer.prompt([
        {
            type: "list",
            name: "Opt",
            message: "Select an option in TODO LIST ",
            choices: ["[.] VIEW PENDING TASKS", "[+] ADD NEW TASK", "[-] MARK TASK AS DONE", "[x] Exit"]
        },
    ]);
    if (todoList.Opt == "[+] ADD NEW TASK") {
        let option_flag = true;
        while (option_flag) {
            const todoList = await inquirer.prompt([
                {
                    type: "String",
                    name: "todoTask",
                    message: "Enter the Task Description to do : ",
                },
                {
                    type: "number",
                    name: "Priority",
                    message: "Enter Tasks's Priority number : ",
                }
            ]);
            task.splice(todoList.Priority - 1, 0, todoList.todoTask); // Add "X" and "Y" at index 2
            //console.log(task)
            displayTasks(task);
            const { option_loop } = await inquirer.prompt([
                {
                    type: "confirm",
                    name: "option_loop",
                    message: "Add Another Task in the list ?",
                    default: true
                }
            ]);
            option_flag = option_loop;
        }
    }
    else if (todoList.Opt == "[.] VIEW PENDING TASKS") {
        displayTasks(task);
    }
    else if (todoList.Opt == "[-] MARK TASK AS DONE") {
        let option_flag = true;
        while (option_flag) {
            const complete = await inquirer.prompt([
                {
                    type: "list",
                    name: "Opt",
                    message: "Select to Mark Task As completed and Delete it from TO do List ",
                    choices: task
                },
            ]);
            const totalTasks = task.length;
            for (let i = 0; i < totalTasks; i++) {
                if (complete.Opt == task[i]) {
                    console.log(chalk.greenBright("\n=======================\n"));
                    console.log(chalk.greenBright(task[i], " Marked Completed"));
                    console.log(chalk.greenBright("\n=======================\n"));
                    task.splice(i, 1);
                }
            }
            displayTasks(task);
            const { option_loop } = await inquirer.prompt([
                {
                    type: "confirm",
                    name: "option_loop",
                    message: "Mark Another complete ?",
                    default: true
                }
            ]);
            option_flag = option_loop;
        }
    }
    else if (todoList.Opt == "[x] Exit") {
        break;
    }
    const { todo_Loop } = await inquirer.prompt([
        {
            type: "confirm",
            name: "todo_Loop",
            message: "Go back to TODO list Options? Press any key To Continue.. n to Exit",
            default: true
        }
    ]);
    todo_Flag = todo_Loop;
}
