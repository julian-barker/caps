'use strict';

const { io } = require('socket.io-client');
const Chance = require('chance');
const inquirer = require('inquirer');
const confirmReceipt = require('../handlers/receipt');
const sendReceipt = require('../handlers/sendReceipt');

const newPrompt = async () => {
  await inquirer
    .prompt([{
      type: 'list',
      name: 'next',
      message: 'What would you like to do?',  
      choices: ['New package for pickup', 'Exit'],
    }])
    .then(answers => {
      const next = answers.next;
      if(next === 'Exit') {
        return true;
        process.exit();
      } else {
        console.log('\n\nSTARTING SHIPPING PROCESS\n');

        const payload = {
          messageId: chance.guid(),
          from: 'vendor',
          store,
          message: 'New package ready for pickup.',
          orderId: chance.guid(),
          customer: chance.name(),
          address: chance.address(),
        };
        console.log(payload);

        socket.emit('MESSAGE', payload);
        return false;
      }
    })
    .catch((e) => {
      if (e.isTtyError) {
        return;
      } else {
        console.log(e.message);
      }
    });
};

const socket = io('http://localhost:3003/shipping');
const chance = new Chance();

let store;
socket.on('connect', () => {
  console.log(`\nConnected to socket: ${socket.id}`);
  inquirer
    .prompt([{
      type: 'list',
      name: 'store',
      message: 'Which room would you like to join?',
      choices: ['acme-widgets', '1-800-flowers'],
    }])
    .then(answers => {
      store = answers.store;
      socket.emit('JOIN', [store]);
      socket.emit('GET_MESSAGES', {
        from: 'driver',
        stores: [store],
      });
    })
    .then(() => {
      runPrompt();
    })
    .catch((e) => {
      if (e.isTtyError) {
        return;
      } else {
        console.log(e.message);
      }
    });
});

socket.on('MESSAGE', (payload) => {
  console.log('New message!', payload);
  sendReceipt(socket, payload, 'vendor');

  console.log('\nThank You!')
});

socket.on('RECEIVED', (payload) => {
  confirmReceipt(payload);
});

async function runPrompt() {
  let exit = false;
  while(!exit) {
    exit = await newPrompt();
  }
  process.exit();
}

socket.on('disconnect', () => {
  console.log('Disconnected from socket');
  process.exit();
});