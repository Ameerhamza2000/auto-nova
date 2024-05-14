import { Test, TestingModule } from '@nestjs/testing';
import { RefuelingController } from './refueling.controller';
import { RefuelingService } from './refueling.service';

describe('RefuelingController', () => {
  let controller: RefuelingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefuelingController],
      providers: [RefuelingService],
    }).compile();

    controller = module.get<RefuelingController>(RefuelingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
