import { Inject, Module } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules-api/auth/auth.module.js';
import { PrismaModule } from './modules-system/prisma/prisma.module.js';
import { ProtectGuard } from './common/guard/protect.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core/constants';
import { TokenModule } from './modules-system/token/token.module';
import { RoleGuard } from './common/guard/role.guard';
import { ArticleModule } from './modules-api/article/article.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseSuccessInterceptor } from './common/interceptors/response.interceptor';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { REDIS_URL } from './common/constant/app.constant';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    TokenModule,
    ArticleModule,
    CacheModule.register({
      isGlobal: true,
      stores: [new KeyvRedis(REDIS_URL)],
    }),
  ],
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
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseSuccessInterceptor,
    },
  ],
})
export class AppModule {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit() {
    try {
      await this.cacheManager.get('healthcheck');
      console.log('✅ [REDIS] Connection has been established successfully.');
    } catch (error) {
      console.error('❌ [REDIS] Unable to connect to the cache:', error); }
  }
}
