import { IsString, IsUrl, IsOptional, IsObject } from 'class-validator';

export class ScrapeJobDto {
  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  selector?: string;

  @IsObject()
  @IsOptional()
  options?: {
    waitForSelector?: string;
    timeout?: number;
    headers?: Record<string, string>;
  };
}


