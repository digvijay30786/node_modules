var events = require('events');
const readline = require('readline');
var eventEmitter = new events.EventEmitter();

var bookArra = ['The Peacefull Mind', 'Ramayan', 'Geeta'];

eventEmitter.on("Menu", () => {
    console.log('***********************');
    console.log("* 1 - Show all books  *");
    console.log("* 2 - Add a new book  *");
    console.log("* 3 - Quit            *");
    console.log('***********************');
})

eventEmitter.on("showBook", () => {
    bookArra.map((book,i) => {
        console.log(i+1+'. '+book)
    })
});



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


eventEmitter.on("question", () => {
    rl.question('Choose any Menu Digit : \n', (digit) => {

        if(digit == 1) {
            console.log('++++++++++++++++++++++++');
            console.log("Complete Book List : \n");
            eventEmitter.emit("showBook");
            console.log('++++++++++++++++++++++++');
            console.log('\n');
            eventEmitter.emit("Menu");
            eventEmitter.emit("question");
        }
        else if(digit == 2)
        {
            rl.question("Enter your Book Name : \n", (bookname) => {
                bookArra.push(bookname);
                console.log("add your book in our Stock : \n");
                console.log('***********************');
                eventEmitter.emit("showBook");
                console.log('***********************');
                eventEmitter.emit("Menu");
                eventEmitter.emit("question");
            })
        }

        else if (digit == 3)
        {
            rl.setPrompt("Are you sure you want to quit - press Y to quit : \n");
            rl.prompt();
            rl.on('line', (value) =>
            {
                value = value.trim();
                if (value == "Y") {
                    rl.close();
                }
                else
                {
                    eventEmitter.emit("Menu");
                    eventEmitter.emit("question");
                }
            })
        }

        else {
            console.log("You have selected an invalid entry so please press 1, 2 or 3");
            eventEmitter.emit("Menu");
            eventEmitter.emit("question");
        }

    });
})


eventEmitter.emit("Menu");
eventEmitter.emit("question");

rl.on("close", () => {
    console.log("bye bye !! We will meet Again");
    process.exit(0);
});

