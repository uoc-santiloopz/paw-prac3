import dayjs from 'dayjs';

export class ReservationModel {
    id: number;
    name: string;
    surnames: string;
    phone: string;
    guests: number;
    dateReservation: dayjs.Dayjs;
    comments: string;

    constructor(res: any) {
        this.id = res.id;
        this.name = res.name;
        this.surnames = res.surnames;
        this.phone = res.phone;
        this.guests = res.guests;
        this.dateReservation = dayjs(res.date_reservation);
        this.comments = res.comments;
    }
}
