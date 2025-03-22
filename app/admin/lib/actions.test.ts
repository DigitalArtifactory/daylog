import { prismaMock } from '@/prisma/singleton';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  deleteUser,
  getUsers,
  loadSettings,
  saveSettings,
  setAdmin,
} from './actions';

const mocks = vi.hoisted(() => ({
  fs: { existsSync: vi.fn(), readFileSync: vi.fn(), writeFileSync: vi.fn() },
  getCurrentSession: vi.fn(),
}));

vi.mock('fs', () => mocks.fs);

vi.mock('@/app/login/lib/actions', () => ({
  getCurrentSession: mocks.getCurrentSession,
}));

describe('actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return users from the database', async () => {
      const mockUsers = [{ id: 1, name: 'John Doe' }] as any;
      prismaMock.user.findMany.mockResolvedValue(mockUsers);

      const users = await getUsers();
      expect(users).toEqual(mockUsers);
    });
  });

  describe('setAdmin', () => {
    it('should update user role', async () => {
      const mockUser = { id: 1, name: 'John Doe', role: 'admin' } as any;
      prismaMock.user.update.mockResolvedValue(mockUser);

      const user = await setAdmin(1, 'admin');
      expect(user).toEqual(mockUser);
    });
  });

  describe('loadSettings', () => {
    it('should load settings from file', async () => {
      const mockSettings = { mfa: true, allowReg: false };
      mocks.fs.existsSync.mockReturnValue(true);
      mocks.fs.readFileSync.mockReturnValue(JSON.stringify(mockSettings));

      const settings = await loadSettings();
      expect(settings).toEqual(mockSettings);
    });

    it('should return null if settings file does not exist', async () => {
      mocks.fs.existsSync.mockReturnValue(false);

      const settings = await loadSettings();
      expect(settings).toBeNull();
    });
  });

  describe('saveSettings', () => {
    it('should save settings to file', async () => {
      const formData = new FormData();
      formData.set('mfa', 'active');
      formData.set('allowRegistration', 'active');

      mocks.fs.existsSync.mockReturnValue(false);
      mocks.fs.readFileSync.mockReturnValue(
        JSON.stringify({ mfa: false, allowReg: false })
      );

      const result = await saveSettings({}, formData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ mfa: true, allowReg: true });
    });
  });

  describe('deleteUser', () => {
    it('should delete user if not current session user', async () => {
      const mockSession = { user: { id: 2 } };
      const mockUser = { id: 1, name: 'John Doe' } as any;
      mocks.getCurrentSession.mockResolvedValue(mockSession);
      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      const user = await deleteUser(1);
      expect(prismaMock.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(user).toEqual(mockUser);
    });

    it('should not delete user if it is the current session user', async () => {
      const mockSession = { user: { id: 1 } };
      const mockUser = { id: 1, name: 'John Doe' } as any;
      mocks.getCurrentSession.mockResolvedValue(mockSession);
      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      const user = await deleteUser(1);
      expect(prismaMock.user.delete).not.toHaveBeenCalled();
      expect(user).toEqual(mockUser);
    });
  });
});
