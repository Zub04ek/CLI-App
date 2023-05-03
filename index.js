const {listContacts, getContactById, addContact, removeContact} = require('./contacts');

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const allContacts = await listContacts();
          console.log('allContacts', allContacts);
      break;

    case "get":
          const contact = await getContactById(id);
          console.log('contact', contact)
      break;

    case "add":
          const newContact = await addContact(name, email, phone);
          console.log('newContact', newContact);
      break;

    case "remove":
          const deletedContact = await removeContact(id);
          console.log('deletedContact', deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// invokeAction({action: "list"});
// invokeAction({action: "get", id: "C9sjBfCo4UJCWjzBnOtxl"});
// invokeAction({ action: "add", name: "David", email: "david@mail.com", phone: "(066) 352-6703" });
// invokeAction({action: "remove", id: "6UOZIWrxmqlv74T9qL2RN"});