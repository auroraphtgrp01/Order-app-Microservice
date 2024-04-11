// auth/auth.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { PassportLocalModel } from 'mongoose';
import { User } from './user.model';
import { beforeEach, describe, it } from 'node:test';

describe('AuthService', () => {
  let service: AuthService;
  const jwtServiceMock = { sign: () => 'mocked_token' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtServiceMock },
        {
          provide: getModelToken(User),
          useValue: PassportLocalModel,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token when given a valid user', async () => {
      // Mock user
      const mockUser = {
        _id: '123',
        username: 'test_user',
        comparePassword: () => true,
      };

      // Mock userModel
      const userModelMock = {
        findOne: jest.fn().mockReturnValueOnce(mockUser),
      };

      // Set userModelMock
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: getModelToken(User),
            useValue: userModelMock,
          },
        ],
      }).compile();
      const service = module.get<AuthService>(AuthService);

      // Execute
      const result = await service.login(mockUser as any);

      // Assert
      expect(result).toEqual({ access_token: 'mocked_token' });
    });

    it('should return null when given an invalid user', async () => {
      // Mock userModel
      const userModelMock = {
        findOne: jest.fn().mockReturnValueOnce(null),
      };

      // Set userModelMock
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: getModelToken(User),
            useValue: userModelMock,
          },
        ],
      }).compile();
      const service = module.get<AuthService>(AuthService);

      // Execute
      const result = await service.login({} as any);

      // Assert
      expect(result).toBeNull();
    });
  });
});
