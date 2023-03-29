import { Test } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { JwtService } from './jwt.service';

const PRIVATE_KEY = 'testPrivateKey';

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => 'signed-token'),
    verify: jest.fn(() => ({ id: 1 })),
  };
});

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: CONFIG_OPTIONS,
          useValue: {
            privateKey: PRIVATE_KEY,
          },
        },
      ],
    }).compile();

    service = moduleRef.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sign', () => {
    const userId = 1;

    it('should return a signed JWT token', () => {
      const signedToken = service.sign(userId);

      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(jwt.sign).toHaveBeenCalledWith({ id: userId }, PRIVATE_KEY);
      expect(typeof signedToken).toBe('string');
      expect(signedToken).toBe('signed-token');
    });
  });

  describe('verify', () => {
    const token = 'test-token';

    it('should return the decoded payload of a JWT token', () => {
      const decodedToken = service.verify(token);

      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(jwt.verify).toHaveBeenCalledWith(token, PRIVATE_KEY);
      expect(decodedToken).toEqual({ id: 1 });
    });
  });
});
