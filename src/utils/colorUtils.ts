export const percentageColor = (percentage: number): string => {
    if (percentage > 0) {
        return 'green.500';
    } else if (percentage < 0) {
        return 'red.500';
    } else {
        return 'gray.500';
    }
}