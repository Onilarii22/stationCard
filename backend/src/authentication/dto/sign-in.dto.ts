import { OmitType } from '@nestjs/mapped-types';
import { Authentication } from '../entities/authentication.entity';

export class SignIn extends OmitType(Authentication, [
  'firstname',
  'lastname',
]) {}
