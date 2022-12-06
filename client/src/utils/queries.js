import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
  me {
    _id
    username
    email
    savedBooks{
      _id
      authors
      description
      bookId
      image
      link 
      title
    }
  }
}
`;

//Not sure here, but something like this to get the me object