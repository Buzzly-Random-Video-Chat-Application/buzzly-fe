import { createContext, useContext } from 'react';
import { Socket } from 'socket.io-client';
import { TYPE } from '@enums/video-chat';

interface SocketContextType {
  socket: Socket;
  isConnected: boolean;
  onlineCount: number;
  // Livestream listeners
  onGuestJoined: (handler: (data: { guestUserId: string; guestSocketId: string }) => void) => void;
  onGuestLeft: (handler: (data: { guestUserId: string; guestSocketId: string }) => void) => void;
  onReceiveMessage: (handler: (data: { message: string; type: TYPE; senderId: string }) => void) => void;
  onHostIceReply: (handler: (data: { candidate: RTCIceCandidateInit; from: string }) => void) => void;
  onHostSdpReply: (handler: (data: { sdp: RTCSessionDescriptionInit; from: string }) => void) => void;
  onEndLivestream: (handler: () => void) => void;
  onNextLivestream: (handler: () => void) => void;
  onStartedLivestream: (handler: (data: { livestreamId: string }) => void) => void;
  // Random chat listeners
  onRcIceReply: (handler: (data: { candidate: RTCIceCandidateInit; from: string }) => void) => void;
  onRcSdpReply: (handler: (data: { sdp: RTCSessionDescriptionInit; from: string }) => void) => void;
  onRcGetMessage: (handler: (input: string, type: TYPE) => void) => void;
  onRcEndChat: (handler: () => void) => void;
  onRcNextChat: (handler: () => void) => void;
  onRcRemoteSocket: (handler: (data: { socketId: string; userId: string }) => void) => void;
  onRcRoomId: (handler: (roomId: string) => void) => void;
  onRcDisconnected: (handler: () => void) => void;
  onError: (handler: (msg: string) => void) => void;
  // Emit functions
  emitRcStart: (selectedGender: string, selectedCountry: string, callback: (role: TYPE) => void) => void; // Changed string to TYPE
  emitRcIceSend: (candidate: RTCIceCandidateInit, to: string) => void;
  emitRcSdpSend: (sdp: RTCSessionDescriptionInit, to: string) => void;
  emitRcSendMessage: (input: string, type: TYPE, roomId: string) => void;
  emitRcEndChat: (roomId: string) => void;
  emitRcNextChat: (roomId: string) => void;
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
