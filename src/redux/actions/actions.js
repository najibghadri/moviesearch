export const MESSAGE = "MESSAGE";
export const HELLO = "HELLO";
export const NEW_ROOM = "NEW_ROOM";
export const USER_JOINED = "USER_JOINED";
export const ROOM_UPDATE = "ROOM_UPDATE";
export const USER_UPDATE = "USER_UPDATE";
export const USER_LEFT = "USER_LEFT";

export function message(message) {
  return { type: MESSAGE, message: message };
}

export function new_room(room) {
  return { type: NEW_ROOM, room: room };
}

export function user_joined(user) {
  return { type: USER_JOINED, user: user };
}

export function room_update(room) {
  return { type: ROOM_UPDATE, room: room };
}
export function user_left(userid) {
  return { type: USER_LEFT, userid: userid };
}

export function user_update(user) {
  return { type: USER_UPDATE, user: user };
}

export function hello(me) {
  return { type: HELLO, me: me };
}

