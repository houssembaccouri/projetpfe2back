import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Put, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { User } from 'src/auth/models/user.interface';
import { UserService } from '../service/user.service';


@Controller('users')
export class UserController {
constructor(private userService: UserService){}

@Get()
index(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
):Observable<Pagination<User>>{
    limit = limit > 100 ? 100 : limit;
   return this.userService.paginate({page, limit, route: 'http://localhost:3000/users',});
    
   

}

@Get(':id')
findUser(@Param()params): Observable<User>{
    return this.userService.findUser(params.id);

}  

@Delete(':id')
deleteUser(@Param('id')id:string): Observable<User>{

return this.userService.deleteUser(Number(id));

}

@Put(':id')
updateUser(@Param('id') id: string, @Body() user: User): Observable<any>{
    return this.userService.updateUser(+id, user);

}















}
