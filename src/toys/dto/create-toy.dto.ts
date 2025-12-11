import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateToyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  material: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  weight: number;
}
