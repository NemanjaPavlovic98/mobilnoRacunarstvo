export class Projekat {
    constructor(
        public id: string,
        public naziv: string,
        public opis: string,
        public imgUrl: string,
        public lokacija: string,
        public timovi: Array<String>,
        public datumOd: Date,
        public datumDo: Date
    ){}
}