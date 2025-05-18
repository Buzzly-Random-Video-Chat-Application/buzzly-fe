type IUserStatisticResponse = {
    message: string;
    results: {
        total: {
            quantity: number;
            percentage: number;
        };
        male: {
            quantity: number;
            percentage: number;
        };
        female: {
            quantity: number;
            percentage: number;
        };
        other: {
            quantity: number;
            percentage: number;
        };
    };
}

type IConnectionStatisticResponse = {
    message: string;
    results: {
        total: {
            quantity: number;
            percentage: number;
        };
        live: {
            quantity: number;
            percentage: number;
        };
    };
}

type IWeeklyConnectionStatisticResponse = {  
    message: string;
    results: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
        };
    };
}

type IReviewStatisticResponse = {
    message: string;
    results: {
        total: {
            quantity: number;
            percentage: number;
        };
        negative: {
            quantity: number;
            percentage: number;
        };
    };
}