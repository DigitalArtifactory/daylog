import { Prisma } from "@/prisma/generated/client";

export default function getSorting(sort: string) {
    let sorting: Prisma.NoteOrderByWithRelationInput | Prisma.BoardOrderByWithRelationInput = {};
    switch (sort) {
        case 'created_desc':
            sorting = { createdAt: 'desc' };
            break;
        case 'created_asc':
            sorting = { createdAt: 'asc' };
            break;
        case 'updated_desc':
            sorting = { updatedAt: 'desc' };
            break;
        case 'updated_asc':
            sorting = { updatedAt: 'asc' };
            break;
        case 'title_desc':
            sorting = { title: 'desc' };
            break;
        case 'title_asc':
            sorting = { title: 'asc' };
            break;
        default:
            sorting = { createdAt: 'desc' };
    }
    return sorting;
}