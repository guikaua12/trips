export interface Trip {
    id: string;
    name: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    pricePerDay: number;
    coverImage: string;
    imagesUrl: string[];
    highlights: string[];
    maxGuests: number;
    countryCode: string;
    recommended: boolean;
}
