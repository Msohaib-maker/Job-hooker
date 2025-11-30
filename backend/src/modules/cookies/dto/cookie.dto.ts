import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDateString,
  IsInt,
} from "class-validator";

export class CookieDto {
  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsString()
  domain: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsDateString()
  expires?: string;

  @IsOptional()
  @IsBoolean()
  httpOnly?: boolean;

  @IsOptional()
  @IsBoolean()
  secure?: boolean;

  @IsOptional()
  @IsString()
  sameSite?: string;

  @IsString()
  userId: string;
}
