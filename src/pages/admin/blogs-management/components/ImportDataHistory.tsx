import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Avatar,
} from '@mui/material';
import { Download } from '@mui/icons-material';

// Giả định interface cho lịch sử nhập liệu
interface ImportHistory {
    id: string;
    fileName: string;
    fileUrl: string;
    entryDate: string;
    author: {
        name: string;
        avatar?: string;
    };
}

// Dữ liệu giả (thay bằng API thực tế)
const mockHistory: ImportHistory[] = [
    {
        id: '1',
        fileName: 'blogs_2023_01.csv',
        fileUrl: 'http://example.com/files/blogs_2023_01.csv',
        entryDate: '2023-01-01T10:00:00Z',
        author: { name: 'John Doe', avatar: '' },
    },
    {
        id: '2',
        fileName: 'blogs_2023_02.csv',
        fileUrl: 'http://example.com/files/blogs_2023_02.csv',
        entryDate: '2023-02-01T12:00:00Z',
        author: { name: 'Jane Smith', avatar: '' },
    },
];

const ImportDataHistory = () => {
    // Thay mockHistory bằng API thực tế, ví dụ:
    // const { data: history } = useGetImportHistoryQuery({});
    const history = mockHistory;

    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Table sx={{ tableLayout: 'fixed' }}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 600, flex: 1 }}>File Name</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Download</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Entry Date</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: 'fit-content' }}>Author</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.length > 0 ? (
                            history.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {record.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ flex: 1 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {record.fileName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Download />}
                                            href={record.fileUrl}
                                            download
                                            sx={{
                                                borderColor: 'gray.200',
                                                color: 'dark.500',
                                                borderRadius: '8px',
                                                padding: '6px 12px',
                                                textTransform: 'none',
                                            }}
                                        >
                                            Download
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {new Date(record.entryDate).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar
                                                src={record.author.avatar || ''}
                                                alt={record.author.name}
                                                sx={{ width: 32, height: 32 }}
                                            />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {record.author.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography variant="body2" color="textSecondary">
                                        No import history found.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ImportDataHistory;