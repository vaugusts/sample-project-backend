const { ObjectId } = require('mongodb');
const Message = require('./message');

class MessageProvider {
  /**
   *
   * @param {Collection} db
   */
  constructor(db) {
    this.db = db;
  }

  findById(id) {
    return this.db.findOne({ _id: ObjectId(id) }).then(MessageProvider.factory);
  }

  async create(message) {
    const inserted = await this.db.insertOne({
      content: message.content,
      userId: message.userId,
      createdAt: new Date().getTime(),
    });
    return MessageProvider.factory(inserted.ops[0]);
  }

  async update(id, message) {
    const inserted = await this.db.updateOne({ _id: ObjectId(id) }, ...message);
    return MessageProvider.factory(inserted.ops[0]);
  }

  async find(condition) {
    const messages = await this.db.find(condition).toArray();
    return messages.map(MessageProvider.factory);
  }

  static factory(rawData) {
    if (!rawData) {
      return null;
    }
    const message = new Message(rawData._id);
    message.content = rawData.content;
    message.userId = rawData.userId;
    message.createdAt = rawData.createdAt;
    return message;
  }
}

module.exports = MessageProvider;
