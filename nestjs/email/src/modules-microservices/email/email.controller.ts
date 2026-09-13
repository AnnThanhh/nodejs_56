import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('create_email')
  create(@Payload() createEmailDto: CreateEmailDto) {
    return this.emailService.create(createEmailDto);
  }

  @MessagePattern('findAllEmail')
  findAll() {
    return this.emailService.findAll();
  }

  @MessagePattern('findOneEmail')
  findOne(@Payload() id: number) {
    return this.emailService.findOne(id);
  }

  @MessagePattern('updateEmail')
  update(@Payload() updateEmailDto: UpdateEmailDto) {
    return this.emailService.update(updateEmailDto.id, updateEmailDto);
  }

  @MessagePattern('removeEmail')
  remove(@Payload() id: number) {
    return this.emailService.remove(id);
  }
}
