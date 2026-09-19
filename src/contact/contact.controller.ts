import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @Render('contact')
  showForm() {
    return { title: 'Contact Us', active: 'contact' };
  }

  @Post()
  @Render('contact')
  async submit(@Body() body: Record<string, string>) {
    const dto = plainToInstance(CreateContactDto, body);
    const violations = await validate(dto, { whitelist: true });

    if (violations.length > 0) {
      const errors = violations.map((v) =>
        Object.values(v.constraints ?? {}).join(', '),
      );
      return {
        title: 'Contact Us',
        active: 'contact',
        errors,
        values: body,
      };
    }

    await this.contactService.saveLead(dto);
    return {
      title: 'Contact Us',
      active: 'contact',
      submitted: true,
      submittedName: dto.name,
    };
  }
}
