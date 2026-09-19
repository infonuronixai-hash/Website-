import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: 'Please enter your name.' })
  @MaxLength(120)
  name: string;

  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  organization?: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter a message.' })
  @MaxLength(2000)
  message: string;
}
