export class Prijava {
    constructor(
        public id: string,
        public projekatId: string,
        public userId: string,
        public nazivProjekta: string,
        public imgProjekta: string,
        public ime: string,
        public prezime: string,
        public tim: string,
        public poruka: string
    ) { }
}