import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly leadsFile = join(process.cwd(), 'data', 'leads.json');

  async saveLead(dto: CreateContactDto): Promise<void> {
    const lead = { ...dto, receivedAt: new Date().toISOString() };

    let leads: unknown[] = [];
    try {
      const existing = await fs.readFile(this.leadsFile, 'utf8');
      leads = JSON.parse(existing);
    } catch {
      leads = [];
    }

    leads.push(lead);
    await fs.mkdir(join(process.cwd(), 'data'), { recursive: true });
    await fs.writeFile(this.leadsFile, JSON.stringify(leads, null, 2), 'utf8');

    this.logger.log(`New enquiry received from ${dto.email}`);
  }
}
