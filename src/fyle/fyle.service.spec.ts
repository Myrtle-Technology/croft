import { Test, TestingModule } from '@nestjs/testing';
import { FyleService } from './fyle.service';

describe('FyleService', () => {
  let service: FyleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FyleService],
    }).compile();

    service = module.get<FyleService>(FyleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
