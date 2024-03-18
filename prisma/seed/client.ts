import { PrismaClient } from '@prisma/client';

export async function clientSeed(prisma: PrismaClient, id: string) {
    const data = {
        id,
        name: 'Mawaddah Indonesia',
        about: 'Mawaddah Indonesia Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptates dolores eum tenetur impedit dicta suscipit modi aliquid est similique adipisci optio officiis iusto nobis non, nemo sunt, nam quia quasi vel ut facere beatae! Quaerat necessitatibus unde neque, quas libero odit nemo rerum eveniet veritatis et! Nesciunt, illo tempora. Consequuntur fugit maxime error eaque natus porro cupiditate optio consequatur itaque nemo dolorem voluptas, dignissimos vel. Voluptates, quia asperiores, numquam quam dolorum fugit nulla ut rerum a omnis cupiditate distinctio deleniti quis voluptas illum? Dolor quisquam sunt ipsa, sed maiores eum excepturi omnis laborum, ullam deleniti nihil itaque ab dolorum.',
        phone: '+62 811-1111-1111',
        address: 'Jl Kemenyan, Ciganjur, Jagakarsa, DKI Jakarta, 12630. Indonesia',
        taaruf_muqoddimah: "Taaruf Muqoddimah",
        login_muqoddimah: "Login Muqoddimah",
        signup_muqoddimah: "Signup Muqoddimah",
        youtube: 'https://youtube.com',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        tiktok: 'https://tiktok.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
    }

    await prisma.client.upsert({
        where: { id },
        update: data,
        create: data,
    });

    console.log('Seed: Client');
}
