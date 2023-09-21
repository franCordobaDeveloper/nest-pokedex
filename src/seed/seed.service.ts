import { PokeResponse } from './interfaces/Poke-Response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {
  
  

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}
  
  async executedSeed() {

    await this.pokemonModel.deleteMany({}); // delete * from pokemon

    const  data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: { name: string, no: number}[] = [];
    
    data.results.forEach( async ( { name, url } ) => {
      // console.log({name, url});
      const segments = url.split('/');
      const no:number = +segments[ segments.length - 2 ];

      // const pokemon = await this.pokemonModel.create({ no, name});

      pokemonToInsert.push({name,no});
    });

    await this.pokemonModel.insertMany( pokemonToInsert );
    return 'Seed Executed';
  }

}
