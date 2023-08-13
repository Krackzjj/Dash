import dayjs from 'dayjs';

export function addTime(add: string, date: number = new Date().getTime()) {
    const [hours, minutes, second] = add.split(':');
    const newDate = dayjs(date).add(parseInt(hours), 'hour').add(parseInt(minutes), 'minute').add(parseInt(second), 'second').toDate().getTime();
    return newDate;
}
export function subTime(remove: string, date: number = new Date().getTime()) {
    const [hours, minutes, second] = remove.split(':');
    const newDate = dayjs(date).subtract(parseInt(hours), 'hour').subtract(parseInt(minutes), 'minute').subtract(parseInt(second), 'second').toDate().getTime();
    return newDate;
}

export function formatToHuman(date: Date, format: string = 'YYYY-MM-DD') {
    return dayjs(date).format(format);
}

export function formatDate(date: number = new Date().getTime()) {
    return dayjs(date).format('YYYY-MM-DD');
}
