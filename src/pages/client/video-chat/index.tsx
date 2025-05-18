import { Box } from '@mui/material';
import { useEffect, useState, useCallback, useRef } from 'react';
import PopupModal from '@components/PopupModal';
import { io, Socket } from 'socket.io-client';
import { useReview } from '@hooks/review.hook';
import { isBrowser } from 'react-device-detect';
import { RootState, useAppSelector } from '@stores/store';

import WaitingConnectionCardDesktop from './desktop/WaitingConnectionCard';
import ConnectingCardDesktop from './desktop/ConnectingCard';
import WaitingConnectionCardMobile from './mobile/WaitingConnectionCard';
import ConnectingCardMobile from './mobile/ConnectingCard';
import { useGetUserQuery } from '@apis/userApi';
import { TYPE, GENDER } from '@enums/video-chat';

const WaitingConnectionCard = isBrowser ? WaitingConnectionCardDesktop : WaitingConnectionCardMobile;
const ConnectingCard = isBrowser ? ConnectingCardDesktop : ConnectingCardMobile;

const VITE_SOCKET = import.meta.env.VITE_SOCKET;

const VideoChat = () => {
    const [selectedCountry, setSelectedCountry] = useState<string>('balanced');
    const [selectedGender, setSelectedGender] = useState<GENDER>(GENDER.BOTH);
    const [startVideoChat, setStartVideoChat] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [strangerStream, setStrangerStream] = useState<MediaStream | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
    const [strangerUserId, setStrangerUserId] = useState<string | null>(null);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [userType, setUserType] = useState<TYPE | null>(null);
    const [messages, setMessages] = useState<IMessage[]>([]);

    const { openReviewDialog } = useReview();

    const socketRef = useRef<Socket | null>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

    const { user } = useAppSelector((state: RootState) => state.user);

    const { data: strangerInfo } = useGetUserQuery(strangerUserId ?? '', {
        skip: !strangerUserId,
    });

    const setupWebRTC = useCallback(async (socket: Socket, remoteId: string) => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });
        peerConnectionRef.current = pc;

        pc.oniceconnectionstatechange = () => {
            if (pc.iceConnectionState === 'disconnected') {
                socket.emit('rc:disconnect');
            }
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).catch((err) => {
            throw err;
        });
        setStream(mediaStream);
        mediaStream.getTracks().forEach((track) => pc.addTrack(track, mediaStream));

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('rc:ice:send', { candidate: event.candidate, to: remoteId });
            }
        };

        pc.ontrack = (event) => {
            setStrangerStream(event.streams[0]);
        };

        if (userType === 'p1') {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.emit('rc:sdp:send', { sdp: offer, to: remoteId });
        }
    }, [userType]);

    useEffect(() => {
        const newSocket = io(`${VITE_SOCKET}`, {
            path: '/v1/socket',
            query: { userId: user?.id },
        });
        socketRef.current = newSocket;

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
        });

        newSocket.on('rc_disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, [user]);

    // 2. Xử lý roomId
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('rc:roomid', (id: string) => {
                setRoomId(id);
            });
        }
    }, []);

    // 3. Xử lý rc:remote:socket và thiết lập WebRTC
    useEffect(() => {
        if (socketRef.current) {
            const handleRemoteSocket = async ({ socketId, userId }: { socketId: string; userId: string }) => {
                if (!remoteSocketId) {
                    setRemoteSocketId(socketId);
                    setStrangerUserId(userId);

                    if (socketRef.current) {
                        setupWebRTC(socketRef.current, socketId);
                    }
                }
            };
            socketRef.current.on('rc:remote:socket', handleRemoteSocket);

            return () => {
                socketRef.current?.off('rc:remote:socket', handleRemoteSocket);
            };
        }
    }, [setupWebRTC, remoteSocketId]);

    // 4. Xử lý ICE candidate
    useEffect(() => {
        if (socketRef.current && remoteSocketId) {
            socketRef.current.on('rc:ice:reply', ({ candidate, from }) => {
                if (peerConnectionRef.current && from === remoteSocketId) {
                    peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate)).catch((err) =>
                        console.error('Error adding ICE candidate:', err)
                    );
                }
            });
        }
    }, [remoteSocketId]);

    // 5. Xử lý SDP
    useEffect(() => {
        if (socketRef.current && remoteSocketId) {
            socketRef.current.on('rc:sdp:reply', async ({ sdp, from }) => {
                if (peerConnectionRef.current && from === remoteSocketId) {
                    try {
                        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
                        if (sdp.type === 'offer') {
                            const answer = await peerConnectionRef.current.createAnswer();
                            await peerConnectionRef.current.setLocalDescription(answer);
                            socketRef.current?.emit('rc:sdp:send', { sdp: answer, to: remoteSocketId });
                        }
                    } catch (err) {
                        console.error('Error setting remote SDP:', err);
                    }
                }
            });
        }
    }, [remoteSocketId]);

    // 6. Xử lý tin nhắn từ server
    useEffect(() => {
        if (socketRef.current) {
            const handleMessage = (text: string, sender: string) => {
                setMessages((prev) => [
                    ...prev,
                    { text, sender: sender === userType ? 'You' : 'Stranger' },
                ]);
            };
            socketRef.current.on('rc:receive:message', handleMessage);

            return () => {
                socketRef.current?.off('rc:receive:message', handleMessage);
            };
        }
    }, [userType]);

    // 7. Xử lý ngắt kết nối
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('disconnected', () => {
                setStrangerStream(null);
                setRemoteSocketId(null);
                setStrangerUserId(null);
                setUserType(null);
                setRoomId(null);
                peerConnectionRef.current?.close();
            });
        }
    }, []);

    // 8. Xử lý lỗi từ server
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('rc:error', (msg: string) => {
                console.error('Server error:', msg);
            });
        }
    }, []);

    // 9. Xử lý sự kiện rc:end:chat (khi một người nhấn ESC)
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('rc:end:chat', () => {
                setStartVideoChat(false);
                setStrangerStream(null);
                setRemoteSocketId(null);
                setStrangerUserId(null);
                setUserType(null);
                setRoomId(null);
                setMessages([]);
                openReviewDialog();

                peerConnectionRef.current?.close();
                peerConnectionRef.current = null;
                if (stream) {
                    stream.getTracks().forEach((track) => track.stop());
                    setStream(null);
                }
            });
        }
    }, [stream, openReviewDialog]);

    // 10. Xử lý sự kiện rc:next:chat (khi một người nhấn Next)
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('rc:next:chat', () => {
                setStrangerStream(null);
                setRemoteSocketId(null);
                setStrangerUserId(null);
                setUserType(null);
                setRoomId(null);
                setMessages([]);
                peerConnectionRef.current?.close();
                peerConnectionRef.current = null;

                socketRef.current?.emit('rc:start', { selectedGender, selectedCountry }, (type: TYPE) => {
                    setUserType(type);
                });
            });
        }
    }, [selectedGender, selectedCountry]);



    const handleStartVideoChat = useCallback(() => {
        setStartVideoChat(true);
        socketRef.current?.emit('rc:start', { selectedGender, selectedCountry }, (type: TYPE) => {
            setUserType(type);
        });
    }, [selectedGender, selectedCountry]);

    const startMedia = useCallback(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((mediaStream) => {
                setStream(mediaStream);
                if (peerConnectionRef.current) {
                    mediaStream.getTracks().forEach((track) => {
                        peerConnectionRef.current?.addTrack(track, mediaStream);
                    });
                }
            })
            .catch((error) => {
                console.error('Error accessing media devices:', error);
                setOpenModal(true);
            });
    }, []);

    useEffect(() => {
        const checkMediaPermissions = async () => {
            try {
                const cameraPermission = await navigator.permissions.query({ name: 'camera' });
                const microphonePermission = await navigator.permissions.query({ name: 'microphone' });

                if (cameraPermission.state === 'denied' || microphonePermission.state === 'denied') {
                    setOpenModal(true);
                } else if (cameraPermission.state === 'granted' && microphonePermission.state === 'granted') {
                    startMedia();
                } else {
                    setOpenModal(true);
                }
            } catch (error) {
                console.error('Error checking permissions:', error);
                setOpenModal(true);
            }
        };

        checkMediaPermissions();
    }, [startMedia]);

    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [stream]);

    const handleCountrySelect = useCallback((country: string) => {
        setSelectedCountry(country);
    }, []);

    const handleGenderSelect = useCallback((gender: GENDER) => {
        setSelectedGender(gender);
    }, []);

    const handleEndVideoChat = useCallback(() => {
        socketRef.current?.emit('rc:end:chat', roomId);
    }, [roomId]);

    const handleNextVideoChat = useCallback(() => {
        socketRef.current?.emit('rc:next:chat', roomId);
    }, [roomId]);

    const requestPermissions = useCallback(() => {
        setOpenModal(false);
        startMedia();
    }, [startMedia]);

    const sendMessage = useCallback((message: string) => {
        if (socketRef.current && roomId && userType && message.trim()) {
            socketRef.current.emit('rc:send:message', message, userType, roomId);
            setMessages((prev) => [...prev, { text: message, sender: 'You' }]);
        }
    }, [roomId, userType]);

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