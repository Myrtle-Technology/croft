import { Test, TestingModule } from '@nestjs/testing';
import { FyleController } from './fyle.controller';
import { FyleService } from './fyle.service';

describe('FyleController', () => {
  let controller: FyleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FyleController],
      providers: [FyleService],
    }).compile();

    controller = module.get<FyleController>(FyleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
