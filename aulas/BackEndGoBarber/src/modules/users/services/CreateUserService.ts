import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPass = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPass,
    });

    return user;
  }
}

export default CreateUserService;
