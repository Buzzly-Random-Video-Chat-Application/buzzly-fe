import { createContext, useContext } from 'react';
import { Socket } from 'socket.io-client';
import { TYPE } from '@enums/livestream';

interface SocketContextType {
  socket: Socket;
  isConnected: boolean;
  // Livestream listeners
  onGuestJoined: (handler: (data: { guestUserId: string; guestSocketId: string }) => void) => void;
  onGuestLeft: (handler: (data: { guestUserId: string; guestSocketId: string }) => void) => void;
  onReceiveMessage: (handler: (data: { message: string; type: TYPE; senderId: string }) => void) => void;
  onHostIceReply: (handler: (data: { candidate: RTCIceCandidateInit; from: string }) => void) => void;
  onGuestIceReply: (handler: (data: { candidate: RTCIceCandidateInit; from: string }) => void) => void;
  onHostSdpReply: (handler: (data: { sdp: RTCSessionDescriptionInit; from: string }) => void) => void;
  onGuestSdpReply: (handler: (data: { sdp: RTCSessionDescriptionInit; from: string }) => void) => void;
  onEndLivestream: (handler: () => void) => void;
  onNextLivestream: (handler: (data: { newLivestreamId: string }) => void) => void;
  onStartedLivestream: (handler: (data: { livestreamId: string }) => void) => void;
  onError: (handler: (msg: string) => void) => void;
  // Emit functions
  emitLtStart: (
    livestreamName: string,
    livestreamGreeting: string,
    livestreamAnnouncement: string,
    callback: (livestreamId: string | null) => void,
  ) => void;
  emitLtJoin: (livestreamId: string, callback: (response: { success: boolean; message: string }) => void) => void;
  emitLtSendMessage: (livestreamId: string, message: string, type: TYPE) => void;
  emitLtHostIceSend: (livestreamId: string, candidate: RTCIceCandidateInit, to: string) => void;
  emitLtGuestIceSend: (livestreamId: string, candidate: RTCIceCandidateInit, to: string) => void;
  emitLtHostSdpSend: (livestreamId: string, sdp: RTCSessionDescriptionInit, to: string) => void;
  emitLtGuestSdpSend: (livestreamId: string, sdp: RTCSessionDescriptionInit, to: string) => void;
  emitLtEndLivestream: (livestreamId: string) => void;
  emitLtNextLivestream: (livestreamId: string) => void;
  emitLtLeaveLivestream: (livestreamId: string) => void;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
