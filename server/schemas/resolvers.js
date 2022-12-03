// Define the query and mutation functionality to work with the Mongoose models.

// 		**Hint**: Use the functionality in the `user-controller.js` as a guide.


const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');


//WITH HELP FROM STU ACTIVITY 26

//IDK WHEN WE WOULD WANT A QUERY AND WHEN A MUTATION - CAN EVERYTHING BE A MUTATION HERE?

const resolvers = {
  Query: {
    //NEEDS WORK

    //NOT SURE IF I AM IN THE RIGHT PLACE BUT I WANT TO GET ONE USER AND POPULATE THE SAVEDBOOKS THEY HAVE
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('savedBooks');
    },
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    },
    book: async (parent, { thoughtId }) => {
      return Book.findOne({ _id: thoughtId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    //THIS MAY BE THE SAME
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    //THIS MAY ALSO BE THE SAME
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    //CAN WE MANIPULATE THIS TO ADD THE BOOK TO THE USER ON CLICK?
    addBook: async (parent, { book }, context) => {
      if (context.user) {
        const book = await Book.create({
          //on click of that book no create it already exist
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookSchema //THIS IS WRONG - BUT IT IS LIKE THIS kindof
        } }
        );

        return book;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    //SAME AS ABOVE BUT DELETE BOOK FROM USER
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const book = await Book.findOneAndDelete({
          _id: bookId
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookSchema // need to drill in to : bookId or something after this somehow I think
         } }
        );

        return book;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
