interface ICast {
    id: number,
    name: string,
    original_name: string,
    "profile_path": string,
    cast_id: number,
    "credit_id": string,
}


export interface ICastList {
    id: number,
    cast: ICast[]
}