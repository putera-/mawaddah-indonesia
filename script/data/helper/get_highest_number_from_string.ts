export function get_highest_number_from_string(angka_string: any) {
    if (angka_string == undefined) return 0;
    const lowest = Math.max(...angka_string.match(/\d+/g).map(Number));
    if (isNaN(lowest)) return 0;
    return lowest;
}
