import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { CustomerService } from 'http/services/customer.service';
import { ProductsService } from 'http/services/product.service';
import { PurchaseService } from 'http/services/purchase.service';
import { DatabaseModule } from '../database/database.module';
import { CustomerResolver } from './graphql/resolvers/customer.resolver';
import { ProductResolver } from './graphql/resolvers/products.resolver';
import { PurchaseResolver } from './graphql/resolvers/purchases.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Resolver
    ProductResolver,
    PurchaseResolver,
    CustomerResolver,

    // Services
    PurchaseService,
    ProductsService,
    CustomerService,
  ],
})
export class HttpModule {}
