export const USER_CALL_STATUS = "USER_CALL_STATUS";
export const CALL_STATUS = "CALL_STATUS";

export function setUserInCall(userid, inCall) {
  return { type: USER_CALL_STATUS, userid: userid, inCall: inCall };
}


export function setInCall(inCall) {
  return { type: CALL_STATUS, inCall: inCall };
}
