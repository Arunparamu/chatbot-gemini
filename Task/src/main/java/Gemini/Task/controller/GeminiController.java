package Gemini.Task.controller;

import Gemini.Task.Dto.PromptRequest;
import Gemini.Task.service.GeminiService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/gemini")
public class GeminiController {

    private final GeminiService geminiService;

    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/generate")
    public String generate(@RequestBody PromptRequest request) {
        return geminiService.generateText(request.getPrompt());
    }

}
