package com.mindsutra.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class WellnessController {

    @Value("${mindsutra.ai.service-url}")
    private String aiServiceUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public record AiChatInput(
        @NotBlank @Size(max = 1000) String message,
        String language,
        String experienceLevel,
        String primaryGoal
    ) {}

    @GetMapping("/public/sessions")
    public ResponseEntity<List<Map<String, Object>>> listSessions(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String lang) {
        List<Map<String, Object>> catalog = List.of(
            Map.of("id", 1, "title", "Morning Grounding & Breath", "category", "Beginner", "lang", "en", "durationSec", 480),
            Map.of("id", 2, "title", "ಶಾಂತ ಮನಸ್ಸು - ಒತ್ತಡ ನಿವಾರಣೆ", "category", "Stress Relief", "lang", "kn", "durationSec", 600),
            Map.of("id", 3, "title", "शांत श्वास और सजगता", "category", "Mindfulness", "lang", "hi", "durationSec", 720)
        );
        return ResponseEntity.ok(catalog);
    }

    @PostMapping("/ai/assistant")
    public ResponseEntity<?> askAiAssistant(@Valid @RequestBody AiChatInput input) {
        Map<String, Object> payload = Map.of(
            "user_message", input.message(),
            "language", input.language() != null ? input.language() : "en",
            "experience_level", input.experienceLevel() != null ? input.experienceLevel() : "BEGINNER",
            "primary_goal", input.primaryGoal() != null ? input.primaryGoal() : "Stress Relief"
        );
        try {
            Object response = restTemplate.postForObject(aiServiceUrl + "/api/ai/chat", payload, Object.class);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            // Graceful fallback when AI microservice is unreachable
            return ResponseEntity.ok(Map.of(
                "reply", "Take three slow, steady breaths. Try our 8-minute Morning Grounding session to reset gently.",
                "is_ai_generated", true,
                "fallback", true
            ));
        }
    }
}
