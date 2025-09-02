import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateMemoDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 10000)
  content: string;
}