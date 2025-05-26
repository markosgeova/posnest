import { ConfigService } from "@nestjs/config";
import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { config } from "process";

export const typeOrmConfig = (configService: ConfigService ): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST') || 'localhost',
    port: configService.get<number>('DATABASE_PORT') || 5432,
    username: configService.get<string>('DATABASE_USER') || 'postgres',
    password: configService.get<string>('DATABASE_PASS') || '',
    database: configService.get<string>('DATABASE_NAME') || 'db',
    ssl: true,
    logging: true,
    synchronize: true,
    entities: [join(__dirname + '../../**/*.entity.{ts,js}')],
})
