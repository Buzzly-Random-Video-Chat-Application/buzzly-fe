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
import { useGetImportsQuery } from '@apis/importApi';

const ImportDataHistory = () => {
    const { data: history } = useGetImportsQuery({});
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
                        {history?.results && history.results.length > 0 ? (
                            history.results.map((record: IImport, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ width: 'fit-content' }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {index + 1}
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