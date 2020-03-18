const { isEmpty, pickBy, identity } = require('lodash');
const { createMessage, updateMessage } = require('../validationSchema');

module.exports = {
  Query: {
    message: (_, { id }, { messageProvider }) => messageProvider.findById(id),
    messageList: async (_, args, { messageProvider }) => {
      if (isEmpty(args)) {
        return messageProvider
          .find({ query: { }, page: { limit: 10, skip: 0 } });
      }
      const {
        query: {
          searchText, userId, limit, skip,
        },
      } = args;
      const content = !isEmpty(searchText) ? new RegExp(`${searchText}`) : null;
      return messageProvider
        .find({ query: pickBy({ content, userId }, identity), page: { limit, skip } });
    },
  },
  Mutation: {
    createMessage: {
      validationSchema: createMessage,
      resolve: (source, { message }, { messageProvider, req }) => messageProvider.create({
        ...message,
        userId: req.user.id,
      }),
    },
    updateMessage: {
      validationSchema: updateMessage,
      resolve: (_, { message }, { messageProvider }) => messageProvider.update(message.id, message),
    },
    deleteMessage: (_, { id }, { messageProvider }) => messageProvider.delete(id),
  },
};
