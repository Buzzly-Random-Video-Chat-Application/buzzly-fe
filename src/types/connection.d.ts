type IConnection = {
  roomId: string;
  p1UserId: string;
  p2UserId: string;
  isLive: boolean;
  createdAt: Date;
};

type IConnectionResponse = {
  message: string;
  result: IConnection;
};

type IConnectionListResponse = {
  message: string;
  results: IConnection[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

type IConnectionRequest = {
  sortBy?: string;
  limit?: number;
  page?: number;
};