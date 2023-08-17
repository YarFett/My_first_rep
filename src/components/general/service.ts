export interface ServiceCard {
    id: number;
    create_date: string;
    software_registry: SoftWare;
    viewtype: ViewType;
}

export interface IssueCard {
    id: number;
    service_name: string;
    software: SoftWare;
    viewtype: ViewType;
    producer: string;
    create_date: string;
}

export interface ViewType {
    view: View[];
    type: Type[];
}

export interface View {
    id: number;
    view_service: string;
}

export interface Type {
    id: number;
    type_service: string;
}

export interface SoftWare {
    id: number,
    class_service: string;
    service_name: string;
    producer: string;
}
