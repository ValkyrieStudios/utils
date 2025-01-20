import {compileSpec} from './isFormat';

export function parse (d: Date, zone: string): Date {
    const {rgx} = compileSpec('DD/MM/YYYY, HH:mm:ss');
    const localeString = d.toLocaleString('nl-BE', {
        timeZone: zone,
        day: '2-digit',
        month: '2-digit',
        year:'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    const matches = rgx.exec(localeString);
    if (!matches) throw new Error('dateParser/parse: failed to parse date');
    // Build the new date based on the matched values
    return new Date(Number(matches[3]),
        Number(matches[2]) - 1,
        Number(matches[1]),
        Number(matches[4]),
        Number(matches[5]),
        Number(matches[6])
    );
}
