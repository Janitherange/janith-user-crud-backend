/* eslint-disable prettier/prettier */
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

export class UserModel {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsNumber()
  salary: number;
}
