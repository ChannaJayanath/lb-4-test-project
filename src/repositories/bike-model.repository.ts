import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {bikeModelCreation} from '../controllers';
import {Lb4DbDataSource} from '../datasources';
import {BikeBrand, BikeModel, BikeModelRelations} from '../models';
import {BikeBrandRepository} from './bike-brand.repository';
var ObjectID = require('mongodb').ObjectID;

export class BikeModelRepository extends DefaultCrudRepository<
  BikeModel,
  typeof BikeModel.prototype.id,
  BikeModelRelations
> {
  public readonly bikeBrand: BelongsToAccessor<
    BikeBrand,
    typeof BikeModel.prototype.id
  >;

  constructor(
    @inject('datasources.lb4DB') dataSource: Lb4DbDataSource,
    @repository.getter('BikeBrandRepository')
    protected bikeBrandRepositoryGetter: Getter<BikeBrandRepository>,
  ) {
    super(BikeModel, dataSource);
    this.bikeBrand = this.createBelongsToAccessorFor(
      'bikeBrand',
      bikeBrandRepositoryGetter,
    );
    this.registerInclusionResolver(
      'bikeBrand',
      this.bikeBrand.inclusionResolver,
    );
  }

  async createBikeModel(model: bikeModelCreation) {
    return await this.create({
      id: model.id,
      modelName: model.name,
      bikeBrandId: model.brandId,
    });
  }

  async getModelBrand() {
    return await this.find({include: [{relation: 'bikeBrand'}]});
  }
}
