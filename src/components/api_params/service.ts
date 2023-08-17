export class Service {

    id: number;
    service_name: string;
    producer: string;
    viewtype_name: string;
    status_issue_name: string;
    create_date: string;
    create_date1: string;
    service_url: string;

    constructor(id: number = 0, service_name: string = '',
                    producer: string = '', viewtype_name: string = '',
                    status_issue_name: string = '', create_date: string = '', create_date1: string = '', service_url: string = '') {

            this.id = id;
            this.service_name = service_name;
            this.producer = producer;
            this.viewtype_name = viewtype_name;
            this.status_issue_name = status_issue_name;
            this.create_date = create_date;
            this.create_date1 = create_date1;
            this.service_url = service_url;
    }

}

