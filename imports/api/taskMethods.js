import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";
import { check } from "meteor/check";

Meteor.methods({
  "tasks.insert"(doc) {
    check(doc, {
      name: String,
      description: String,
      status: String,
      isPrivate: Boolean,
      date: String,
    });

    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    return TasksCollection.insertAsync({
      ...doc,
      userId: this.userId,
      createdAt: new Date(),
    });
  },

  async "tasks.remove"(_id) {
    check(_id, String);

    const task = await TasksCollection.findOneAsync(_id);

    if (!task) {
      throw new Meteor.Error("Task not found");
    }

    if (task.userId !== this.userId) {
      throw new Meteor.Error("Not authorized to remove this task");
    }

    return TasksCollection.removeAsync(_id);
  },

  async "tasks.update"({ _id, doc }) {
    check(_id, String);
    check(doc, Object);

    const task = await TasksCollection.findOneAsync(_id);

    if (!task) {
      throw new Meteor.Error("Task not found");
    }

    if (task.userId !== this.userId) {
      throw new Meteor.Error("Not authorized to update this task");
    }

    return TasksCollection.updateAsync(_id, {
      $set: {
        ...doc,
        updatedAt: new Date(),
      },
    });
  },

  /**
   * Retorna o numero total de tasks
   */
  async "tasks.total"(query) {
    const userId = this.userId;
    if (!userId) return 0;

    return TasksCollection.find({
      ...query,
      $or: [{ isPrivate: { $ne: true } }, { userId }],
    }).countAsync();
  },

  /**
   * Atualiza o perfil do usuário logado
   * @param {Object} profile
   * @param {string} profile.name
   * @param {string} profile.email
   * @param {string} profile.birthDate
   * @param {string} profile.sex
   * @param {string} profile.company
   * @param {string} profile.photoBase64
   */
  "user.updateProfile"(profile) {
    check(this.userId, String);
    check(profile, {
      name: String,
      email: String,
      birthDate: String,
      sex: String,
      company: String,
      photoBase64: String,
    });

    Meteor.users.updateAsync(this.userId, {
      $set: {
        "profile.name": profile.name,
        "profile.email": profile.email,
        "profile.birthDate": profile.birthDate,
        "profile.sex": profile.sex,
        "profile.company": profile.company,
        "profile.photoBase64": profile.photoBase64,
      },
    });
  },
});
