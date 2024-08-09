#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.bgGreenBright("\n @@@ WELCOME TO THE OOP MY BANK ACCOUNT SYSTEM 🏧 @@@ \n"));
// Bank Account Interface
interface BankAccount {
    accountNumber: number;
    balance: number;
    deposit(amount: number): void;
    withdraw(amount: number): void;
    checkBalance(): void;
}

// Bank Account Class
class BankAccount implements BankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    // Debit Money
    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.bold.bgGreenBright(`\n Successfully withdrew ${amount}. Your remaining balance is ${this.balance} \n`));
        } else {
            console.log(chalk.bold.bgRedBright('\n Insufficient Balance. \n'));
        }
    }

    // Credit Money
    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(chalk.bold.bgGreenBright(`\n Successfully deposited ${amount}. Your remaining balance is ${this.balance} \n`));
    }

    // Check Balance
    checkBalance(): void {
        console.log(chalk.bold.bgBlueBright(`\n Current Balance: ${this.balance} \n`));
    }
}

// Customer Class
class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

// Create Bank Accounts
const accounts: BankAccount[] = [
    new BankAccount(1001, 2900),
    new BankAccount(1002, 2256),
    new BankAccount(1003, 2991),
];

// Create Customers
const customers: Customer[] = [
    new Customer('Junaid', 'Shah', 'Male', 25, 9876543210, accounts[0]),
    new Customer('Amina', 'Hassan', 'Female', 30, 9999999999, accounts[1]),
    new Customer('Bilwal', 'Khan', 'Male', 23, 8888888888, accounts[2]),
];

// Function to interact with Bank Account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: 'bankAccountNumber',
            type: 'number',
            message: 'Enter your Bank Account Number:',
        });

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.bankAccountNumber);

        if (customer) {
            console.log(chalk.bold.bgMagentaBright(`\n Welcome ${customer.firstName} ${customer.lastName}! \n`));
            const ans = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'select',
                    message: 'Choose an Option:',
                    choices: [
                        'Deposit',
                        'Withdraw',
                        'Check Balance',
                        'Exit',
                    ],
                }
            ]);

            switch (ans.select) {
                case 'Deposit':
                    const depositAmount = await inquirer.prompt({
                        name: 'depositAmount',
                        type: 'number',
                        message: 'Enter the amount to deposit:',
                    });
                    customer.account.deposit(depositAmount.depositAmount);
                    break;
                case 'Withdraw':
                    const withdrawAmount = await inquirer.prompt({
                        name: 'withdrawAmount',
                        type: 'number',
                        message: 'Enter the amount to withdraw:',
                    });
                    customer.account.withdraw(withdrawAmount.withdrawAmount);
                    break;
                case 'Check Balance':
                    customer.account.checkBalance();
                    break;
                case 'Exit':
                    console.log(chalk.bold.bgRedBright('\n Exiting Bank Program... \n'));
                    console.log(chalk.bold.italic.bgYellowBright('\n Thank you for using our Banking System! Have a great day! \n'));
                    return;
            }
        } else {
            console.log(chalk.bold.bgRedBright('\n Invalid Account Number. Please try again. \n'));
            process.exit();
        }
    } while (true);
}

service();