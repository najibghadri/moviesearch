import {
  HELLO,
  MESSAGE,
  NEW_ROOM,
  ROOM_UPDATE,
  USER_JOINED,
  USER_LEFT,
  USER_UPDATE,
} from "../actions/actions";
import { combineReducers } from "redux";

import activityReducer from "./activityReducer";
import peerServiceReducer from "./peerServiceReducer";

import Cookies from "universal-cookie";

import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-avataaars-sprites";
let options = { base64: true };
let avatars = new Avatars(sprites, options);

function userSvgInit(user, prevUser) {
  if (prevUser && user && prevUser.svg && user.avatarSeed === prevUser.avatarSeed) {
    user.svg = prevUser.svg;
  } else {
    user.svg = avatars.create(user.avatarSeed);
  }
}

function messagesReducer(messages = [], action) {
  switch (action.type) {
    case MESSAGE:
      return [...messages, action.message];
    default:
      return messages;
  }
}

// function usersReducer (users = {}, action){
//   switch (action.type) {
//     case ROOM_UPDATE:
//       Object.values(action.room.members).forEach((user) =>
//         userSvgInit(user, users[user.id])
//       );
//       return {
//         ...users,
//         ...action.room.members
//       }
//   }
// }

const initialRoom = {
  id: "",
  name: "",
  members: {},
  memberCount: 0,
};

function roomReducer(room = initialRoom, action) {
  switch (action.type) {
    case NEW_ROOM:
      return action.room;
    case ROOM_UPDATE:
      Object.values(action.room.members).forEach((user) =>
        userSvgInit(user, room.members[user.id])
      );
      return action.room;
    case USER_JOINED:
      userSvgInit(action.user);
      return {
        ...room,
        members: {
          ...room.members,
          [action.user.id]: action.user,
        },
        memberCount: room.memberCount + 1,
      };
    case USER_LEFT:
      return {
        ...room,
        members: {
          ...room.members,
          [action.userid]: undefined,
        },
        memberCount: room.memberCount - 1,
      };
    case USER_UPDATE:
      userSvgInit(action.user, room.members[action.user.id]);
      return {
        ...room,
        members: {
          ...room.members,
          [action.user.id]: action.user,
        },
      };
    default:
      return room;
  }
}

const initMe =  {
  id: '',
  name: '',
  avatarSeed: ''
};

const cookies = new Cookies();

function updateCookies(newMe){
  cookies.set("id", newMe.id);
  cookies.set("name", newMe.name);
  cookies.set("avatarSeed", newMe.avatarSeed);
}

function helloReducer(me = initMe, action) {
  switch (action.type) {
    case HELLO:
      userSvgInit(action.me, me);
      if(process.env.NODE_ENV === "production"){
        updateCookies(action.me)
      }
      return action.me;
    default:
      return me;
  }
}

const reducers = combineReducers({
  room: roomReducer,
  me: helloReducer,
  messages: messagesReducer,
  game: activityReducer,
  peerStuff: peerServiceReducer
});

export default reducers;
