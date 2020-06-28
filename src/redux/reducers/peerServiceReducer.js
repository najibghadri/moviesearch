import {
  CALL_STATUS,
  USER_CALL_STATUS
} from "../actions/peerServiceActions";

const initPeerStuff = {
  inCall: false,
  users: {},
};

function peerServiceReducer(peerStuff = initPeerStuff, action) {
  switch (action.type) {
    case USER_CALL_STATUS:
      return {
        ...peerStuff,
        users: {
          ...peerStuff.users,
          [action.userid]: {
            ...peerStuff.users[action.userid],
            inCall: action.inCall,
          },
        },
      };
    case CALL_STATUS:
      return {
        ...peerStuff,
        inCall: action.inCall,
      };
    default:
      return peerStuff;
  }
}

export default peerServiceReducer;
