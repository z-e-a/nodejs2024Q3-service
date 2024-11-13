import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { validate as validateUuid } from 'uuid';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.checkId(id);
    const user = this.checkUser(id);
    return user;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.checkId(id);
    this.checkUser(id);
    if (!updateUserDto) {
      throw new HttpException(
        `Request body does not contain required fields`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (updateUserDto.oldPassword !== this.userService.getUserPassword(id)) {
      throw new HttpException(
        `Wrong old password of user with id: ${id}`,
        HttpStatus.FORBIDDEN,
      );
    }
    return this.userService.setUserPassword(id, updateUserDto.newPassword);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.checkId(id);
    this.checkUser(id);
    return this.userService.remove(id);
  }

  checkId(id: string) {
    if (!validateUuid(id)) {
      throw new HttpException(
        `User id: ${id} is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  checkUser(id: string): UserDto {
    const user: UserDto = this.userService.findOne(id);
    if (!user) {
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
}
