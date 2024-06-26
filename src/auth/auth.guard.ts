import { CanActivate, ExecutionContext, Global, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService:JwtService){}
  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token= this.extractTokenFromHeader(request) ;

    if(!token){
        throw new UnauthorizedException('No Token!');
    }

    try {
        const payload= await this.jwtService.verifyAsync(token);

        request['user']=payload;
    }
    catch(error){
        throw new UnauthorizedException('Invalid Token!')
    }

    return true;

}
private extractTokenFromHeader(request:Request):string | undefined{
    const [type,token]= request.headers.authorization?.split(' ')??[];
    return type === 'Bearer' ? token : undefined;
}
}
