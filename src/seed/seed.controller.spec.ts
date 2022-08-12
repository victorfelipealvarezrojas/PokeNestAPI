import { Test, TestingModule } from "@nestjs/testing";
import { Axios } from "axios";
import { SeedController } from "./seed.controller";
import { SeedService } from "./seed.service";


describe('seed', () => {

    let Controller: SeedController;
    let fakeSeedService: SeedService;
    let AxiosService: Axios;

    beforeEach(async () => {
        const fakeSeedService = {
            executeSeed() {
               return Promise.resolve()
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [SeedController],
            providers: [
                {
                    provide: SeedService,
                    useValue: fakeSeedService
                },
                {
                    provide: Axios,
                    useValue: jest.fn()
                }
            ]
        })
        .compile();

        Controller = module.get<SeedController>(SeedController); // Entonces, en teoría, esto aquí mismo va a hacer que el contenedor _
                                                                 // cree una nueva instancia del servicio.
    })

    it('creo instancia del controlador seed', () => {
        expect(Controller).toBeDefined();
    })

    it('create', async() => {
        const seed = await Controller.executeSeed()
        //xpect(seed).toEqual("Ok")
    })


});