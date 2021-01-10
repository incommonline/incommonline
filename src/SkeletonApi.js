// stubs
export function getRoomName( roomId ) {
    return getRoomDetails( roomId, "deadbeef" ).roomName;
}
  
export function getRoomDetails( roomId, userId ) {
    return {
      currentUserId: userId,
      roomId: roomId,
      roomName: "Choral Reef",
      niches: [ { nicheId: "TWwyAzRd", nicheName: "Hockey", isSupportedByUser: false, currentSupport: 3, supportRequired: 4 }, 
                { nicheId: "biiTCxey", nicheName: "K-Pop",  isSupportedByUser: true,  currentSupport: 1, supportRequired: 4 } ],
      subgroups: [ { subgroupId: "abcdefgh", subgroupName: "Vocal Jazz", memberIds: [ "1a2b3c4d", "2a3b4c5d" ] } ]
    };
}