import { Box } from '@mui/material';
import { useEffect, useState, useCallback, useRef } from 'react';
import PopupModal from '@components/PopupModal';
import { io, Socket } from 'socket.io-client';
import { useReview } from '@hooks/review.hook';
import { isBrowser } from 'react-device-detect';
import { RootState, useAppSelector } from '@stores/store';
import * as mediasoupClient from 'mediasoup-client';

// import {
//     DtlsParameters,
//     IceCandidate,
//     IceParameters,
//     Transport,
// } from "mediasoup-client/lib/types";

import WaitingConnectionCardDesktop from './desktop/WaitingConnectionCard';
import ConnectingCardDesktop from './desktop/ConnectingCard';
import WaitingConnectionCardMobile from './mobile/WaitingConnectionCard';
import ConnectingCardMobile from './mobile/ConnectingCard';
import { useGetUserQuery } from '@apis/userApi';

const WaitingConnectionCard = isBrowser ? WaitingConnectionCardDesktop : WaitingConnectionCardMobile;
const ConnectingCard = isBrowser ? ConnectingCardDesktop : ConnectingCardMobile;

const VITE_SOCKET = import.meta.env.VITE_SOCKET;

const VideoChat = () => {
    // UI state
    const [selectedCountry, setSelectedCountry] = useState<string>('balanced');
    const [selectedGender, setSelectedGender] = useState<string>('both');
    const [startVideoChat, setStartVideoChat] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [strangerStream, setStrangerStream] = useState<MediaStream | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [strangerUserId, setStrangerUserId] = useState<string | undefined>(undefined);
    const [strangerSocketId, setStrangerSocketId] = useState<string | undefined>(undefined);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [userType, setUserType] = useState<'p1' | 'p2' | null>(null);
    const [messages, setMessages] = useState<IMessage[]>([]);

    const { openReviewDialog } = useReview();
    const socketRef = useRef<Socket | null>(null);
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const { user } = useAppSelector((state: RootState) => state.user);
    const { data: strangerInfo } = useGetUserQuery(strangerUserId!, {
        skip: !strangerUserId || strangerUserId.length !== 24,
    });

    // --- Mediasoup signaling state ---
    const deviceRef = useRef<mediasoupClient.types.Device | null>(null);
    const sendTransportRef = useRef<mediasoupClient.types.Transport | null>(null);
    const recvTransportRef = useRef<mediasoupClient.types.Transport | null>(null);
    const videoProducerRef = useRef<mediasoupClient.types.Producer | null>(null);
    const audioProducerRef = useRef<mediasoupClient.types.Producer | null>(null);
    const consumerRef = useRef<mediasoupClient.types.Consumer | null>(null);

    // --- Mediasoup helpers ---
    const loadDevice = useCallback(async (rtpCapabilities: unknown) => {
        console.log('[mediasoup] loadDevice', rtpCapabilities);
        const dev = new mediasoupClient.Device();
        await dev.load({ routerRtpCapabilities: rtpCapabilities as mediasoupClient.types.RtpCapabilities });
        deviceRef.current = dev;
        return dev;
    }, []);

    const sendGetRouterRtpCapabilities = useCallback((roomId: string) => {
        console.log('[mediasoup] sendGetRouterRtpCapabilities', roomId);
        socketRef.current?.emit('mediasoup:get-router-rtp-capabilities', roomId);
    }, []);

    const sendCreateTransport = useCallback((direction: 'send' | 'recv', roomId: string, cb: (options: mediasoupClient.types.TransportOptions) => void) => {
        console.log('[mediasoup] sendCreateTransport', direction, roomId);
        socketRef.current?.emit('mediasoup:create-transport', { roomId, direction }, ({ transport }: { transport: mediasoupClient.types.TransportOptions }) => {
            if (transport) {
                cb(transport);
                console.log('[mediasoup] sendCreateTransport success', transport);
            } else {
                console.error('[mediasoup] sendCreateTransport error: transport is null');
            }
        });
    }, []);

    const sendConnectTransport = useCallback((transport: mediasoupClient.types.Transport, dtlsParameters: unknown) => {
        console.log('[mediasoup] sendConnectTransport', transport.id, dtlsParameters);
        socketRef.current?.emit('mediasoup:connect-transport', { transportId: transport.id, dtlsParameters });
    }, []);

    const sendProduce = useCallback((transport: mediasoupClient.types.Transport, kind: mediasoupClient.types.MediaKind, rtpParameters: mediasoupClient.types.RtpParameters, cb: (producer: mediasoupClient.types.Producer) => void) => {
        console.log('[mediasoup] sendProduce', transport.id, kind, rtpParameters);
        socketRef.current?.emit('mediasoup:produce', { transportId: transport.id, kind, rtpParameters, socketId: strangerSocketId }, ({ producer }: { producer: mediasoupClient.types.Producer }) => {
            if (producer) cb(producer);
        });
    }, [strangerSocketId]);

    const sendConsume = useCallback((transportId: string, producerId: string, rtpCapabilities: mediasoupClient.types.RtpCapabilities, cb: (consumer: mediasoupClient.types.Consumer) => void) => {
        console.log('[mediasoup] sendConsume', transportId, producerId, rtpCapabilities);
        socketRef.current?.emit('mediasoup:consume', { transportId, producerId, rtpCapabilities }, ({ consumer }: { consumer: mediasoupClient.types.Consumer }) => {
            if (consumer) cb(consumer);
        });
    }, []);

    // --- Media permissions and local stream ---
    const startMedia = useCallback(() => {
        console.log('[mediasoup] startMedia');
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((mediaStream) => {
                setStream(mediaStream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = mediaStream;
                }
            })
            .catch((error) => {
                console.error('Error accessing media devices:', error);
                setOpenModal(true);
            });
    }, []);

    useEffect(() => {
        startMedia();
    }, [startMedia]);

    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
                console.log('[mediasoup] stream is stopped');
            } else {
                console.log('[mediasoup] stream is null');
            }
        };
    }, [stream]);

    // --- Socket setup ---
    useEffect(() => {
        const newSocket = io(`${VITE_SOCKET}`, {
            path: '/v1/socket',
            query: { userId: user?.id },
        });
        socketRef.current = newSocket;

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    // --- Khi đã có roomId và stream, bắt đầu signaling ---
    useEffect(() => {
        if (roomId && stream) {
            // Bước 1: Lấy router RTP capabilities
            sendGetRouterRtpCapabilities(roomId);
            console.log('[mediasoup] sendGetRouterRtpCapabilities');
        } else {
            console.log('[mediasoup] roomId or stream is null');
        }
    }, [roomId, stream, sendGetRouterRtpCapabilities]);

    // --- Nhận router RTP capabilities và tạo device ---
    useEffect(() => {
        const socket = socketRef.current;
        if (!socket) return;
        const handler = async ({ rtpCapabilities }: { rtpCapabilities: unknown }) => {
            console.log('[mediasoup] router-rtp-capabilities', rtpCapabilities);
            const device = await loadDevice(rtpCapabilities);
            console.log('[mediasoup] device loaded', device);
            console.log('[mediasoup] roomid', roomId);

            // Bước 2: Tạo send transport
            sendCreateTransport('send', roomId!, (sendTransportOptions) => {
                console.log('[mediasoup] sendTransportOptions', sendTransportOptions);
                const sendTransport = device.createSendTransport(sendTransportOptions);
                sendTransportRef.current = sendTransport;
                sendTransport.on('connect', ({ dtlsParameters }, callback) => {
                    console.log('[mediasoup] sendTransport connect', dtlsParameters);
                    sendConnectTransport(sendTransport, dtlsParameters);
                    callback();
                });
                sendTransport.on('produce', ({ kind, rtpParameters }, callback) => {
                    console.log('[mediasoup] sendTransport produce', kind, rtpParameters);
                    sendProduce(sendTransport, kind, rtpParameters, (producer) => {
                        if (kind === 'video') videoProducerRef.current = producer;
                        if (kind === 'audio') audioProducerRef.current = producer;
                        callback({ id: producer.id });
                    });
                });
                // Bước 3: Produce media
                if (stream) {
                    stream.getVideoTracks().forEach((track) => {
                        sendTransport.produce({ track });
                    });
                    stream.getAudioTracks().forEach((track) => {
                        sendTransport.produce({ track });
                    });
                }
                // Bước 4: Tạo recv transport
                sendCreateTransport('recv', roomId!, (recvTransportOptions) => {
                    console.log('[mediasoup] recvTransportOptions', recvTransportOptions);
                    const recvTransport = device.createRecvTransport(recvTransportOptions);
                    recvTransportRef.current = recvTransport;
                    recvTransport.on('connect', ({ dtlsParameters }, callback) => {
                        console.log('[mediasoup] recvTransport connect', dtlsParameters);
                        sendConnectTransport(recvTransport, dtlsParameters);
                        callback();
                    });
                });
            });
        };
        socket.on('mediasoup:router-rtp-capabilities', handler);
        return () => { socket.off('mediasoup:router-rtp-capabilities', handler); };
    }, [roomId, stream, loadDevice, sendCreateTransport, sendConnectTransport, sendProduce]);

    // --- Khi peer join, trigger consume ---
    useEffect(() => {
        const socket = socketRef.current;
        if (!socket) return;
        const handler = ({ userId, socketId }: { userId: string, socketId: string }) => {
            console.log('[mediasoup] random-chat:peer-joined', userId, socketId);
            setStrangerUserId(userId);
            setStrangerSocketId(socketId);
        };
        socket.on('random-chat:peer-joined', handler);
        return () => { socket.off('random-chat:peer-joined', handler); };
    }, [sendConsume]);

    // --- Các event random-chat khác giữ nguyên ---
    useEffect(() => {
        const socket = socketRef.current;
        if (!socket) return;
        const handler = () => {
            console.log('[socket] random-chat:disconnected');
            setStrangerStream(null);
            setStrangerUserId(undefined);
            setUserType(null);
            setRoomId(null);
            setStartVideoChat(false);
            setMessages([]);
            openReviewDialog();
        };
        socket.on('random-chat:disconnected', handler);
        return () => { socket.off('random-chat:disconnected', handler); };
    }, [openReviewDialog]);

    useEffect(() => {
        const socket = socketRef.current;
        if (!socket) return;
        const handler = (msg: string) => {
            console.error('[socket] random-chat:error', msg);
        };
        socket.on('random-chat:error', handler);
        return () => { socket.off('random-chat:error', handler); };
    }, []);

    useEffect(() => {
        const socket = socketRef.current;
        if (!socket) return;
        const handler = (text: string, sender: string) => {
            console.log('[socket] random-chat:get-message', { text, sender });
            setMessages((prev) => [
                ...prev,
                { text, sender: sender === userType ? 'You' : 'Stranger' },
            ]);
        };
        socket.on('random-chat:get-message', handler);
        return () => { socket.off('random-chat:get-message', handler); };
    }, [userType]);

    useEffect(() => {
        const socket = socketRef.current;
        if (!socket) return;
        const handler = () => {
            console.log('[socket] random-chat:end-chat');
            setStartVideoChat(false);
            setStrangerStream(null);
            setStrangerUserId(undefined);
            setUserType(null);
            setRoomId(null);
            setMessages([]);
            openReviewDialog();
        };
        socket.on('random-chat:end-chat', handler);
        return () => { socket.off('random-chat:end-chat', handler); };
    }, [openReviewDialog]);

    useEffect(() => {
        const socket = socketRef.current;
        if (!socket) return;
        const handler = () => {
            console.log('[socket] random-chat:next-chat');
            setStrangerStream(null);
            setStrangerUserId(undefined);
            setUserType(null);
            setRoomId(null);
            setMessages([]);
        };
        socket.on('random-chat:next-chat', handler);
        return () => { socket.off('random-chat:next-chat', handler); };
    }, []);

    useEffect(() => {
        const socket = socketRef.current;
        if (!socket) return;
        const handler = (id: string) => {
            console.log('[socket] random-chat:roomid', id);
            setRoomId(id);
        };
        socket.on('random-chat:roomid', handler);
        return () => { socket.off('random-chat:roomid', handler); };
    }, []);

    useEffect(() => {
        console.log('[UI] strangerStream', strangerStream);
    }, [strangerStream]);

    // --- UI handlers ---
    const handleCountrySelect = useCallback((country: string) => {
        setSelectedCountry(country);
    }, []);

    const handleGenderSelect = useCallback((gender: string) => {
        setSelectedGender(gender);
    }, []);

    const handleStartVideoChat = useCallback(() => {
        console.log('[UI] handleStartVideoChat', selectedGender, selectedCountry);
        setStartVideoChat(true);
        socketRef.current?.emit('random-chat:start', { selectedGender, selectedCountry }, (type: 'p1' | 'p2') => {
            setUserType(type);
        });
    }, [selectedGender, selectedCountry]);

    const handleEndVideoChat = useCallback(() => {
        console.log('[UI] handleEndVideoChat', roomId);
        socketRef.current?.emit('random-chat:end-chat', roomId);
    }, [roomId]);

    const handleNextVideoChat = useCallback(() => {
        console.log('[UI] handleNextVideoChat', roomId);
        socketRef.current?.emit('random-chat:next-chat', roomId);
    }, [roomId]);

    const requestPermissions = useCallback(() => {
        console.log('[UI] requestPermissions');
        setOpenModal(false);
        startMedia();
    }, [startMedia]);

    const sendMessage = useCallback((message: string) => {
        console.log('[UI] sendMessage', message, userType, roomId);
        if (socketRef.current && roomId && userType && message.trim()) {
            console.log('[UI] sendMessage success', message, userType, roomId);
            socketRef.current.emit('random-chat:send-message', message, userType, roomId);
            setMessages((prev) => [...prev, { text: message, sender: 'You' }]);
        } else {
            console.log('[UI] sendMessage error', socketRef.current, roomId, userType, message);
        }
    }, [roomId, userType]);

    useEffect(() => {
        const socket = socketRef.current;
        if (!socket) return;
        const handler = ({ producerId }: { producerId: string }) => {
            console.log('[mediasoup] new-producer', producerId, recvTransportRef.current, deviceRef.current);
            const recvTransport = recvTransportRef.current;
            const device = deviceRef.current;
            if (producerId && recvTransport && device) {
                sendConsume(recvTransport.id, producerId, device.rtpCapabilities, async (consumer) => {
                    console.log('[mediasoup] sendConsume', consumer);
                    if (consumer) {
                        const msConsumer = await recvTransport.consume({
                            id: consumer.id,
                            producerId: consumer.producerId,
                            kind: consumer.kind,
                            rtpParameters: consumer.rtpParameters,
                        });
                        consumerRef.current = msConsumer;
                        const remoteStream = new MediaStream([msConsumer.track]);
                        setStrangerStream(remoteStream);
                        if (remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = remoteStream;
                        }
                        console.log('[mediasoup] strangerStream set', remoteStream);
                    } else {
                        console.log('[mediasoup] sendConsume error', consumer);
                    }
                });
            }
        };
        socket.on('mediasoup:new-producer', handler);
        return () => {
            socket.off('mediasoup:new-producer', handler);
        };
    }, [sendConsume]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                ...(isBrowser
                    ? { height: '90vh', paddingX: '10px', paddingY: '50px' }
                    : { padding: '10px' }),
            }}
        >
            {/* Local video */}
            <video ref={localVideoRef} autoPlay muted playsInline style={{ display: 'none' }} />
            {/* Stranger video */}
            <video ref={remoteVideoRef} autoPlay playsInline style={{ display: 'none' }} />
            {!startVideoChat && (
                <WaitingConnectionCard
                    handleCountrySelect={handleCountrySelect}
                    handleGenderSelect={handleGenderSelect}
                    handleStartVideoChat={handleStartVideoChat}
                    stream={stream}
                />
            )}
            {startVideoChat && (
                <ConnectingCard
                    handleEndVideoChat={handleEndVideoChat}
                    handleNextVideoChat={handleNextVideoChat}
                    stream={stream}
                    strangerStream={strangerStream}
                    messages={messages}
                    sendMessage={sendMessage}
                    strangerInfo={strangerInfo?.result}
                />
            )}
            <PopupModal
                title="Permission Required"
                message="Please allow camera and microphone permissions to start video chat."
                open={openModal}
                onClose={() => setOpenModal(false)}
                onConfirm={requestPermissions}
                stage="permission"
            />
        </Box>
    );
};

export default VideoChat;