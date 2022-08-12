import { Query } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { Model } from "mongoose";

import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { Pokemon } from "./entities/pokemon.entity";
import { PokemonService } from "./pokemon.service";

describe('PokemonService', () => {

    let service: PokemonService;
    let fakeModel :Partial<Model<Pokemon>>;

    beforeEach(async () => {

        const fakeService = {
            create: (createPokemonDto: CreatePokemonDto) =>
                Promise.resolve({
                    no: 10,
                    name: 'pikachu_test'
                }),
            findOne:(term: string): Promise<any> =>
                Promise.resolve({
                    name: 'pikachu_test',
                    no: 10,
                }),
            update: (term: string, createPokemonDto: CreatePokemonDto) =>
                Promise.resolve({
                    no: 10,
                    name: 'pikachu_test'
                }),

        }

        const module = await Test.createTestingModule({
            providers: [
                PokemonService,
                {
                    provide: getModelToken(Pokemon.name),
                    useValue: fakeService
                }
            ]
        }).compile();

        service = module.get(PokemonService); // Entonces, en teoría, esto aquí mismo va a hacer que el contenedor _
                                              // cree una nueva instancia del servicio.
    })

    it('creo instancia de pokemon service', async () => {
        expect(service).toBeDefined(); // espere hasta que se defina el servicio
    });

    it('create new pokemon', async () => {

        const pokemon = await service.create({ no: 10, name: 'pikachu_test' })

        expect(pokemon._id).not.toEqual('');
        expect(pokemon.name).toEqual('pikachu_test');
        expect(pokemon.no).not.toEqual('');
        expect(pokemon.no).toEqual(10);

    })
});

