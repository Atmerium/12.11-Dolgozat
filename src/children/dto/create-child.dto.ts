import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateChildDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsBoolean()
  good: boolean;
}
