import { Url } from "url"

export interface NewAppParams{
    title: string,
    app_number: string,
    face: string,
    create_body_entity: {
        full_name: string,
        short_name:string,
        inn: number,
        ogrn: number,
        email: string,
        file: File
    },
        registration: boolean,
        create_body_cp:{
            errpNumber: string,
            form: string,
            name: string,
            producer: string,
            version: string,
            poClass: string
        },
        characteristics:{
            description: Text,
            file: File
        },
        cp_info: {
            ctru: number,
            okpd: number,
            nfap: number,
            website_har: Url,
            website_prod: Url,
            number: number,
            date_reg: string,
            date_pub: string
        },
        cp_reg_szi: boolean,
        szi_number: string,
        prod_docs:{
            fileStatement: File,
            fileCopyOfCharter: File,
            fileLawOfUse: File,
            fileLicense: File
        },
        cp_docs:{
            fileDocumentation: File,
            fileProject: File,
            fileDeclaration: File,
            fileTestsProgramm: File,
            fileArchitecture: File
        }
    }

