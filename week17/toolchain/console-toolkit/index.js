const tty = require('tty');
const ttys = require('ttys');
const { resolve } = require('path');

const stdin = ttys.stdin;
const stdout = ttys.stdout;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

function getChar() {
  return new Promise(resolve => {
    stdin.once('data', function(key) {
      resolve(key);
    })
  })
}

function up(n = 1) {
  stdout.write('\033['+n+'A');
}

function down(n = 1) {
  stdout.write('\033['+n+'B');
}

function right(n = 1) {
  stdout.write('\033['+n+'C');
}

function left(n = 1) {
  stdout.write('\033['+n+'D');
}

void async function() {
  stdout.write('which framework do you want to use?\n');
  let answer = await select(["vue", "react", "angular"]);
  stdout.write('You selected ' + answer + '\n');
  process.exit();
}()

async function select(choices) {
  let selected = 0;
  for (let i = 0; i < choices.length; i++) {
    let choice = choices[i];
    if (i === selected) {
      stdout.write("[x] " + choice + "\n");
    } else {
      stdout.write("[ ] " + choice + "\n");
    }
  }
  up(choices.length);
  right();
  while(true) {
    let char = await getChar();
    if (char === '\u0003') {
      process.exit();
      break;
    }
    if (char === 'w' && selected > 0) {
      stdout.write(" ");
      left();
      selected --;
      up();
      stdout.write("x");
      left();
    }
    if (char === 's' && selected < choices.length - 1) {
      stdout.write(" ");
      left();
      selected ++;
      down();
      stdout.write("x");
      left();
    }
    if (char === '\r') {
      down(choices.length - selected);
      left();
      return choices[selected];
    }
  }
}


// const  readline = require('readline');
// const { read } = require('fs');
// const { rejects } = require('assert');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('What do you think of Node.js?', (answer) => {
//   console.log(`Thank you for your valuable feedback: ${answer}`);

//   rl.close();
// })

// async function ask(question) {
//   return new Promise((resolve, reject) => {
//     rl.question(question, (answer) => {
//       resolve(answer);
//     })
//   })
// }

// void (async function() {
//   console.log(await ask("your project name?"))
// })();