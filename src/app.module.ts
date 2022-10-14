/* eslint-disable */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PrismaService } from "./services/prisma/prisma.service";
import { UserService } from "./services/user/user.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService, UserService]
})
export class AppModule {
}
