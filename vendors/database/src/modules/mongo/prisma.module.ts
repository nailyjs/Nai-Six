import { DynamicModule, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({})
export class CommonPrismaModule {
  public static forRoot(): DynamicModule {
    return {
      providers: [PrismaService],
      exports: [PrismaService],
      global: true,
      module: CommonPrismaModule,
    };
  }
}
