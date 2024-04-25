export type HistoryPush = {
    id: string;
    title: string;
    body: string;
    creator: {
        id: string;
        name: string;
        middleName: string;
        surname: string;
        username: string;
        createDate: string;
    };
    time: string;
    fromDepartment: {
        id: string;
        name: string;
        amountOfPeople: number;
    };
};
