import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getConnection } from 'typeorm';

describe('UsersModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
  });

  describe('createAccount', () => {
    it('should create an account', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              createAccount(input: { email: "test@test.com", password: "test", role: Owner }) {
                ok
                error
              }
            }
          `,
        })
        .expect(HttpStatus.OK)
        .expect(({ body }) => {
          const {
            data: { createAccount },
          } = body;
          expect(createAccount.ok).toBe(true);
          expect(createAccount.error).toBe(null);
        });
    });

    it('should not create an account if the email already exists', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              createAccount(input: { email: "test@test.com", password: "test", role: Owner }) {
                ok
                error
              }
            }
          `,
        })
        .expect(HttpStatus.OK)
        .expect(({ body }) => {
          const {
            data: { createAccount },
          } = body;
          expect(createAccount.ok).toBe(false);
          expect(createAccount.error).toBe(
            'There is a user with this email already',
          );
        });
    });

    it('should not create an account with invalid input', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              createAccount(input: { email: "notanemail", password: "", role: "InvalidRole" }) {
                ok
                error
              }
            }
          `,
        })
        .expect(HttpStatus.OK)
        .expect(({ body }) => {
          const {
            data: { createAccount },
          } = body;
          expect(createAccount.ok).toBe(false);
          expect(createAccount.error).toContain('password must be longer');
          expect(createAccount.error).toContain(
            'role must be one of the following',
          );
        });
    });
  });
});
