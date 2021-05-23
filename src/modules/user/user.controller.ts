import { Controller, Get, Post,Body, Delete, Param, Put, UseGuards, UseFilters } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags,ApiBody, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { UserDTO } from "./dto/user.dto";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { User } from "src/entities/User";

@ApiTags('user')
@Controller('user')
// @UseFilters(new DispatchError())
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    showAllUser() {
        return this.userService.showAll();
    }

    @Get('GetById/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    showUserById(@Param('id') id: string) {
        return this.userService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'create user' })
    async createUser(@Body() data: UserDTO) {
        return await this.userService.create(data);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async destroyUser(@Param('id') id: string) {
        return this.userService.destroy(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: [User] })
    updateUser(@Param('id') id: string, @Body() data: UserDTO) {
        return this.userService.update(id, data);
    }

}