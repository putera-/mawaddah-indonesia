export interface Physical_char {
    id: string
    body_shape: body_shape
    skin_color: skin_color
    hair_type: hair_type
    hair_color: hair_color
    eye_color: eye_Color
    characteristic: boolean
    characteristic_detail: string
    medical_history: boolean
    medical_history_detail: string
    createdAt: Date
    updatedAt: Date
    Biodata: string
    biodataId: string
}

enum body_shape {
    sangat_kurus = 'sangat_kurus',
    kurus = 'kurus',
    atletis = 'atletis',
    normal = 'normal',
    gempal = 'gempal',
    gemuk = 'gemuk',
    sangat_gemuk = 'sangat_gemuk',
}

enum skin_color {
    sawo_matang = 'sawo_matang',
    putih = 'putih',
    putih_kemerahan = 'putih_kemerahan',
    gelap = 'gelap',
    hitam = 'hitam'
}

enum hair_color {
    hitam = 'hitam',
    pirang = 'pirang',
    merah = 'merah',
    putih = 'putih'
}

enum hair_type {
    lurus = 'lurus',
    ikal = 'ikal',
    keriting = 'keriting',
    kribo = 'kribo',
    botak = 'botak'
}

enum eye_Color {
    hitam = 'hitam',
    coklat = 'coklat',
    biru = 'biru',
    hijau = 'hijau'
}
