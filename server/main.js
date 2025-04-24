import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

const mockUser = {
  username: "meteorite",
  password: "password",
};

Meteor.startup(async () => {
  const alreadyExists = await Accounts.findUserByUsername(mockUser.username);

  if (!alreadyExists) {
    await Accounts.createUser(mockUser);
  }
});
