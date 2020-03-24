import {repository} from '@loopback/repository';
import {get, post, requestBody} from '@loopback/rest';
import {BikeModelRepository} from '../repositories';

export class BikeModelController {
  constructor(
    @repository(BikeModelRepository)
    private bikeModelRepository: BikeModelRepository,
  ) {}

  @post('bike/model/create')
  async bikeBrandCreate(@requestBody() req: bikeModelCreation) {
    return await this.bikeModelRepository.createBikeModel(req);
  }

  @get('bike/model/brand')
  async getbrand() {
    return await this.bikeModelRepository.getModelBrand();
  }
}

export interface bikeModelCreation {
  id: number;
  name: string;
  brandId: number;
}
