import { PartialType } from '@nestjs/mapped-types';
import { CreateAnserDto } from './create-anser.dto';

export class UpdateAnserDto extends PartialType(CreateAnserDto) {}
