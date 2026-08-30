import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules-api/auth/auth.module.js';
import { PrismaModule } from './modules-system/prisma/prisma.module.js';
import { ProtectGuard } from './common/guard/protect.guard';
import { APP_GUARD } from '@nestjs/core/constants';
import { TokenModule } from './modules-system/token/token.module';
import { RoleGuard } from './common/guard/role.guard';
import { ArticleModule } from './modules-api/article/article.module';

@Module({
  imports: [AuthModule, PrismaModule, TokenModule, ArticleModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ProtectGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
