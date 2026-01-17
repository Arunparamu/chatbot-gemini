package Gemini.Task.service;

import Gemini.Task.Dto.GeminiRequest;
import Gemini.Task.Dto.GeminiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateText(String prompt) {

        String url = "https://generativelanguage.googleapis.com/v1/models/"
                + model + ":generateContent?key=" + apiKey;

        GeminiRequest request = new GeminiRequest(
                List.of(
                        new GeminiRequest.Content(
                                List.of(new GeminiRequest.Part(prompt))
                        )
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<GeminiRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<GeminiResponse> response =
                restTemplate.postForEntity(url, entity, GeminiResponse.class);

        GeminiResponse body = response.getBody();

        if (body == null || body.getCandidates() == null || body.getCandidates().isEmpty()) {
            return "No response from Gemini API";
        }

        return body.getCandidates()
                .get(0)
                .getContent()
                .getParts()
                .get(0)
                .getText();

    }
}
