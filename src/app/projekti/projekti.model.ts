export class Projekat {
    constructor(
        public id: string,
        public naziv: string,
        public opis: string,
        public imgUrl: string,
        public lokacija: string,
        public timovi: string[],
        public datum: string
    ){}
}