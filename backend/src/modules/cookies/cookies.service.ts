import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CookieDto } from "./dto/cookie.dto";

@Injectable()
export class CookiesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getByDomain(domain: string) {
    return this.prismaService.cookie.findMany({
      where: {
        domain: {
          contains: domain,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async saveCookie(cookieData: CookieDto) {
    return this.prismaService.cookie.create({
      data: {
        ...cookieData,
        expires: cookieData.expires ? new Date(cookieData.expires) : null,
      },
    });
  }

  async deleteByDomain(domain: string) {
    const deleted = await this.prismaService.cookie.deleteMany({
      where: {
        domain: {
          contains: domain,
        },
      },
    });

    return {
      message: `Deleted ${deleted.count} cookies for domain: ${domain}`,
      deletedCount: deleted.count,
    };
  }
}
