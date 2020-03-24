import {repository} from '@loopback/repository';
import {get, post, requestBody} from '@loopback/rest';
import {BikeBrandRepository} from '../repositories';

export class BikeBrandController {
  constructor(
    @repository(BikeBrandRepository)
    private bikeBrandRepository: BikeBrandRepository,
  ) {}

  @post('bike/brand/create')
  async bikeBrandCreate(@requestBody() req: bikeBrandCreation) {
    return await this.bikeBrandRepository.createBikeBrand(req);
  }

  @get('bike/brand')
  async getBikeBrand() {
    return this.bikeBrandRepository.getBikeBrand();
  }
}

export interface bikeBrandCreation {
  name: string;
  id: number;
}
