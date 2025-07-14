"use client";
import '/app/globals.css';
import { ImagesPath } from '@/app/utils/assetsPath';

export default function MyJourney() {
    // Lista de meses con enlaces específicos
    const months = [
        {
            name: 'August',
            key: 'august',
            links: [
                { name: 'Monthly History', image: '/images/journey/mago.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EeKDShfH8ydBmRJhKJUxUdUBVvfAj-VF0Qh3mkaxCxJrhA?e=kBkJGd' },
                { name: 'Sage’s Board', image: '/images/journey/motus.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/Eb1GXXHrLhVNhRjlRTMlrboBP2houtAQE1jhFtZ10ilnGA?e=tEJcOB' },
                { name: 'Questions', image: '/images/journey/dragon.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/Ed1SP2uDrQRDtnHyvUUgxFUBRtZq9sWhP3GlMN8xYM3N9g?e=WqZmf3' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:u:/g/personal/gabriel_bustamante_thenewschool_edu_co/ESpBfbNDk-VDmSVHnT0kwpUBD7CYUrEyQ93f6u4tu1qnQw?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=CqzSEI' },
            ],
        },
        {
            name: 'September',
            key: 'september',
            links: [
                { name: 'Monthly History', image: '/images/journey/mago.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EbqF7du31xRPjAhyh7TzZhABv5p7Tim9xcFs-GB9JW9Qng?e=s74Jd9' },
                { name: 'Sage’s Board', image: '/images/journey/motus.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/ESYunFSSYntPid8v4xzzzlsB4Kw5NjXasQcRzG4a47-KfQ?e=A4oIum' },
                { name: 'Questions', image: '/images/journey/dragon.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EW-VeWcC-QBOmKQVmiEf-04B2zRaYm7to0BjWWnrzBZFNQ?e=bsBLky' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:u:/g/personal/gabriel_bustamante_thenewschool_edu_co/EUd1wnl-jK1Kk2pPqChQ4iABiDBQfHawE6pFSMx7m8pJRQ?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=pnxi7R' },
            ],
        },
        {
            name: 'October',
            key: 'october',
            links: [
                { name: 'Monthly History', image: '/images/journey/mago.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EVGTp58qi8VHthANRE95JVwBaGVMTJxQ7QSwRW_GCPcNaA?e=pmdf6O' },
                { name: 'Sage’s Board', image: '/images/journey/motus.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/ESWSyS1q63lJgLl0Dh6pP2EBY277Lbo6QwFBaRwELVodeg?e=r5haKa' },
                { name: 'Questions', image: '/images/journey/dragon.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EQ9PUol1rqlEuGP67acfLiABf977QY_cE1xpjRLtDhFXXA?e=rQRWP0' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:u:/g/personal/gabriel_bustamante_thenewschool_edu_co/EY57lAOQ4XZKmLBEbfie9K0BqqEaZwoQvzMbanN-3lC-Zg?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=ioL5uD' },
            ],
        },
        {
            name: 'November',
            key: 'november',
            links: [
                { name: 'Monthly History', image: '/images/journey/mago.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EYJqD-DiT99MssnqT8XgoYgBrYzicmiTdIlDwuQlSXmoQw?e=QkKZEA' },
                { name: 'Sage’s Board', image: '/images/journey/motus.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EYuQqXWTGKRIt1F15k6DX7kB68H53oJqf_KqRsvo4reK-g?e=8683vB' },
                { name: 'Questions', image: '/images/journey/dragon.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EUhkUD_MTahFkA_4tOfcad4Bz8RDiaBoJLdw5Rl7DDHw1w?e=4xtPT4' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:u:/g/personal/gabriel_bustamante_thenewschool_edu_co/ETasPGgzpihGtgdTRITvJrQBtMcOvRF_taAPnZDMPv1SBw?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=gnfq5H' },
            ],
        },
        {
            name: 'December',
            key: 'december',
            links: [
                { name: 'Monthly History', image: '/images/journey/mago.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/Ed9mQ7gkCKlFq5xs4vWDdWMBJ-4O6QL4Gk0xd0QgD7v6RA?e=IbtriZ' },
                { name: 'Sage’s Board', image: '/images/journey/motus.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EQdSfDcDhX9KuG3ErWvbwVYBNYJTZkUDG6J-_ZXNU6gJxA?e=lDucd7' },
                { name: 'Questions', image: '/images/journey/dragon.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EVGUprKAOGxBqHB208_pBU0BRV0AZ1_9TodJd-tho1YGLg?e=mbWmCQ' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:u:/g/personal/gabriel_bustamante_thenewschool_edu_co/ERjmroOKc09Fl6DhauMtWm4BY0QMEhfnxnB-wzL46grgPA?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=qPolIf' },
            ],
        },
        {
            name: 'January',
            key: 'january',
            links: [
                { name: 'Monthly History', image: '/images/journey/mago.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EeonGKkTKj9OqNf0FpmAclMBcbAjzHERgE9EkGtYu3r8Jw?e=eQ6Mp8' },
                { name: 'Sage’s Board', image: '/images/journey/motus.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EXe3I1gd_9lDhrbOFR6nbnwBcE6ugurmojrFRQk1-Z6jDg?e=ueljgp' },
                { name: 'Questions', image: '/images/journey/dragon.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EWTxktQwZ1hOrdFGfjMMwPEBXikXusdYe3oLSxHGtQKlXg?e=osAqlk' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:u:/g/personal/gabriel_bustamante_thenewschool_edu_co/EbGPzRzVGj9AkMP71XhhLuQBir3ZZJpdSNP-0o6ZgQLVJg?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=GVfzv6' },
            ],
        },
        {
            name: 'February',
            key: 'february',
            links: [
                { name: 'Monthly History', image: '/images/journey/mago.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/ETdthgAgZuBLrhb2HdoQafsB9Ot43tdSvXnGDUqKO6q9PA?e=c8k31s' },
                { name: 'Sage’s Board', image: '/images/journey/motus.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/ERHffwi_A_9EtCtsV_PHwHUBdSJKorvbz47fOnjh_9ud3A?e=G8k7gE' },
                { name: 'Questions', image: '/images/journey/dragon.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EYAQfby1VE9JgbJ1aRZ0mwYB29grYcAIY7suWq7URZMYdw?e=5lFDtM' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:u:/g/personal/gabriel_bustamante_thenewschool_edu_co/EU_bvVadWMxNorZF1L5YlXQB78Rl2WUp-607q_7ME7xYFA?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=McrijK' },
            ],
        },
        {
            name: 'March',
            key: 'march',
            links: [
                { name: 'Monthly History', image: '/images/journey/mago.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EWpsj9iK_jlMkNiW8kGrldwBJ7r2Ctp_dpBRyv87-MMWwA?e=nkaSik' },
                { name: 'Sage’s Board', image: '/images/journey/motus.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EfLcV5HITDRKuIbOkl59uQMBY4AwaG27GreiwxEoXLiQ_w?e=9Zr0Ec' },
                { name: 'Questions', image: '/images/journey/dragon.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/Ec20O4xVD1BHr_zSmGpGTuABBsT6QbTbqIWumhQqVY-fmQ?e=AhFA75' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:u:/g/personal/gabriel_bustamante_thenewschool_edu_co/EXOZJZC7LlhPhdWRPiR-wsEBgU3TY6s9WMc5E8gpqL5Y-A?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=UExfrc' },
            ],
        },
        {
            name: 'April',
            key: 'april',
            links: [
                { name: 'Monthly History', image: '/images/journey/mago.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EdwhKJMUyURKrsDssxAfLrwBsc7cEqZDxqjYREv99iDUhQ?e=KmbuoH' },
                { name: 'Sage’s Board', image: '/images/journey/motus.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EWrWT2FAhI1GuUcB11ZD-1QBUZsVNeqmPT8ESU54XhX9tA?e=a3GCVh' },
                { name: 'Questions', image: '/images/journey/dragon.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/ESVqULgwCltBnYLsUe23TLMBwJcjQjHiOvEHF71U5gJA6A?e=Dr1q5Q' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:u:/g/personal/gabriel_bustamante_thenewschool_edu_co/ESkxqcVGYgxAmDJ0GP-mKj8B553Q0xpp0t6P4fCu3V2MsQ?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=wSKb6D' },
            ],
        },
        {
            name: 'May',
            key: 'may',
            links: [
                { name: 'Monthly History', image: '/images/journey/mago.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EW3IPXwPH-1EnpB8fp7A9nsBhlRrPUVh6WdLlv7r1ZE_Zw?e=8obdgZ' },
                { name: 'Sage’s Board', image: '/images/journey/motus.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EVp98a_G5zZNj1pG9nUQXoEBmFA08ZnaVXAKzcJwsLTrGw?e=4YYaGm' },
                { name: 'Questions', image: '/images/journey/dragon.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/ERXLEmFwVTlLsJEncNU0Y7kB19b2HCejUR2-r3qSUxdGgA?e=iWJq8s' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:u:/g/personal/gabriel_bustamante_thenewschool_edu_co/EaTXDF3n6jRJpra_ZQfHKlsBArerexaYP4SgsAF8sGa4Uw?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=cykRbK' },
            ],
        },
        {
            name: 'June',
            key: 'june',
            links: [
                { name: 'Monthly History', image: '/images/journey/mago.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EVDZ337R-5pLnounJEoBTLUBF4gryKuKYKaMGIoznhKNSw?e=FER4ZL' },
                { name: 'Sage’s Board', image: '/images/journey/motus.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EbLV944U_YpAtlh0MIwLNxIBVNVZ3kkWTju3WOfwH18L0w?e=dPrcjd' },
                { name: 'Questions', image: '/images/journey/dragon.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EUfxLFao9cBNqIhNszn1sccBNyaKSPvGBIDrunZIFV-ILQ?e=0gahoj' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:u:/g/personal/gabriel_bustamante_thenewschool_edu_co/ET1aB43ZuHBLn1Tq8_U_XCIBw47k8vW5JaIb3AzFRyh2tg?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=wHpXKQ' },
            ],
        },
        {
            name: 'July',
            key: 'july',
            links: [
                { name: 'Monthly History', image: '/images/journey/mago.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EfeAwHSXFwxBvxFqiAA6800BLFSlVihekaujaAVi4_V2sA?e=levZlk' },
                { name: 'Sage’s Board', image: '/images/journey/motus.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EVbF_-WuT6dNhAF4hl3tKRgBnx0zd0RD4pk5d69ONWVo_g?e=zs9YIJ' },
                { name: 'Questions', image: '/images/journey/dragon.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/ETUXEFNxzFNEpy6BfOec7dMB0lyFFAgf4BIQHJ-WbJ6QXw?e=A0pnYQ' },
                { name: 'Mindfulness', image: '/images/journey/arbol.jpeg', href: 'https://thenewschooledu-my.sharepoint.com/:u:/g/personal/gabriel_bustamante_thenewschool_edu_co/ET1aB43ZuHBLn1Tq8_U_XCIBw47k8vW5JaIb3AzFRyh2tg?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=wHpXKQ' },
            ],
        },
    ];

    // Lista de íconos para la nueva sección
    const journeyIcons = [
        { image: '/images/journey/journey_mapa.png', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EXJkzXlgqZdKnwNBvwAVVYwBcFHIRSpVVJYalaNxMdoHFQ?e=9Gm4TJ' },
        { image: '/images/journey/journey_camino.png', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EYMOG8GrDSxKgyr50dGZDj4ByJ26SCulpDurhpliJd3Mnw?e=BoHUjf' },
        { image: '/images/journey/journey_sol.png', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EdwhKJMUyURKrsDssxAfLrwBsc7cEqZDxqjYREv99iDUhQ?e=KmbuoH' },
        { image: '/images/journey/journey_escudo.png', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EVsmQtgQ-2dFs1hkhc5RVkkBSVqXvI-9DHPym7AVoVqHBQ?e=caLjod' },
        { image: '/images/journey/journey_inner.png', href: 'https://thenewschooledu-my.sharepoint.com/:b:/g/personal/gabriel_bustamante_thenewschool_edu_co/EXghdaD85chOmW8i7YdtVI4Bam3NEUnupKV13zh236Ow2A?e=Q9WsC0' },
    ];

    return (
        <div className="backgroundImagefour py-14">
            {/* Sección de presentación */}
            <div className="contenedor flex justify-center items-center pt-4 pb-4">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center">
                    <div className="md:w-1/2 flex justify-center order-1 md:order-1">
                        <img
                            className="md:w-[420px] rounded-lg object-cover"
                            src={ImagesPath.presentacion1}
                            alt="My Journey Presentation"
                        />
                    </div>
                    <div className="md:w-1/2 text-center md:text-left px-4 order-2 md:order-2">
                        <h1 className="text-4xl font-bold text-grayTerciary mb-4">
                            My Journey
                        </h1>
                        <p className="text-gray-500 text-[13px]">
                            This journal invites us to take time each day to get to know ourselves, so that we can optimally express our Being in our relationship with ourselves, with others, and with the various circumstances of our human experience. It has been designed as a timeless journal that we can use in our own style and at our own learning pace at any point in our life journey.
                        </p>
                        <br />
                        <p className="text-gray-500 text-[13px]">
                            Didactically, this journey has been structured into 12 stages—one for each month—corresponding to the essential aspects of the competencies of "knowing how to be," which promote the development of consciousness for life and through life. Using the metaphor of the hero's journey, we embark on an "inner journey," discovering what we already are and know.
                        </p>
                    </div>
                </div>
            </div>

            {/* Sección de instrucciones */}
            <div className="contenedor flex justify-center items-center pt-4 pb-4">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center">
                    <div className="md:w-1/2 text-center md:text-left px-4 order-2 md:order-1">
                        <h2 className="text-2xl font-bold text-grayTerciary mb-4">
                            Instructions for use:
                        </h2>
                        <ol className="text-gray-500 text-[13px] list-decimal list-inside">
                            <li className="mb-2">
                                Open the treasure map inside the envelope called ‘Call to Adventure!’ read the clues; locate the corresponding place for each clue on the map and mark it with the number of the competency assigned to that clue.
                            </li>
                            <li className="mb-2">
                                Fill the page called “the TNS coat of arms inspires my biographical journey”.
                            </li>
                            <li className="mb-2">
                                Use the monthly divider as follows:
                                <ol className="list-decimal list-inside ml-4">
                                    <li className="mb-1">
                                        Explore the dragon caves by reading the questions in each of them and answering them.
                                    </li>
                                    <li className="mb-1">
                                        Discover the symbols in the wizard’s stories by reading the tale on the back of the divider and creating a drawing that represents my interpretation of the story.
                                    </li>
                                    <li className="mb-1">
                                        Investigate the sage’s board by scanning the QR code on the back of the divider, next to the image of Motus, the TNS mascot. Here, I find scientific elements that help me reflect on the dragon’s questions.
                                    </li>
                                    <li className="mb-1">
                                        Practice mindfulness exercises by accessing the QR code located next to the tree on the front of the divider.
                                    </li>
                                </ol>
                            </li>
                            <li className="mb-2">
                                Discover treasures and record what I have learned each day of the month, applying it to my life. Additionally, I fill in the remaining rays of the gratitude sun with my own expressions, write my power phrases, and note the symbolic language of my dreams.
                            </li>
                            <li className="mb-2">
                                Engage in and solve the logical and critical thinking activities.
                            </li>
                            <li className="mb-2">
                                Use the flyer titled for my "Inner journey” daily.
                            </li>
                        </ol>
                        <p className="text-gray-500 text-[13px] mt-4">
                            Thank you very much for embarking on this adventure.<br />
                            The Editors.
                        </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                        <img
                            className="md:w-[420px] rounded-lg object-cover"
                            src={ImagesPath.presentacion2}
                            alt="Instructions Presentation"
                        />
                    </div>
                </div>
            </div>

            {/* Nueva sección de íconos */}
            <div className="contenedor flex justify-center items-center pt-4 pb-4 mb-5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-grayTerciary mb-8 text-center">
                        Journey Resources
                    </h2>
                    <div className="flex justify-center space-x-12">
                        {journeyIcons.map((icon, index) => (
                            <a key={index} href={icon.href} className="hover:opacity-75">
                                <img
                                    className="w-40 h-40 rounded-md object-cover"
                                    src={icon.image}
                                    alt={`Journey Icon ${index + 1}`}
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sección de meses */}
            <div className="contenedor flex justify-center items-center pt-4 pb-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-grayTerciary mb-12 text-center">
                        Monthly Journey
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {months.map((month, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4">
                                <h3 className="text-xl font-semibold text-grayTerciary mb-4 text-center">
                                    {month.name}
                                </h3>
                                <div className="space-y-4">
                                    {month.links.map((link, linkIndex) => (
                                        <div key={linkIndex} className="flex items-center space-x-4">
                                            <img
                                                className="w-16 h-16 rounded-md object-cover"
                                                src={link.image}
                                                alt={link.name}
                                            />
                                            <a
                                                href={link.href}
                                                className="text-gray-500 font-serif font-bold text-[13px] hover:underline"
                                            >
                                                {link.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <br />
            <br />
        </div>
    );
}