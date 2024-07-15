import { Query, Resolver } from '@nestjs/graphql';
import { HealthService } from './health.service';

@Resolver()
export class HealthResolver {
  constructor(private readonly healthService: HealthService) {}

  @Query(() => String)
  async health() {
    return this.healthService.check();
  }
}
