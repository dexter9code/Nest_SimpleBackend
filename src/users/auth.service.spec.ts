import { Test } from '@nestjs/testing';
import { AuthServcie } from './auth-service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthServcie;
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const models = await Test.createTestingModule({
      providers: [
        AuthServcie,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = models.get(AuthServcie);
  });

  it(`can create an instance of auth service`, async () => {
    expect(service).toBeDefined();
  });

  it(`should create a new user with salted and hashed password`, async () => {
    const user = await service.signup('something@gmail.com', 'password');

    expect(user.password).not.toEqual('password');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it(`should throw an error if user signup email that is in user`, async (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'some@gmail.com', password: 'passowrd' } as User,
      ]);

    
    const user=  await service.signup('testuser@domain.com', 'password');
    expect(user).toThrowError()
    
  });
});
