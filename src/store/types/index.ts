export interface UserType {
    id: string;
    telegramId: string;
    firstName?: string;
    lastName?: string | null;
    userName?: string | null;
}

export interface UserStateType {
    data: UserType;
    loading: boolean;
    isLoaded: boolean;
}

export interface TelegramStateType {
    isTmaMounted: boolean;
}

export interface PaymentStateType {
    tonCourse: number;
    isLoading: boolean;
    isLoaded: boolean;
}
