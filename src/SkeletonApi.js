// stubs
export function getRoomName( roomId ) {
    return getRoomDetails( roomId, "deadbeef" ).roomName;
}
  
export function getRoomDetails( roomId, userId ) {
  return {
    currentUserId: userId,
    currentUserName: "Dominic S.",
    otherUsers: [ "Weiyoung", "Bereket" ],
    roomId: roomId,
    roomName: "Choral Reef",
    myNiches: [ { nicheName: "K-Pop", currentSupport: 1, supportRequired: 4, memberIds: null }, { nicheId: "abcdefgh", nicheName: "Vocal Jazz", currentSupport: 3, supportRequired: 3, members: [ "Weiyoung", "Dominic S.", "Bereket" ] } ],
    otherNiches: [ { nicheName: "Hockey", currentSupport: 3, supportRequired: 4 } ]
  };
}

export function getRoomIdFromName( roomName ) {
  return { id: "abc123" };
}

export function createRoom( roomId, roomName ) {
  return {};
}
