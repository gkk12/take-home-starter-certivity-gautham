package io.certivity.backend.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

    public record CustomResponse(String message) {}

    @GetMapping("/")
    public ResponseEntity<CustomResponse> helloWorld() {
        return ResponseEntity.ok().body(new CustomResponse("Hello World!"));
    }
}

