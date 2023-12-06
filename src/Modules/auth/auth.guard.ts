/* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  //canActivate interface enables up to customize our own guard logic
  //It return boolean to decide if request should be allowed or not

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Execution Context comes from Argument Host which provides two methods, 1.getHandler, 2. getClass
    //This method is used to retrieve metadata and check if is public key is true or false
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      //getAllOverride method is used to merge both metadata of controller class and handler function associated with the current route.
      context.getHandler(), //refrence to the handler like create method
      context.getClass(), //return controller class which particular handler belongs to like Cats Controller type
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request);
    //switchToHttp provides two methods 1.getRequest, 2.getResponse
    const token = this.extractTokenFromHeader(request);
    console.log(token);
    if (!token) {
      console.log('Im here');
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      request['user'] = payload; //Execution Context provides information about current execution context with three object [request, response, next]
    } catch {
      console.log('i m here');
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []; // This is checking the request from jwt
    return type === 'Bearer' ? token : undefined;
  }
}
