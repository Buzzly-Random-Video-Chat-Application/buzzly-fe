/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { SocketContext } from '@hooks/socket.hook';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '@stores/store';
import toast from 'react-hot-toast';
import { TYPE } from '@enums/video-chat';

const VITE_SOCKET = import.meta.env.VITE_SOCKET;

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAppSelector((state) => state.user);
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [onlineCount, setOnlineCount] = useState(0);
    const handlersRef = useRef<{
        guestJoined: Array<(data: { guestUserId: string; guestSocketId: string }) => void>;
        guestLeft: Array<(data: { guestUserId: string; guestSocketId: string }) => void>;
        receiveMessage: Array<(data: { message: string; type: TYPE; senderId: string }) => void>;
        hostIceReply: Array<(data: { candidate: RTCIceCandidateInit; from: string }) => void>;
        hostSdpReply: Array<(data: { sdp: RTCSessionDescriptionInit; from: string }) => void>;
        endLivestream: Array<() => void>;
        nextLivestream: Array<() => void>;
        startedLivestream: Array<(data: { livestreamId: string }) => void>;

        rcIceReply: Array<(data: { candidate: RTCIceCandidateInit; from: string }) => void>;
        rcSdpReply: Array<(data: { sdp: RTCSessionDescriptionInit; from: string }) => void>;
        rcGetMessage: Array<(input: string, type: TYPE) => void>;
        rcEndChat: Array<() => void>;
        rcNextChat: Array<() => void>;
        rcRemoteSocket: Array<(data: { socketId: string; userId: string }) => void>;
        rcRoomId: Array<(roomId: string) => void>;
        rcDisconnected: Array<() => void>;
        error: Array<(msg: string) => void>;
    }>({
        guestJoined: [],
        guestLeft: [],
        receiveMessage: [],
        hostIceReply: [],
        hostSdpReply: [],
        endLivestream: [],
        nextLivestream: [],
        startedLivestream: [],
        rcIceReply: [],
        rcSdpReply: [],
        rcGetMessage: [],
        rcEndChat: [],
        rcNextChat: [],
        rcRemoteSocket: [],
        rcRoomId: [],
        rcDisconnected: [],
        error: [],
    });

    // Initialize socket
    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io(VITE_SOCKET, {
                path: '/v1/socket',
                query: { userId: user?.id },
            });

            socketRef.current.on('connect', () => {
                console.log('Socket connected:', socketRef.current?.id);
                setIsConnected(true);
            });

            socketRef.current.on('disconnect', (reason) => {
                console.log('Socket disconnected:', reason);
                setIsConnected(false);
            });

            socketRef.current.on('online', (count: number) => {
                setOnlineCount(count);
            });

            // Livestream events
            socketRef.current.on('lt_guest-joined', (data: { guestUserId: string; guestSocketId: string }) => {
                handlersRef.current.guestJoined.forEach((handler) => handler(data));
            });

            socketRef.current.on('lt_guest-left', (data: { guestUserId: string; guestSocketId: string }) => {
                handlersRef.current.guestLeft.forEach((handler) => handler(data));
            });

            socketRef.current.on('lt_receive-message', (data: { message: string; type: TYPE; senderId: string }) => {
                handlersRef.current.receiveMessage.forEach((handler) => handler(data));
            });

            socketRef.current.on('lt_ice:reply', (data: { candidate: RTCIceCandidateInit; from: string }) => {
                handlersRef.current.hostIceReply.forEach((handler) => handler(data));
            });

            socketRef.current.on('lt_sdp:reply', (data: { sdp: RTCSessionDescriptionInit; from: string }) => {
                handlersRef.current.hostSdpReply.forEach((handler) => handler(data));
            });

            socketRef.current.on('lt_end-livestream', () => {
                handlersRef.current.endLivestream.forEach((handler) => handler());
            });

            socketRef.current.on('lt_next-livestream', () => {
                handlersRef.current.nextLivestream.forEach((handler) => handler());
            });

            socketRef.current.on('lt_started', (data: { livestreamId: string }) => {
                handlersRef.current.startedLivestream.forEach((handler) => handler(data));
            });

            // Random chat events
            socketRef.current.on('rc:ice:reply', (data: { candidate: RTCIceCandidateInit; from: string }) => {
                handlersRef.current.rcIceReply.forEach((handler) => handler(data));
            });

            socketRef.current.on('rc:sdp:reply', (data: { sdp: RTCSessionDescriptionInit; from: string }) => {
                handlersRef.current.rcSdpReply.forEach((handler) => handler(data));
            });

            socketRef.current.on('rc:receive:message', (input: string, type: TYPE) => {
                handlersRef.current.rcGetMessage.forEach((handler) => handler(input, type));
            });

            socketRef.current.on('rc:end:chat', () => {
                handlersRef.current.rcEndChat.forEach((handler) => handler());
            });

            socketRef.current.on('rc:next:chat', () => {
                handlersRef.current.rcNextChat.forEach((handler) => handler());
            });

            // Additional random chat events
            socketRef.current.on('rc:remote:socket', (data: { socketId: string; userId: string }) => {
                handlersRef.current.rcRemoteSocket.forEach((handler) => handler(data));
            });

            socketRef.current.on('rc:roomid', (roomId: string) => {
                handlersRef.current.rcRoomId.forEach((handler) => handler(roomId));
            });

            socketRef.current.on('rc:disconnect', () => {
                handlersRef.current.rcDisconnected.forEach((handler) => handler());
            });

            // Error handling
            socketRef.current.on('lt_error', (msg: string) => {
                console.error('Livestream error:', msg);
                toast.error(msg);
                handlersRef.current.error.forEach((handler) => handler(msg));
            });

            socketRef.current.on('rc:error', (msg: string) => {
                console.error('Random chat error:', msg);
                toast.error(msg);
                handlersRef.current.error.forEach((handler) => handler(msg));
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
                setIsConnected(false);
                setOnlineCount(0);
            }
        };
    }, []);

    // Define event handler registration functions
    const onGuestJoined = (handler: (data: { guestUserId: string; guestSocketId: string }) => void) => {
        handlersRef.current.guestJoined.push(handler);
    };

    const onGuestLeft = (handler: (data: { guestUserId: string; guestSocketId: string }) => void) => {
        handlersRef.current.guestLeft.push(handler);
    };

    const onReceiveMessage = (handler: (data: { message: string; type: TYPE; senderId: string }) => void) => {
        handlersRef.current.receiveMessage.push(handler);
    };

    const onHostIceReply = (handler: (data: { candidate: RTCIceCandidateInit; from: string }) => void) => {
        handlersRef.current.hostIceReply.push(handler);
    };

    const onHostSdpReply = (handler: (data: { sdp: RTCSessionDescriptionInit; from: string }) => void) => {
        handlersRef.current.hostSdpReply.push(handler);
    };

    const onEndLivestream = (handler: () => void) => {
        handlersRef.current.endLivestream.push(handler);
    };

    const onNextLivestream = (handler: () => void) => {
        handlersRef.current.nextLivestream.push(handler);
    };

    const onStartedLivestream = (handler: (data: { livestreamId: string }) => void) => {
        handlersRef.current.startedLivestream.push(handler);
    };

    const onRcIceReply = (handler: (data: { candidate: RTCIceCandidateInit; from: string }) => void) => {
        handlersRef.current.rcIceReply.push(handler);
    };

    const onRcSdpReply = (handler: (data: { sdp: RTCSessionDescriptionInit; from: string }) => void) => {
        handlersRef.current.rcSdpReply.push(handler);
    };

    const onRcGetMessage = (handler: (input: string, type: TYPE) => void) => {
        handlersRef.current.rcGetMessage.push(handler);
    };

    const onRcEndChat = (handler: () => void) => {
        handlersRef.current.rcEndChat.push(handler);
    };

    const onRcNextChat = (handler: () => void) => {
        handlersRef.current.rcNextChat.push(handler);
    };

    const onRcRemoteSocket = (handler: (data: { socketId: string; userId: string }) => void) => {
        handlersRef.current.rcRemoteSocket.push(handler);
    };

    const onRcRoomId = (handler: (roomId: string) => void) => {
        handlersRef.current.rcRoomId.push(handler);
    };

    const onRcDisconnected = (handler: () => void) => {
        handlersRef.current.rcDisconnected.push(handler);
    };

    const onError = (handler: (msg: string) => void) => {
        handlersRef.current.error.push(handler);
    };

    // Emit functions for client to send events to server
    const emitRcStart = (selectedGender: string, selectedCountry: string, callback: (role: TYPE) => void) => {
        socketRef.current?.emit('rc:start', { selectedGender, selectedCountry }, callback);
    };

    const emitRcIceSend = (candidate: RTCIceCandidateInit, to: string) => {
        socketRef.current?.emit('rc:ice:send', { candidate, to });
    };

    const emitRcSdpSend = (sdp: RTCSessionDescriptionInit, to: string) => {
        socketRef.current?.emit('rc:sdp:send', { sdp, to });
    };

    const emitRcSendMessage = (input: string, type: TYPE, roomId: string) => {
        socketRef.current?.emit('rc:send:message', input, type, roomId);
    };

    const emitRcEndChat = (roomId: string) => {
        socketRef.current?.emit('rc:end:chat', roomId);
    };

    const emitRcNextChat = (roomId: string) => {
        socketRef.current?.emit('rc:next:chat', roomId);
    };

    const emitLtStart = (
        livestreamName: string,
        livestreamGreeting: string,
        livestreamAnnouncement: string,
        callback: (livestreamId: string | null) => void
    ) => {
        socketRef.current?.emit('lt_start', { livestreamName, livestreamGreeting, livestreamAnnouncement }, callback);
    };

    const emitLtJoin = (livestreamId: string, callback: (response: { success: boolean; message: string }) => void) => {
        socketRef.current?.emit('lt_join', { livestreamId }, callback);
    };

    const emitLtSendMessage = (livestreamId: string, message: string, type: TYPE) => {
        socketRef.current?.emit('lt_send-message', { livestreamId, message, type });
    };

    const emitLtHostIceSend = (livestreamId: string, candidate: RTCIceCandidateInit, to: string) => {
        socketRef.current?.emit('lt_host-ice:send', { livestreamId, candidate, to });
    };

    const emitLtGuestIceSend = (livestreamId: string, candidate: RTCIceCandidateInit, to: string) => {
        socketRef.current?.emit('lt_guest-ice:send', { livestreamId, candidate, to });
    };

    const emitLtHostSdpSend = (livestreamId: string, sdp: RTCSessionDescriptionInit, to: string) => {
        socketRef.current?.emit('lt_host-sdp:send', { livestreamId, sdp, to });
    };

    const emitLtGuestSdpSend = (livestreamId: string, sdp: RTCSessionDescriptionInit, to: string) => {
        socketRef.current?.emit('lt_guest-sdp:send', { livestreamId, sdp, to });
    };

    const emitLtEndLivestream = (livestreamId: string) => {
        socketRef.current?.emit('lt_end-livestream', { livestreamId });
    };

    const emitLtNextLivestream = (livestreamId: string) => {
        socketRef.current?.emit('lt_next-livestream', { livestreamId });
    };

    const emitLtLeaveLivestream = (livestreamId: string) => {
        socketRef.current?.emit('lt_leave-livestream', { livestreamId });
    };

    // Cleanup handlers on component unmount
    useEffect(() => {
        return () => {
            handlersRef.current = {
                guestJoined: [],
                guestLeft: [],
                receiveMessage: [],
                hostIceReply: [],
                hostSdpReply: [],
                endLivestream: [],
                nextLivestream: [],
                startedLivestream: [],
                rcIceReply: [],
                rcSdpReply: [],
                rcGetMessage: [],
                rcEndChat: [],
                rcNextChat: [],
                rcRemoteSocket: [],
                rcRoomId: [],
                rcDisconnected: [],
                error: [],
            };
        };
    }, []);

    return (
        <SocketContext.Provider
            value={{
                socket: socketRef.current!,
                isConnected,
                onlineCount,
                // Listener functions
                onGuestJoined,
                onGuestLeft,
                onReceiveMessage,
                onHostIceReply,
                onHostSdpReply,
                onEndLivestream,
                onNextLivestream,
                onStartedLivestream,

                onRcIceReply,
                onRcSdpReply,
                onRcGetMessage,
                onRcEndChat,
                onRcNextChat,
                onRcRemoteSocket,
                onRcRoomId,
                onRcDisconnected,
                onError,
                // Emit functions
                emitRcStart,
                emitRcIceSend,
                emitRcSdpSend,
                emitRcSendMessage,
                emitRcEndChat,
                emitRcNextChat,

                emitLtStart,
                emitLtJoin,
                emitLtSendMessage,
                emitLtHostIceSend,
                emitLtGuestIceSend,
                emitLtHostSdpSend,
                emitLtGuestSdpSend,
                emitLtEndLivestream,
                emitLtNextLivestream,
                emitLtLeaveLivestream,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};