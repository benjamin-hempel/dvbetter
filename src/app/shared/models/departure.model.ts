export class Departure {
    line: string;
    destination: string;
    arrival: Date;
    relativeArrival: number;
    relativeDelay: number;
    hasLiveData: boolean;
    isCancelled: boolean;
    platformType: string;
    platformName: string;
    modeIconUrl: string;
}
