import { Test, TestingModule } from '@nestjs/testing';
import { LessonCompletionsController } from './lesson-completions.controller';

describe('LessonCompletionsController', () => {
  let controller: LessonCompletionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonCompletionsController],
    }).compile();

    controller = module.get<LessonCompletionsController>(
      LessonCompletionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
