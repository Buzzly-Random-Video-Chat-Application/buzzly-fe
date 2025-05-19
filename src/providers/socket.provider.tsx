/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { SocketContext } from '@hooks/socket.hook';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '@stores/store';
import toast from 'react-hot-toast';
import { TYPE } from '@enums/livestream';

const VITE_SOCKET = import.meta.env.VITE_SOCKET;

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAppSelector((state) => state.user);
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const handlersRef = useRef<{
        guestJoined: Array<(data: { guestUserId: string; guestSocketId: string }) => void>;
        guestLeft: Array<(data: { guestUserId: string; guestSocketId: string }) => void>;
        receiveMessage: Array<(data: { message: string; type: TYPE; senderId: string }) => void>;
        hostIceReply: Array<(data: { candidate: RTCIceCandidateInit; from: string }) => void>;
        guestIceReply: Array<(data: { candidate: RTCIceCandidateInit; from: string }) => void>;
        hostSdpReply: Array<(data: { sdp: RTCSessionDescriptionInit; from: string }) => void>;
        guestSdpReply: Array<(data: { sdp: RTCSessionDescriptionInit; from: string }) => void>;
        endLivestream: Array<() => void>;
        nextLivestream: Array<(data: { newLivestreamId: string }) => void>;
        startedLivestream: Array<(data: { livestreamId: string }) => void>;
        error: Array<(msg: string) => void>;
    }>({
        guestJoined: [],
        guestLeft: [],
        receiveMessage: [],
        hostIceReply: [],
        guestIceReply: [],
        hostSdpReply: [],
        guestSdpReply: [],
        endLivestream: [],
        nextLivestream: [],
        startedLivestream: [],
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

            // Livestream events
            socketRef.current.on('livestream:joined', (data: { guestUserId: string; guestSocketId: string }) => {
                handlersRef.current.guestJoined.forEach((handler) => handler(data));
            });

            socketRef.current.on('livestream:left', (data: { guestUserId: string; guestSocketId: string }) => {
                handlersRef.current.guestLeft.forEach((handler) => handler(data));
            });

            socketRef.current.on('message:sent', (data: { message: string; type: TYPE; senderId: string }) => {
                handlersRef.current.receiveMessage.forEach((handler) => handler(data));
            });

            socketRef.current.on('host:ice:reply', (data: { candidate: RTCIceCandidateInit; from: string }) => {
                handlersRef.current.hostIceReply.forEach((handler) => handler(data));
            });

            socketRef.current.on('guest:ice:reply', (data: { candidate: RTCIceCandidateInit; from: string }) => {
                handlersRef.current.guestIceReply.forEach((handler) => handler(data));
            });

            socketRef.current.on('host:sdp:reply', (data: { sdp: RTCSessionDescriptionInit; from: string }) => {
                handlersRef.current.hostSdpReply.forEach((handler) => handler(data));
            });

            socketRef.current.on('guest:sdp:reply', (data: { sdp: RTCSessionDescriptionInit; from: string }) => {
                handlersRef.current.guestSdpReply.forEach((handler) => handler(data));
            });

            socketRef.current.on('livestream:ended', () => {
                handlersRef.current.endLivestream.forEach((handler) => handler());
            });

            socketRef.current.on('livestream:next', (data: { newLivestreamId: string }) => {
                handlersRef.current.nextLivestream.forEach((handler) => handler(data));
            });

            socketRef.current.on('livestream:started', (data: { livestreamId: string }) => {
                handlersRef.current.startedLivestream.forEach((handler) => handler(data));
            });

            // Error handling
            socketRef.current.on('error:livestream', (msg: string) => {
                console.error('Livestream error:', msg);
                toast.error(msg);
                handlersRef.current.error.forEach((handler) => handler(msg));
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
                setIsConnected(false);
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

    const onGuestIceReply = (handler: (data: { candidate: RTCIceCandidateInit; from: string }) => void) => {
        handlersRef.current.guestIceReply.push(handler);
    };

    const onHostSdpReply = (handler: (data: { sdp: RTCSessionDescriptionInit; from: string }) => void) => {
        handlersRef.current.hostSdpReply.push(handler);
    };

    const onGuestSdpReply = (handler: (data: { sdp: RTCSessionDescriptionInit; from: string }) => void) => {
        handlersRef.current.guestSdpReply.push(handler);
    };

    const onEndLivestream = (handler: () => void) => {
        handlersRef.current.endLivestream.push(handler);
    };

    const onNextLivestream = (handler: (data: { newLivestreamId: string }) => void) => {
        handlersRef.current.nextLivestream.push(handler);
    };

    const onStartedLivestream = (handler: (data: { livestreamId: string }) => void) => {
        handlersRef.current.startedLivestream.push(handler);
    };

    const onError = (handler: (msg: string) => void) => {
        handlersRef.current.error.push(handler);
    };

    // Emit functions for client to send events to server
    const emitLtStart = (
        livestreamName: string,
        livestreamGreeting: string,
        livestreamAnnouncement: string,
        callback: (livestreamId: string | null) => void,
    ) => {
        socketRef.current?.emit('start:livestream', { livestreamName, livestreamGreeting, livestreamAnnouncement }, callback);
    };

    const emitLtJoin = (livestreamId: string, callback: (response: { success: boolean; message: string }) => void) => {
        socketRef.current?.emit('join:livestream', { livestreamId }, callback);
    };

    const emitLtSendMessage = (livestreamId: string, message: string, type: TYPE) => {
        socketRef.current?.emit('send:message', { livestreamId, message, type })
    };

    const emitLtHostIceSend = (livestreamId: string, candidate: RTCIceCandidateInit, to: string) => {
        socketRef.current?.emit('host:ice:send', { livestreamId, candidate, to });
    };

    const emitLtGuestIceSend = (livestreamId: string, candidate: RTCIceCandidateInit, to: string) => {
        socketRef.current?.emit('guest:ice:send', { livestreamId, candidate, to });
    };

    const emitLtHostSdpSend = (livestreamId: string, sdp: RTCSessionDescriptionInit, to: string) => {
        socketRef.current?.emit('host:sdp:send', { livestreamId, sdp, to });
    };

    const emitLtGuestSdpSend = (livestreamId: string, sdp: RTCSessionDescriptionInit, to: string) => {
        socketRef.current?.emit('guest:sdp:send', { livestreamId, sdp, to });
    };

    const emitLtEndLivestream = (livestreamId: string) => {
        socketRef.current?.emit('end:livestream', { livestreamId });
    };

    const emitLtNextLivestream = (livestreamId: string) => {
        socketRef.current?.emit('next:livestream', { livestreamId });
    };

    const emitLtLeaveLivestream = (livestreamId: string) => {
        socketRef.current?.emit('leave:livestream', { livestreamId });
    };

    // Cleanup handlers on component unmount
    useEffect(() => {
        return () => {
            handlersRef.current = {
                guestJoined: [],
                guestLeft: [],
                receiveMessage: [],
                hostIceReply: [],
                guestIceReply: [],
                hostSdpReply: [],
                guestSdpReply: [],
                endLivestream: [],
                nextLivestream: [],
                startedLivestream: [],
                error: [],
            };
        };
    }, []);

    return (
        <SocketContext.Provider
            value={{
                socket: socketRef.current!,
                isConnected,
                onGuestJoined,
                onGuestLeft,
                onReceiveMessage,
                onHostIceReply,
                onGuestIceReply,
                onHostSdpReply,
                onGuestSdpReply,
                onEndLivestream,
                onNextLivestream,
                onStartedLivestream,
                onError,
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