package io.certivity.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "UserCommentEntity")
public class UserCommentEntity {
    @Id
    private String id;
    private String commentor;
    private String comment;
    private LocalDateTime createdAt;

    public UserCommentEntity(String comment, LocalDateTime createdAt, String commentor) {
        this.id = UUID.randomUUID().toString();
        this.comment = comment;
        this.createdAt = createdAt;
        this.commentor = commentor;
    }
}
