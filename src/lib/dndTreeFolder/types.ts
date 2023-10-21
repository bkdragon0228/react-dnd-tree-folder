export interface TreeData {
    id: string;
    name: string;
    children: TreeData[];
    [key: string]: any;
}
