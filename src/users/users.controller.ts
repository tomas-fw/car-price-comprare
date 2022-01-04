import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  create(@Body() { email, password }: CreateUserDto) {
    return this.usersService.create(email, password);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async find(@Param('id') id: string) {
    const user = await this.usersService.find(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  list(@Query('email') email: string) {
    return this.usersService.list(email);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() attrs: UpdateUserDto) {
    return this.usersService.update(id, attrs);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
