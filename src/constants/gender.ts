export interface IGender {
    label: string;
    value: string;
}

export const GENDER = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other',
};

export const genders: IGender[] = [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
    { label: 'Other', value: 'other' },
]