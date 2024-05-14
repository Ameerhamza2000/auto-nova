import { PartialType } from '@nestjs/mapped-types';
import { CreateRefuelingDto } from './create-refueling.dto';

export class UpdateRefuelingDto extends PartialType(CreateRefuelingDto) {}
