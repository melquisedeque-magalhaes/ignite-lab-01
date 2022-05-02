import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthorizationGuard } from 'http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'http/auth/current-user';
import { CreatePurchaseInput } from 'http/inputs/create-purchase.input';
import { CustomerService } from 'http/services/customer.service';
import { ProductsService } from 'http/services/product.service';
import { PurchaseService } from 'http/services/purchase.service';
import { Purchase } from '../model/Purchase';

@Resolver(() => Purchase)
export class PurchaseResolver {
  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductsService,
    private customerService: CustomerService
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchaseService.listPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productService.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser
  ) {
    const customer = await this.customerService.getCustomerByAuthUserID(
      user.sub
    );

    if (!customer) await this.customerService.createCustomer(user.sub);

    return this.purchaseService.createPurchase({
      productId: data.productId,
      customerId: customer.id,
    });
  }
}
