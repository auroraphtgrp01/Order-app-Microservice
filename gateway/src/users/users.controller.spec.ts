import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/users/users.controller';
import { UsersService } from '../../src/users/users.service';
import { ClientKafka } from '@nestjs/microservices';

describe('UsersController', () => {
    let controller: UsersController;
    let userService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService, {
                provide: 'USERS_SERVICE',
                useClass: ClientKafka,
            },],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        userService = module.get<UsersService>(UsersService);
    });

    describe('findUserById', () => {
        it('should return the user when a valid ID is provided', async () => {
            const mockUser = [
                {
                    id: "e236146d-91c8-4b08-b362-2b797ba55dd3",
                    username: "user001",
                    password: "$2a$10$10H7r/N7R/XcJocfM2uSIOq6OkMFXehxfgLRQgUptxwnVL7A16MFe",
                    email: "user001@gmail.com",
                    refresh_token: null,
                    created_at: "2024-04-11T05:16:03.884Z",
                    updated_at: "2024-04-11T05:16:03.884Z",
                    updated_by: null,
                    deleted_at: null,
                    deleted_by: null
                }
            ]

            jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser as never);
            const userId = 'e236146d-91c8-4b08-b362-2b797ba55dd3';
            const foundUser = await controller.findOne(userId);

            expect(foundUser).toEqual(mockUser);
        });

        it('should return null when an invalid ID is provided', async () => {
            jest.spyOn(userService, 'findOne').mockResolvedValue([] as never);

            const userId = 'e236146d-91c8-4b08-b362-2b797ba55dd2';
            const foundUser = await controller.findOne(userId);

            expect(foundUser).toEqual([]);
        });
    });

    describe('findUserById', () => {
        it('should return the user when a valid ID is provided', async () => {
            const mockUser = [
                {
                    id: "e236146d-91c8-4b08-b362-2b797ba55dd3",
                    username: "user001",
                    password: "$2a$10$10H7r/N7R/XcJocfM2uSIOq6OkMFXehxfgLRQgUptxwnVL7A16MFe",
                    email: "user001@gmail.com",
                    refresh_token: null,
                    created_at: "2024-04-11T05:16:03.884Z",
                    updated_at: "2024-04-11T05:16:03.884Z",
                    updated_by: null,
                    deleted_at: null,
                    deleted_by: null
                }
            ]

            jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser as never);
            const userId = 'e236146d-91c8-4b08-b362-2b797ba55dd3';
            const foundUser = await controller.findOne(userId);

            expect(foundUser).toEqual(mockUser);
        });

        it('should return null when an invalid ID is provided', async () => {
            jest.spyOn(userService, 'findOne').mockResolvedValue([] as never);

            const userId = 'e236146d-91c8-4b08-b362-2b797ba55dd2';
            const foundUser = await controller.findOne(userId);

            expect(foundUser).toEqual([]);
        });
    });
});
