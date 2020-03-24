import {Entity, hasMany, model, property} from '@loopback/repository';
import {BikeModel} from './bike-model.model';

@model()
export class BikeBrand extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  brandName: string;

  @hasMany(() => BikeModel)
  bikeModels?: BikeModel[];

  constructor(data?: Partial<BikeBrand>) {
    super(data);
  }
}

export interface BikeBrandRelations {
  // describe navigational properties here
}

export type BikeBrandWithRelations = BikeBrand & BikeBrandRelations;
