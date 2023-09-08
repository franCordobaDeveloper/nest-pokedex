import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/Poke-Response.interface';

@Injectable()
export class SeedService {
  
  private readonly axios: AxiosInstance = axios;
  
  async executedSeed() {

    const { data } = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');
    
    data.results.forEach( ( { name, url } ) => {
      // console.log({name, url});
      const segments = url.split('/');
      const no:number = +segments[ segments.length - 2 ];
    });

    return data.results;
  }

}
