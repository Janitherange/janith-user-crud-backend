/* eslint-disable */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { UserModel } from "../../user.model";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async viewUsers() : Promise<UserModel[]> {
    const users = await this.prisma.user.findMany();

    if (!users) {
      throw new ForbiddenException("Credentials incorrect, Users can't be found");
    }
    return users
  }

  async createUser(data: UserModel) {
    try {
      return await this.prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          dateOfBirth: new Date(data.dateOfBirth),
          salary: data.salary
        }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken, User Creation failed',
          );
        }
      } else {
        throw error;
      }
    }
  }

  async updateUser(
    id: string,
    data: UserModel
  ) {
    try {
      return await this.prisma.user.update({
        where: {
          id: id
        },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          dateOfBirth: new Date(data.dateOfBirth),
          salary: data.salary
        }
      });
    } catch (error) {
      throw new ForbiddenException('Credentials incorrect, User Update failed');
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new ForbiddenException(
        'Credentials incorrect, User Deletion failed',
      );
    }
  }

  async findUser(id: string){
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new ForbiddenException(
        "Credentials incorrect, User can't be found",
      );
    }
  }
}
