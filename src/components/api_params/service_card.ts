import { ReactNode } from "react";

export class Act_Service_card {
    // act_service_card: any;
    // static find(arg0: (p: any) => boolean) {
    //     throw new Error("Method not implemented.");
    // }

    id: string;
    service_name: string;
    producer: string;
    producer_phone: string;
    producer_email: string;
    inn: string;
    ogrn: string;
    ktru: string;
    version: string;
    service_description: string;
    okpd2: string;
    docs_url: string;
    owner_certificate: string;
    fstec_number: string;
    NFAP_number: string;
    producer_type: string;
    doc_number: string;
    address: string;
    software: number;
    doc_attached: number;
    viewtype_name: string;
    status_issue_name: string;
    create_date: string;
    service_url: string;
    static service_name: ReactNode;
    static fstec_number: ReactNode;
    static viewtype_name: ReactNode;
    static producer: ReactNode;
    static create_date: ReactNode;
    static status_issue_name: ReactNode;
    static ktru: ReactNode;
    static doc_number: ReactNode;
    static docs_url: ReactNode;
    static id: number;

    constructor(id: string = '', service_name: string = '',
                    producer: string = '', viewtype_name: string = '',
                    status_issue_name: string = '', create_date: string = '',  service_url: string = '',
                    producer_phone: string = '', producer_email: string = '', inn: string = '', ogrn: string = '',
                     ktru: string = '', version: string = '',service_description: string, okpd2: string = '', docs_url: string = '',
                     owner_certificate: string = '', fstec_number: string = '', NFAP_number: string = '', 
                     producer_type: string = '', doc_numder: string = '', address: string = '', software: number = 0,
                     doc_attached: number = 0,) {

            this.id = id;
            this.service_name = service_name;
            this.producer = producer;
            this.viewtype_name = viewtype_name;
            this.status_issue_name = status_issue_name;
            this.create_date = create_date;
            this.service_url = service_url;
            this.id = id;
            this.producer_phone = producer_phone;
            this.producer_email = producer_email;
            this.inn = inn;
            this.ogrn = ogrn;
            this.ktru = ktru;
            this.version = version;
            this.service_description = service_description;
            this.okpd2 = okpd2;
            this.docs_url = docs_url;
            this.owner_certificate = owner_certificate;
            this.fstec_number = fstec_number;
            this.NFAP_number = NFAP_number;
            this.producer_type = producer_type;
            this.doc_number = doc_numder;
            this.address = address;
            this.software = software;
            this.doc_attached = doc_attached;


    }

}