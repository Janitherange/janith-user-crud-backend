import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { UserModel } from "./user.model";
import { UserService } from "./services/user/user.service";

@Controller("backend")
export class AppController {
  constructor(private userService: UserService) {
  }

  @Get("view")
  viewUsers(): Promise<UserModel[]> {
    return this.userService.viewUsers();
  }

  @Post("create")
  createUser(@Body() user: UserModel): Promise<UserModel> {
    return this.userService.createUser(user);
  }

  @Put("update/:id")
  updateUser(@Param("id") id: string, @Body() user: UserModel): Promise<UserModel> {
    return this.userService.updateUser(id, user);
  }

  @Delete("delete/:id")
  deleteUser(@Param("id") id: string): Promise<UserModel> {
    return this.userService.deleteUser(id);
  }

  @Get("view/:id")
  findUser(@Param("id") id: string): Promise<UserModel> {
    return this.userService.findUser(id);
  }
}
