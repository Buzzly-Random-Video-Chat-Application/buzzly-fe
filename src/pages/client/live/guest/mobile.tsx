/* eslint-disable react-hooks/exhaustive-deps */
import { Box, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@stores/store';
import { useSocket } from '@hooks/socket.hook';
import toast from 'react-hot-toast';
import LiveGuestSection from './mobile/LiveGuestSection';
import { TYPE } from '@enums/livestream';

interface Message {
    id: string;
    sender: string;
    content: string;
    type: string;
}

interface Guest {
    guestUserId: string;
    guestSocketId: string;
}

const LiveGuestMobile = () => {
    const { user } = useAppSelector((state) => state.user);
    const { socket, isConnected, emitLtJoin, emitLtSendMessage, emitLtGuestIceSend, emitLtGuestSdpSend, onReceiveMessage, onHostIceReply, onHostSdpReply, onEndLivestream, onError } = useSocket();
    const location = useLocation();
    const navigate = useNavigate();
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [viewerCount] = useState(0);
    const [guests] = useState<Guest[]>([]);
    const [isJoining, setIsJoining] = useState(false);
    const livestreamId = new URLSearchParams(location.search).get('livestreamId');

    // Kiểm tra livestreamId
    useEffect(() => {
        if (!livestreamId) {
            toast.error('Invalid livestream!');
            navigate('/live');
        }
    }, [livestreamId, navigate]);

    // Khởi tạo WebRTC và tham gia livestream khi socket kết nối
    useEffect(() => {
        if (!livestreamId || !socket || !isConnected) {
            console.log('Guest: Đang chờ kết nối socket', { livestreamId, socket: !!socket, isConnected });
            return;
        }

        console.log('Guest: Khởi tạo WebRTC cho livestream', livestreamId);

        // Khởi tạo WebRTC peer connection
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });
        peerConnectionRef.current = pc;

        // Xử lý track từ host
        pc.ontrack = (event) => {
            console.log('Guest: Nhận track từ host', event.streams.length, event.streams[0].id);
            const remoteStream = event.streams[0];
            setStream(remoteStream);
        };

        // Gửi ICE candidate đến host
        pc.onicecandidate = (event) => {
            if (event.candidate && socket) {
                console.log('Guest: Gửi ICE candidate đến host', event.candidate);
                emitLtGuestIceSend(livestreamId, event.candidate.toJSON(), 'host');
            }
        };

        // Tham gia livestream với timeout
        const joinLivestream = (): Promise<{ success: boolean; message: string }> =>
            new Promise((resolve, reject) => {
                console.log('Guest: Gửi join:livestream', livestreamId);
                const timeout = setTimeout(() => {
                    console.error('Guest: Tham gia livestream timeout');
                    reject(new Error('Tham gia livestream timeout'));
                }, 10000);

                emitLtJoin(livestreamId, (response: { success: boolean; message: string }) => {
                    console.log('Guest: Nhận phản hồi join:livestream', response);
                    clearTimeout(timeout);
                    resolve(response);
                });
            });

        setIsJoining(true);
        joinLivestream()
            .then((response) => {
                console.log('Guest: Phản hồi tham gia livestream', response);
                if (!response.success) {
                    console.error('Guest: Tham gia livestream thất bại', response.message);
                    toast.error(response.message);
                    navigate('/live');
                }
            })
            .catch((error) => {
                console.error('Guest: Lỗi khi tham gia livestream', error.message);
                toast.error(error.message);
                navigate('/live');
            })
            .finally(() => {
                console.log('Guest: Quá trình tham gia hoàn tất');
                toast.success('Join livestream successfully');
                setIsJoining(false);
            });

        // Đăng ký các socket event handler
        onHostSdpReply(({ sdp, from }) => {
            console.log('Guest: Nhận SDP từ host', { from, sdp });
            if (from === 'host' && pc.signalingState !== 'closed') {
                pc.setRemoteDescription(new RTCSessionDescription(sdp))
                    .then(() => {
                        console.log('Guest: Đặt remote SDP thành công');
                        if (sdp.type === 'offer') {
                            return pc.createAnswer().then((answer) => {
                                console.log('Guest: Tạo SDP answer', answer);
                                pc.setLocalDescription(answer);
                                emitLtGuestSdpSend(livestreamId, answer, 'host');
                                console.log('Guest: Gửi SDP answer đến host');
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('Guest: Lỗi khi xử lý SDP từ host', error);
                    });
            }
        });

        onHostIceReply(({ candidate, from }) => {
            console.log('Guest: Nhận ICE candidate từ host', { from, candidate });
            if (from === 'host' && pc.signalingState !== 'closed') {
                pc.addIceCandidate(new RTCIceCandidate(candidate)).catch((error) => {
                    console.error('Guest: Lỗi khi thêm ICE candidate từ host', error);
                });
            }
        });

        onReceiveMessage(({ message, type, senderId }) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: `${senderId}-${Date.now()}`,
                    sender: senderId === user?.id ? user?.name || 'Guest' : `User-${senderId.slice(0, 5)}`,
                    content: message,
                    type,
                },
            ]);
        });

        onEndLivestream(() => {
            toast.success('Livestream ended!');
            navigate('/live');
        });

        onError((msg) => {
            console.error('Lỗi socket:', msg);
            toast.error(msg);
            navigate('/live');
        });

        // Dọn dẹp
        return () => {
            if (pc) {
                pc.close();
                peerConnectionRef.current = null;
            }
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
                setStream(null);
            }
        };
    }, [livestreamId, socket, isConnected]);

    // Xử lý gửi tin nhắn
    const handleSendMessage = (message: string) => {
        if (!user) {
            toast.error('Login to send message, please!');
            return;
        }
        if (socket && livestreamId && isConnected) {
            emitLtSendMessage(livestreamId, message, TYPE.GUEST);
        } else {
            toast.error('Error while sending message!');
        }
    };

    // Xử lý chuyển sang livestream tiếp theo
    const handleNextLive = () => {
        if (socket && livestreamId && isConnected) {
            socket.emit('next:livestream', { livestreamId }, (newLivestreamId: string | null) => {
                if (newLivestreamId) {
                    navigate(`/live/guest?livestreamId=${newLivestreamId}`);
                } else {
                    toast.error('There is no available livestream');
                }
            });
        } else {
            toast.error('Error while switching livestream!');
        }
    };

    // Hiển thị thông báo khi socket đang kết nối
    useEffect(() => {
        if (!isConnected && socket) {
            toast.loading('Connecting to server', { id: 'socket-connecting' });
        } else {
            toast.dismiss('socket-connecting');
        }
    }, [isConnected, socket]);

    // Hiển thị loading khi đang tham gia livestream
    if (isJoining) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <LiveGuestSection
                stream={stream}
                messages={messages}
                viewerCount={viewerCount}
                guests={guests}
                onSendMessage={handleSendMessage}
                onNextLive={handleNextLive}
            />
        </Box>
    );
};

export default LiveGuestMobile;