

module.exports = {
  Query: {
    customer:  (_, { id }, { container }) => container.resolve('customerProvider').create(id, container),
    // customer: (() => "asdasd"),
  },

  Mutation: {
    createCustomer: {
      // resolve: (_, { user }, { container }) => container.resolve('authService').register(user),
      resolve: (_, { customer }, { container }) => container.resolve('customerProvider').create(customer),
    }
  },
};
