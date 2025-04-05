import { flags } from "../assets";

export interface ICountry {
    name: string;
    code: string;
    flag: string;
}

export const countries: ICountry[] = [
    { name: 'United States', code: 'US', flag: flags.us },
    { name: 'Vietnam', code: 'VN', flag: flags.vn },
    { name: 'Thailand', code: 'TH', flag: flags.th },
    { name: 'Japan', code: 'JP', flag: flags.jp },
    { name: 'South Korea', code: 'KR', flag: flags.kr },
    { name: 'China', code: 'CN', flag: flags.cn },
    { name: 'India', code: 'IN', flag: flags.ind },
    { name: 'United Kingdom', code: 'UK', flag: flags.uk },
    { name: 'Germany', code: 'DE', flag: flags.de },
]