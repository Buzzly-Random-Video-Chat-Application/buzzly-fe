export interface IGender {
    name: string;
}

export const GENDER = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other',
};

export const Genders: IGender[] = [
    { name: GENDER.FEMALE },
    { name: GENDER.MALE },
    { name: GENDER.OTHER },
]