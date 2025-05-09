import { PrismaClient } from '@/prisma/generated/client';
import { beforeEach, vi } from 'vitest';
import { DeepMockProxy, mockDeep, mockReset } from 'vitest-mock-extended';

import { prisma } from '@/prisma/client';

vi.mock('./client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/prisma/client')>();
  return {
    __esModule: true,
    ...actual,
    prisma: mockDeep<PrismaClient>(),
  };
});

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
