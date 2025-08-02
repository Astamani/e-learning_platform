import { Test, TestingModule } from '@nestjs/testing';
import { LessonCompletionsService } from './lesson-completions.service';

describe('LessonCompletionsService', () => {
  let service: LessonCompletionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonCompletionsService],
    }).compile();

    service = module.get<LessonCompletionsService>(LessonCompletionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
