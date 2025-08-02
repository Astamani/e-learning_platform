import { IsOptional, IsString, IsArray, IsUUID } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsUUID('4', { each: true })
  @IsOptional()
  prerequisiteIds?: string[];
}
