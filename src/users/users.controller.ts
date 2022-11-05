import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './../DTO/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './../DTO/update-user.dto';
import { Serialize, SerializeInterceptor } from './../interceptors/serialize.interceptor';
import { UserDto } from './../DTO/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post(`/signup`)
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
    return `User Created successfully`
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @Serialize(UserDto)
  @Get(`/:id`)
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete(`/:id`)
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch(`/:id`)
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
