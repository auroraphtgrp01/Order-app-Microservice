import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class variantsType {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsNumber()
  @IsNotEmpty()
  quantities: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => variantsType)
  variants: variantsType[];
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class queryParamsOrders {
  @IsOptional()
  @IsNumberString()
  skip?: number;
  @IsOptional()
  @IsNumberString()
  limit?: number;
  @IsOptional()
  @IsString()
  orderby?: string;
  @IsOptional()
  @IsString()
  id?: string;
  @IsOptional()
  @IsString()
  name?: string;
}
