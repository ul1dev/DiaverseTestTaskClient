export interface ProductType {
    id: string;
    name: string;
    color: string;
    textColor: string;
    price: number;
}

export const products: ProductType[] = [
    {
        id: '1',
        name: 'Красная',
        color: '#FF0000',
        textColor: '#fff',
        price: 1,
    },
    {
        id: '2',
        name: 'Желтая',
        color: '#FFFF00',
        textColor: '#000',
        price: 2,
    },
    {
        id: '3',
        name: 'Синяя',
        color: '#0000FF',
        textColor: '#fff',
        price: 3,
    },
    {
        id: '4',
        name: 'Зеленая',
        color: '#00FF00',
        textColor: '#fff',
        price: 4,
    },
    {
        id: '5',
        name: 'Оранжевая',
        color: '#FFA500',
        textColor: '#000',
        price: 5,
    },
    {
        id: '6',
        name: 'Фиолетовая',
        color: '#800080',
        textColor: '#fff',
        price: 6,
    },
    {
        id: '7',
        name: 'Розовая',
        color: '#FFC0CB',
        textColor: '#000',
        price: 7,
    },
];
