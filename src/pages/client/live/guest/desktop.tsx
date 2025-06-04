import { Box, CircularProgress } from '@mui/material';
import { useAppSelector } from '@stores/store';
import LiveGuestSection from './desktop/LiveGuestSection';
import { io, Socket } from 'socket.io-client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useGetUserQuery, useGetUsersQuery } from '@apis/userApi';

const VITE_SOCKET = import.meta.env.VITE_SOCKET;

const LiveGuestDesktop = () => {
    const navigate = useNavigate();


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const livestreamId = queryParams.get('livestreamId');
    const { user } = useAppSelector((state) => state.user);
    const socketRef = useRef<Socket | null>(null);
    const [hostStream, setHostStream] = useState<MediaStream | null>(null);
    const [messages, setMessages] = useState<ILivestreamMessage[]>([]);
    const [viewerCount, setViewerCount] = useState(0);
    const [guests, setGuests] = useState<ILivestreamGuest[]>([]);
    const peerConnectioncRef = useRef<RTCPeerConnection | null>(null);
    const [hostUserId, setHostUserId] = useState<string | null>(null);

    const { data: users } = useGetUsersQuery({});

    const avatars = guests.map((_guest) => {
        const user = users?.results.find((user: IUser) => user.id === _guest.guestUserId);
        return user?.avatar || 'https://res.cloudinary.com/dj8tkuzxz/image/upload/avatar_default_vzd9hu.png';
    });

    const { data: hostUser } = useGetUserQuery(hostUserId!, {
        skip: !hostUserId,
    });

    useEffect(() => {
        const newSocket = io(`${VITE_SOCKET}`, {
            path: '/v1/socket',
            query: { userId: user?.id },
        });

        socketRef.current = newSocket;

        newSocket.emit('livestream:connect');

        newSocket.on('connect', () => {
            console.log('Livestream socket connected:', newSocket.id);
        });

        newSocket.on('livestream:ended', () => {
            toast.error('Livestream ended');

            setHostStream(null);
            setMessages([]);
            setGuests([]);
            setViewerCount(0);

            setTimeout(() => navigate('/live'), 1000);
        });

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, [user, navigate]);

    function createSilentAudioTrack() {
        const _window = window as Window & { webkitAudioContext?: typeof AudioContext };
        const AudioCtx = window.AudioContext || _window.webkitAudioContext;
        const ctx = new AudioCtx();
        const oscillator = ctx.createOscillator();
        const dst = ctx.createMediaStreamDestination();
        oscillator.connect(dst);
        oscillator.start();
        const track = dst.stream.getAudioTracks()[0];
        track.enabled = false;
        oscillator.stop();
        ctx.close();
        return track;
    }

    const setupWebRTC = useCallback(async (socket: Socket, hostSocketId: string) => {
        if (peerConnectioncRef.current) return;
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });
        peerConnectioncRef.current = pc;

        pc.oniceconnectionstatechange = () => {
            if (pc.iceConnectionState === 'disconnected') {
                socket.emit('livestream:disconnect');
            }
        };

        const dummyStream = new MediaStream([createSilentAudioTrack()]);
        dummyStream.getTracks().forEach(track => pc.addTrack(track, dummyStream));

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('guest:ice:send', {
                    livestreamId,
                    candidate: event.candidate,
                    to: hostSocketId,
                });
            }
        };

        pc.ontrack = (event) => {
            setHostStream(event.streams[0]);
        };
    }, [livestreamId]);

    useEffect(() => {
        if (livestreamId && socketRef.current) {
            try {
                socketRef.current.emit('livestream:join', { livestreamId }, (callback: { success: boolean, message: string, hostSocketId: string, hostUserId: string }) => {
                    console.log('Guest joined to livestream:', callback);
                    if (callback.success) {
                        toast.success(callback.message);
                        if (socketRef.current) {
                            setHostUserId(callback.hostUserId);
                            setupWebRTC(socketRef.current, callback.hostSocketId);
                        }
                    }
                });
            } catch (error) {
                console.error('Error joining livestream:', error);
            }
        }
    }, [livestreamId, setupWebRTC]);

    // Handle other guest joined
    useEffect(() => {
        if (socketRef.current) {
            const handleGuestJoined = async ({ guestUserId, guestSocketId }: { guestUserId: string, guestSocketId: string }) => {
                console.log('Other guest joined to host livestream:', guestUserId, guestSocketId);
                setGuests((prev) => [...prev, { guestUserId, guestSocketId }]);
            }
            socketRef.current.on('livestream:joined', handleGuestJoined);

            return () => {
                socketRef.current?.off('livestream:joined', handleGuestJoined);
            };
        }
    }, []);

    // Handle ICE candidate reply from host
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('host:ice:reply', ({ candidate, from }) => {
                console.log('Host ICE reply to guest:', candidate, from);
            });
        }
    }, []);

    // Lắng nghe offer từ host và trả lời
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('host:sdp:reply', async ({ sdp, from }) => {
                const pc = peerConnectioncRef.current;
                if (!pc) return;
                await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                socketRef.current?.emit('guest:sdp:send', {
                    livestreamId,
                    sdp: answer,
                    to: from,
                });
            });
        }
    }, [livestreamId]);

    // Handle guest left
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('livestream:left', ({ guestSocketId }: { guestSocketId: string }) => {
                if (guestSocketId !== socketRef.current?.id) {
                    console.log('Other guest left livestream:', guestSocketId);
                    setGuests((prev) => prev.filter((guest) => guest.guestSocketId !== guestSocketId));
                } else {
                    setHostStream(null);
                    setMessages([]);
                    setGuests([]);
                    setViewerCount(0);

                    toast.success('Left livestream successfully');
                    setTimeout(() => navigate('/live'), 1000);
                }
            });
        }
    }, [navigate]);

    // Handle get message
    useEffect(() => {
        const handleMessage = ({ message, type, senderId }: { message: string, type: 'host' | 'guest', senderId: string }) => {
            const senderUsername = users?.results.find((user: IUser) => user.id === senderId)?.name;
            if (senderUsername) {
                setMessages((prev) => [...prev, { message, type, senderUsername }]);
            }
        };

        if (socketRef.current) {
            socketRef.current.on('livestream:get-message', handleMessage);
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.off('livestream:get-message', handleMessage);
            }
        };
    }, [users]);

    // Handle send message from guest
    const sendMessage = useCallback((message: string) => {
        if (!socketRef.current) {
            return;
        }

        if (!livestreamId) {
            return;
        }

        if (!message.trim()) {
            return;
        }

        try {
            console.log('Send message from to host livestream:', message);
            socketRef.current.emit('livestream:send-message', { livestreamId, message, type: 'guest' });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, [livestreamId]);

    const handleNextLive = useCallback(() => {
        if (!livestreamId) {
            return;
        }

        try {
            console.log('Click next livestream:', livestreamId);
            socketRef.current?.emit('livestream:click-next', { livestreamId });
        } catch (error) {
            console.error('Error next livestream:', error);
        }
    }, [livestreamId]);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('livestream:next-clicked', ({ newLivestreamId }: { newLivestreamId: string }) => {
                console.log('Next livestream clicked:', newLivestreamId);
                navigate(`/live/${newLivestreamId}`);
            });
        }
    }, [navigate]);

    // Handle get viewer count
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('livestream:guest-count', (count: number) => {
                console.log('Viewer count from host livestream:', count);
                setViewerCount(count);
            });
        }
    }, []);

    // Handle leave livestream
    const handleLeaveLive = useCallback(() => {
        if (!livestreamId) {
            return;
        }

        try {
            console.log('Leave livestream:', livestreamId);
            socketRef.current?.emit('livestream:leave', { livestreamId });
        } catch (error) {
            console.error('Error leave livestream:', error);
        }
    }, [livestreamId]);


    // Handle livestream error
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('livestream:error', (error: string) => {
                console.log('Livestream error:', error);
                toast.error(error);
            });
        }
    }, []);

    if (!hostStream) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingX: '10px',
                paddingY: '50px',
            }}
        >
            <LiveGuestSection
                stream={hostStream}
                messages={messages}
                viewerCount={viewerCount}
                avatars={avatars}
                onSendMessage={sendMessage}
                onNextLive={handleNextLive}
                onLeaveLive={handleLeaveLive}
                hostUser={hostUser?.result || null}
            />
        </Box>
    );
};

export default LiveGuestDesktop;