export function get_lowest_number_from_string(angka_string: any) {
    if (angka_string == undefined) return 0;
    const lowest = Math.min(...angka_string.match(/\d+/g).map(Number));
    if (isNaN(lowest)) return 0;
    return lowest;
}
