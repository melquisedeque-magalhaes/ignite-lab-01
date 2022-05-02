import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async getCustomerByAuthUserID(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async createCustomer(authUserId: string) {
    const customerWithSameAuthUserId = await this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });

    if (customerWithSameAuthUserId)
      throw new Error('Another customer with Auth User Id same already exits.');

    return this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
