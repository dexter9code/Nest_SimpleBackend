import {
  Session,
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
import { Serialize } from './../interceptors/serialize.interceptor';
import { UserDto } from './../DTO/user.dto';
import { AuthServcie } from './auth-service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthServcie,
  ) {}

  @Get(`/whoami`)
  WhoAmI(@Session() session:any){
    return this.userService.findOne(session.userId)
  }

  @Post(`/signup`)
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return `User Created successfully`;
  }

  @Post(`/signin`)
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post(`/signout`)
  singOut(@Session() session:any){
    session.userId=null
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
