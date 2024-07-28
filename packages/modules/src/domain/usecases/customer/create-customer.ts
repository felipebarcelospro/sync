import type { IMembershipRepository } from '../../../interfaces/repositories/membership'
import type { ITenantRepository } from '../../../interfaces/repositories/tenant'
import type { IUserRepository } from '../../../interfaces/repositories/user'

type CreateCustomerInput = {
  user: User
}

export class CreateCustomerUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly membersRepository: IMembershipRepository,
    private readonly tenantRepository: ITenantRepository,
  ) {}

  async execute(input: CreateCustomerInput): Promise<Customer> {
    const user = await this.userRepository.create(input.user)
  }
}
