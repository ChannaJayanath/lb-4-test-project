import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {bikeBrandCreation} from '../controllers';
import {Lb4DbDataSource} from '../datasources';
import {BikeBrand, BikeBrandRelations, BikeModel} from '../models';
import {BikeModelRepository} from './bike-model.repository';

export class BikeBrandRepository extends DefaultCrudRepository<
  BikeBrand,
  typeof BikeBrand.prototype.id,
  BikeBrandRelations
> {
  public readonly bikeModels: HasManyRepositoryFactory<
    BikeModel,
    typeof BikeBrand.prototype.id
  >;

  constructor(
    @inject('datasources.lb4DB') dataSource: Lb4DbDataSource,
    @repository.getter('BikeModelRepository')
    protected bikeModelRepositoryGetter: Getter<BikeModelRepository>,
  ) {
    super(BikeBrand, dataSource);
    this.bikeModels = this.createHasManyRepositoryFactoryFor(
      'bikeModels',
      bikeModelRepositoryGetter,
    );
    this.registerInclusionResolver(
      'bikeModels',
      this.bikeModels.inclusionResolver,
    );
  }

  async createBikeBrand(brand: bikeBrandCreation) {
    return await this.create({brandName: brand.name, id: brand.id});
  }

  async getBikeBrand() {
    let brand = await this.find({include: [{relation: 'bikeModels'}]});
    return brand;
  }
}
