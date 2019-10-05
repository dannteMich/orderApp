export type Measurement = "units" | "grams" | "kg" | "packs";

export interface Order {
    productName: string;
    measurement: Measurement;
    amount: number;
}