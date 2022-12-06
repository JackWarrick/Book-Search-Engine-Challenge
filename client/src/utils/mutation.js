import { gql } from '@apollo/client';

//starting code set up - need to fill with correct code 

export const LOGIN_USER = gql`
  mutation loginUser($tech1: String!, $tech2: String!) {
    createMatchup(tech1: $tech1, tech2: $tech2) {
      _id
      tech1
      tech2
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($_id: String!, $techNum: Int!) {
    createVote(_id: $_id, techNum: $techNum) {
      _id
      tech1
      tech2
      tech1_votes
      tech2_votes
    }
  }
`;


export const SAVE_BOOK = gql`
mutation saveBook($_id: String!, $techNum: Int!) {
  createVote(_id: $_id, techNum: $techNum) {
    _id
    tech1
    tech2
    tech1_votes
    tech2_votes
  }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($_id: String!, $techNum: Int!) {
  createVote(_id: $_id, techNum: $techNum) {
    _id
    tech1
    tech2
    tech1_votes
    tech2_votes
  }
}
`;