interface ICast {
    id: number,
    name: string,
    original_name: string,
    "profile_path": string,
    cast_id: number,
    "credit_id": "52fe4211c3a36847f8001741",
}


export interface ICastList {
    id: number,
    cast: ICast[]
}