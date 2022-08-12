import { Test, TestingModule } from "@nestjs/testing";
import { Types } from "mongoose";
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { Pokemon } from "./entities/pokemon.entity";
import { PokemonController } from "./pokemon.controller"
import { PokemonService } from './pokemon.service';

describe('PokemonController', () => {
    let Controller: PokemonController;
    let fakePokemonService: Partial<PokemonService>;

    let  createPokemon : any  = {
        no : 10,
        name : 'pikachu_test',
        _id : '62ed44457fbc2939979806db',
        __v : 0
    }

    let pokemon: any[] = [
        { no: 1,  name: 'pikachu', _id : '62ed44457fbc2939979806db', },
        { no: 10, name: 'pikachu_test', _id : '62ed44457fbc2939979806db', }
    ]

    beforeEach(async () => {
        fakePokemonService = {
            create: (createPokemonDto: CreatePokemonDto) =>
                Promise.resolve(
                    createPokemon as Pokemon
                    & { _id: Types.ObjectId; }
                ),
            update: (term: string,createPokemonDto: UpdatePokemonDto) =>
                Promise.resolve(
                    createPokemon as Pokemon
                ),

            findOne: (term: string) => {
                let result: Pokemon = pokemon.find(e => e.name === term)
                return Promise.resolve(result)
            }
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PokemonController],
            providers: [
                {
                    provide: PokemonService,
                    useValue: fakePokemonService
                }
            ]
        })
        .compile();

        Controller = module.get<PokemonController>(PokemonController); // Entonces, en teoría, esto aquí mismo va a hacer que el contenedor _
                                                                        // cree una nueva instancia del servicio.
    })

    it('creo instancia del controlador', () => {
        expect(Controller).toBeDefined();
    })

    it('create', async() => {
        const pokemon = await Controller.create(createPokemon)

        expect(pokemon.no).toEqual(10)
        expect(pokemon.name).toEqual('pikachu_test')
        expect(pokemon._id).toEqual('62ed44457fbc2939979806db')
    })

    it('findOne', async() => {
        const pokemon = await Controller.findOne("pikachu_test")
        expect(pokemon.name).toEqual('pikachu_test')
    })
})