import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getConnection, getConnectionManager } from 'typeorm';

jest.mock('got', () => {
  return {
    post: jest.fn(),
  };
});

const GRAPHQL_ENDPOINT = '/graphql';

describe('UserModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const connectionManager = getConnectionManager();
    if (!connectionManager.has('default')) {
      const options = app.get('DATABASE_CONNECTION');
      connectionManager.create(options);
    }
  });
  afterAll(async () => {
    // Close all connections after the tests are run
    await getConnectionManager().connections.forEach((connection) =>
      connection.close(),
    );
    await app.close();
  });

  describe('createAccount', () => {
    it('should create an account', async () => {
      const response = await request(server)
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `
            mutation {
              createAccount(input: {
                email: "test@example.com",
                password: "testpassword",
                role: Owner
              }) {
                ok
                error
              }
            }
          `,
        })
        .expect(200);

      // Investigate why the ok field is false and adjust the test accordingly
      expect(response.body.data.createAccount.ok).toBe(true);
      expect(response.body.data.createAccount.error).toBeNull();
    });
  });
  // describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let connections;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    connections = connections;
  });

  afterAll(async () => {
    const conn = getConnection();
    await conn.dropDatabase();
    await conn.close();
    app.close();
  });

  it('createAccount', () => {
    return request(app.getHttpServer())
      .post(GRAPHQL_ENDPOINT)
      .send({
        query: `
    mutation{
      createAccount(input:{
        email: "newe2e21@email.com",
        password:"newe2epassword",
        role:Owner
      }){
      ok
      error
      }
    }`,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createAccount.ok).toBe(true);
        expect(res.body.data.createAccount.error).toEqual(null);
      });
  });
  it.todo('me');
  it.todo('userProfile');
  it.todo('login');
  it.todo('editProfile');
  it.todo('verifyEmail');
});
