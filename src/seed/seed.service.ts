import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from '../common/httpadapters/axios.adapter';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }

  async executeSeed() {

    const data = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
    const pokemonToInsert: { name: string, no: number }[] = [];

    try {
      
      await this.pokemonModel.deleteMany({});

      data.results.forEach(async ({ name, url }) => {


        const segments = url.split('/');

        const no: number = +segments[segments.length - 2];

        pokemonToInsert.push({ name, no });

      });

      await this.pokemonModel.insertMany(pokemonToInsert);
      return 'Seed Executed';

    } catch (error) {
      throw new Error(error);
    }
  }
}


/**
 * async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=1000`)

    const insertPromisesArray = [];

    data.results.forEach(async ({ name, url }) => {

      await this.pokemonModel.deleteMany({});

      const segments = url.split('/');
      
      const no: number = +segments[segments.length - 2];

      insertPromisesArray.push(
        this.pokemonModel.create({name,no})
      );

    });

    await Promise.all(insertPromisesArray);
    return 'Seed Executed';
  }
 */