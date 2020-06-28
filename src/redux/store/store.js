import { createStore, compose, applyMiddleware } from "redux";
import reducers from "../reducers/reducers";
import { HELLO, ROOM_UPDATE, USER_JOINED, USER_LEFT, NEW_ROOM } from "../actions/actions";
import { peerService } from "../../services/peerService.js"; //Initialization by import

import Cookies from "universal-cookie";
const cookies = new Cookies();

const id = cookies.get("id");
const name = cookies.get("name");
const avatarSeed = cookies.get("avatarSeed");

const initialState = {
  messages: [],
  me: { // move this and cookies to me reducer
    id: id || "",
    name: name || "",
    avatarSeed: avatarSeed || "",
  },
  room: {
    members: {},
    id: "",
    name: "",
    memberCount: 0,
  },
  // users: {
  //   // change to this sys rather
  // },
};

const peerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === "PEER_DATA") {
    peerService.peerData(action.userid, action.data);
    return action;
  }
  let returnValue = next(action);

  switch (action.type) {
    case USER_JOINED:
      peerService.userJoined(action.user);
      break;
    case USER_LEFT:
      peerService.userLeft(action.userid);
      break;
    case HELLO:
      peerService.hello(getState().me);
      break;
    case ROOM_UPDATE:
      peerService.roomUpdateUsers(getState().room.members);
      break;
    case NEW_ROOM:
      peerService.stopCall();
      break;
    default:
      break;
  }
  return returnValue;
};

const composeEnhancers = process.env.NODE_ENV==="production" ? compose : ( window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) // TODO DEV ONLY // compose

export default createStore(
  reducers,
  initialState,
  composeEnhancers(
    applyMiddleware(peerMiddleware)
  )
); // REMOVE PROD
