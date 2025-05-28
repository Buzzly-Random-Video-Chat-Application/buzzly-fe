enum TYPE {
  HOST = 'host',
  GUEST = 'guest',
}

type ILivestream = {
  id: string;
  host: {
    userId: string;
    socketId: string;
  };
  livestreamName: string;
  livestreamGreeting: string;
  livestreamAnnouncement: string;
  isLive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type ILivestreamResponse = {
  message: string;
  result: ILivestream;
};

type ILivestreamListResponse = {
  results: ILivestream[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

type ILivestreamRequest = {
  isLive?: boolean;
  sortBy?: string;
  limit?: number;
  page?: number;
};

type ILivestreamMessage = {
  livestreamId: string;
  message: string;
  type: 'host' | 'guest';
};

type ILivestreamGuest = {
  guestUserId: string;
  guestSocketId: string;
};

type ILivestreamDevice = {
  deviceId: string;
  label: string;
}

type ILivestreamFormState = {
  livestreamName: string;
  livestreamGreeting: string;
  livestreamAnnouncement: string;
  selectedVideo: string;
  selectedMicrophone: string;
}

type ILivestreamDevices = {
  video: ILivestreamDevice[];
  audio: ILivestreamDevice[];
}