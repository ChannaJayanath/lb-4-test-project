import {belongsTo, Entity, model, property} from '@loopback/repository';
import {BikeBrand} from './bike-brand.model';

@model()
export class BikeModel extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  modelName: string;

  @belongsTo(() => BikeBrand)
  bikeBrandId: number;

  constructor(data?: Partial<BikeModel>) {
    super(data);
  }
}

export interface BikeModelRelations {
  // describe navigational properties here
}

export type BikeModelWithRelations = BikeModel & BikeModelRelations;
